import { Component, inject, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { rxResource } from '@angular/core/rxjs-interop';
import { CourseService, Course } from '../../services/course.service';
import { CourseCardComponent } from '../../ui/course-card/course-card';

@Component({
  selector: 'app-student-dashboard',
  standalone: true,
  imports: [CourseCardComponent, RouterLink],
  templateUrl: './student-dashboard.component.html'
})
export class StudentDashboardComponent {
  private courseService = inject(CourseService);

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
    this.selectedCourse.set(course);
  }
}