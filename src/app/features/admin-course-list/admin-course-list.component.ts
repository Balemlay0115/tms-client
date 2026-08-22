import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service'; // Adjust path if your AuthService is located elsewhere

@Component({
  selector: 'app-admin-course-list',
  standalone: true,
  imports: [],
  template: `
    <div class="admin-course-container">
      <h2>Admin Course Management</h2>

      <table class="course-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Course Title</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Enterprise Architecture & Security</td>
            <td>
              <!-- Exercise 6 Step 3: Conditional UI in Templates -->
              @if (auth.hasRole('Admin')) {
                <button (click)="deleteCourse(1)" class="btn-danger">
                  Delete Course
                </button>
              }
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `
})
export class AdminCourseListComponent {
  // 1. Inject AuthService as public so the inline template can access auth.hasRole()
  public auth = inject(AuthService);

  // 2. Define the deleteCourse method referenced in the (click) handler
  deleteCourse(courseId: number | string): void {
    console.log('Deleting course ID:', courseId);
    // Add call to CourseService here when ready
  }
}