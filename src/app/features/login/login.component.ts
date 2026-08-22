import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="login-container">
      <h2>Sign In</h2>

      @if (errorMessage) {
        <div class="error-banner">
          {{ errorMessage }}
        </div>
      }

      <form (ngSubmit)="onSubmit()">
        <div class="form-group">
          <label for="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            [(ngModel)]="email"
            required
            placeholder="user@cotbe.edu.et"
          />
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            [(ngModel)]="password"
            required
            placeholder="••••••••"
          />
        </div>

        <button type="submit" [disabled]="isLoading">
          {{ isLoading ? 'Signing in...' : 'Login' }}
        </button>
      </form>
    </div>
  `,
  styles: [`
    .login-container {
      max-width: 400px;
      margin: 4rem auto;
      padding: 2rem;
      border: 1px solid #ccc;
      border-radius: 8px;
    }
    .form-group {
      margin-bottom: 1.25rem;
    }
    .form-group label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: bold;
    }
    .form-group input {
      width: 100%;
      padding: 0.5rem;
      box-sizing: border-box;
    }
    .error-banner {
      background-color: #f8d7da;
      color: #721c24;
      padding: 0.75rem;
      border-radius: 4px;
      margin-bottom: 1rem;
    }
    button {
      width: 100%;
      padding: 0.75rem;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    button:disabled {
      background-color: #6c757d;
    }
  `]
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
      this.router.navigate(['/admin/courses']);
    } catch (err: any) {
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