import { Routes } from '@angular/router';
import { roleGuard } from './guards/role.guard';
import { AdminCourseListComponent } from './features/admin-course-list/admin-course-list.component';
import { LoginComponent } from './features/login/login.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
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
      import('./features/grade-submission/grade-submission.component').then(
        (m) => m.GradeSubmissionComponent,
      ),
  },
  
  {
    path: 'admin/courses',
    component: AdminCourseListComponent,
    canActivate: [roleGuard('Admin')],
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];
