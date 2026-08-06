import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'instructor',
    loadComponent: () =>
      import('./features/instructor-dashboard/instructor-dashboard.component').then(
        (m) => m.InstructorDashboardComponent,
      ),
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./features/student-dashboard/student-dashboard.component').then(
        (m) => m.StudentDashboardComponent,
      ),
  },
  {
    path: 'courses/:id',
    loadComponent: () =>
      import('./features/course-detail/course-detail').then((m) => m.CourseDetailComponent),
  },
  {
    path: 'enroll',
    loadComponent: () =>
      import('./features/enrollment-form/enrollment-form').then((m) => m.EnrollmentFormComponent),
  },
  {
    path: 'enrollment-list',
    loadComponent: () =>
      import('./features/enrollment-list/enrollment-list.component').then(
        (m) => m.EnrollmentListComponent,
      ),
  },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
];
