import { Component, inject, signal, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from "@angular/forms";
import { ActivatedRoute, RouterLink, Router } from "@angular/router";
import { CourseService, EnrollmentPayload } from "../../services/course.service";

@Component({
  selector: "app-enrollment-form",
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: "./enrollment-form.html",
  styleUrl: "./enrollment-form.scss",
})
export class EnrollmentFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private courseService = inject(CourseService);

  submitted = signal(false);
  isSubmitting = signal(false);
  errorMessage = signal<string | null>(null);

  form = this.fb.nonNullable.group({
    // Updated to accept positive numbers matching your API contract
    studentId: [
      3,
      [Validators.required, Validators.min(1)],
    ],
    // Validates formats like MAT-101, CS-101, or CSE-101
    courseId: [
      "MAT-101",
      [Validators.required, Validators.pattern(/^[A-Z]{2,4}-\d{3}$/i)],
    ],
    term: ["Fall 2026", Validators.required],
    notes: [""],
    backupCourses: this.fb.array<FormControl<string>>([]),
  });

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      const codeOrId = params["courseCode"] || params["courseId"];
      if (codeOrId) {
        const paramValue = String(codeOrId).trim();
        
        // If passed as course code (e.g. MAT-101)
        if (/^[A-Z]{2,4}-\d{3}$/i.test(paramValue)) {
          this.form.patchValue({ courseId: paramValue.toUpperCase() });
        } 
        // If passed as numeric ID (e.g. 3), fetch course details to resolve code
        else if (!isNaN(Number(paramValue))) {
          this.courseService.getById(paramValue).subscribe({
            next: (course) => {
              if (course?.code) {
                this.form.patchValue({ courseId: course.code.toUpperCase() });
              }
            },
            error: (err) => console.warn("Could not resolve course code for ID:", paramValue)
          });
        }
      }
    });
  }

  get backups() {
    return this.form.controls.backupCourses;
  }

  addBackup() {
    this.backups.push(
      this.fb.control("", {
        nonNullable: true,
        validators: [Validators.required, Validators.pattern(/^[A-Z]{2,4}-\d{3}$/i)],
      })
    );
  }

  removeBackup(index: number) {
    this.backups.removeAt(index);
  }

  submit() {
    if (this.form.valid) {
      this.isSubmitting.set(true);
      this.errorMessage.set(null);

      const raw = this.form.getRawValue();

      // Clean numeric conversion ensuring StudentId is a positive number
      const numericStudentId = Number(raw.studentId);

      const payload: EnrollmentPayload = {
        studentId: numericStudentId,
        courseCode: raw.courseId.toUpperCase().trim(),
        term: raw.term,
        notes: raw.notes,
        backupCourses: raw.backupCourses
      };

      console.log("Sending Enrollment Payload:", payload);

      this.courseService.enroll(payload).subscribe({
        next: () => {
          this.isSubmitting.set(false);
          this.submitted.set(true);
        },
        error: (err) => {
          console.error("Enrollment POST failed:", err);
          this.isSubmitting.set(false);

          if (err.status === 409) {
            this.errorMessage.set(err.error?.detail || "You are already enrolled in this course.");
          } else if (err.status === 404) {
            this.errorMessage.set("The specified course code or student ID does not exist.");
          } else {
            this.errorMessage.set(
              err?.error?.detail || err?.error?.title || "Failed to submit enrollment request."
            );
          }
        },
      });
    } else {
      this.form.markAllAsTouched();
    }
  }
}