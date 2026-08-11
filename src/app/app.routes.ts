import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./features/instructor-dashboard/instructor-dashboard.component').then(
        (m) => m.InstructorDashboardComponent,
      ),
  },
  {
    path: 'enrollments',
    loadComponent: () =>
      import('./features/enrollment-list/enrollment-list.component').then(
        (m) => m.EnrollmentListComponent,
      ),
  },

  {
    path: 'courses',
    loadComponent: () =>
      import('./features/course-detail/course-detail').then((m) => m.CourseDetailComponent),
  },
  {
    path: 'enroll',
    loadComponent: () =>
      import('./features/enrollment-form/enrollment-form').then((m) => m.EnrollmentFormComponent),
  },

  {
    path: 'grade-submission',
    loadComponent: () =>
      import('./features/grade-submission/grade-submission.component')
    .then( m => m.GradeSubmissionComponent,
      ),
  },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
];
