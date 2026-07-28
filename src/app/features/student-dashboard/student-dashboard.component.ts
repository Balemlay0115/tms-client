import { Component, inject, signal, computed } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { rxResource } from '@angular/core/rxjs-interop';
import { CourseService, Course } from '../../services/course.service';
import { CourseCardComponent } from '../../ui/course-card/course-card';

@Component({
  selector: 'app-student-dashboard',
  standalone: true,
  imports: [CourseCardComponent, RouterLink],
  templateUrl: './student-dashboard.component.html',
  styleUrl: './student-dashboard.component.scss'
})
export class StudentDashboardComponent {
  private courseService = inject(CourseService);
  private router = inject(Router);

  // Student signals
  studentName = signal('Liya Kebede');
  earnedCredits = signal(45);
  selectedCourse = signal<Course | null>(null);

  graduationStatus = computed(() =>
    this.earnedCredits() >= 120 ? 'Eligible for Graduation' : 'In Progress'
  );

  // rxResource stream call to backend
  coursesResource = rxResource({
    stream: () => this.courseService.getAll()
  });

  // Method called by: (click)="registerForClass()"
  registerForClass() {
    this.earnedCredits.update((credits) => credits + 3);
  }

  // Method called by: (enrollClicked)="handleEnroll($event)"
  handleEnroll(course: Course) {
    if (course.enrollmentCount < course.maxCapacity) {
      // 1. Locally update the resource value so enrollment increments instantly
      const currentList = this.coursesResource.value();
      if (currentList) {
        this.coursesResource.set(
          currentList.map((c) =>
            c.id === course.id
              ? { ...c, enrollmentCount: c.enrollmentCount + 1 }
              : c
          )
        );
      }

      // 2. Track selected course
      this.selectedCourse.set(course);

      // 3. Navigate to enrollment form with pre-filled course ID parameter
      this.router.navigate(['/enroll'], { queryParams: { courseId: course.id } });
    }
  }
}