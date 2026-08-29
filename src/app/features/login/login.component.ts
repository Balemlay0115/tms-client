import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private auth = inject(AuthService);
  private router = inject(Router);

  email = '';
  password = '';
  errorMessage = '';
  isLoading = false;

  async onSubmit(): Promise<void> {
    if (!this.email || !this.password) {
      this.errorMessage = 'Please provide both email and password.';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    try {
      await this.auth.login({ email: this.email, password: this.password });
      
      const role = this.auth.currentUser()?.role;

      // Dynamic redirect based on user role
      if (role === 'Instructor') {
        await this.router.navigate(['/instructor/dashboard']);
      } else if (role === 'Admin') {
        await this.router.navigate(['/admin/courses']);
      } else {
        await this.router.navigate(['/student/dashboard']);
      }
    } catch (err: any) {
      this.isLoading = false;
      console.error('Login submission failed:', err);
      if (err.status === 423) {
        this.errorMessage = 'Account locked due to multiple failed login attempts. Try again later.';
      } else if (err.status === 401) {
        this.errorMessage = 'Invalid email or password.';
      } else {
        this.errorMessage = 'An error occurred during login. Please try again.';
      }
    } finally {
      this.isLoading = false;
    }
  }
}