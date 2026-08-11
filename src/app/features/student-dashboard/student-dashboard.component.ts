import { Component, inject, signal, computed } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { rxResource } from '@angular/core/rxjs-interop';
import { CourseService } from '../../services/course.service';
import { Course } from '../../models/course.model';
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

  // Fetches catalog from GET /api/v2/courses
  coursesResource = rxResource({
    stream: () => this.courseService.getAll()
  });

  registerForClass() {
    this.earnedCredits.update((credits) => credits + 3);
  }

  // Pure navigation handler when clicking "Enroll" on a course card
  handleEnroll(course: Course) {
    if (course.enrollmentCount < course.maxCapacity) {
      // 1. Set the selected course signal for toast/UI tracking
      this.selectedCourse.set(course);

      // 2. Navigate straight to the enrollment form passing courseId in query parameters
      this.router.navigate(['/enroll'], { queryParams: { courseId: course.id } });
    }
  }
}