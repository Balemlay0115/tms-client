import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment.development';

export interface TmsUser {
  email: string;
  displayName: string;
  role: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private accessToken = signal<string | null>(null);
  currentUser = signal<TmsUser | null>(null);

  getAccessToken(): string | null {
    return this.accessToken();
  }

  hasRole(role: string): boolean {
    const user = this.currentUser();
    return user?.role === role || user?.role === 'Admin';
  }

  async login(credentials: LoginRequest): Promise<void> {
    const payload = {
      username: credentials.email,
      email: credentials.email,
      password: credentials.password,
    };

    const res = await firstValueFrom(
      this.http.post<AuthResponse>(`${environment.apiUrl}/Auth/login`, payload),
    );

    this.accessToken.set(res.accessToken);

    try {
      const base64Url = res.accessToken.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join(''),
      );
      const decodedPayload = JSON.parse(jsonPayload);

      const roleClaim =
        decodedPayload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] ||
        decodedPayload['role'] ||
        decodedPayload['roles'];

      const userRole = Array.isArray(roleClaim) ? roleClaim[0] : roleClaim || 'Student';

      this.currentUser.set({
        email: decodedPayload.email || decodedPayload.sub || credentials.email,
        displayName: decodedPayload.name || decodedPayload.email || 'User',
        role: userRole,
      });
    } catch (err) {
      console.error('Failed to parse JWT payload:', err);
      this.currentUser.set({
        email: credentials.email,
        displayName: credentials.email,
        role: 'Instructor',
      });
      throw new Error('Failed to parse JWT payload');
    }
  }

  async register(data: RegisterRequest): Promise<void> {
    await firstValueFrom(this.http.post(`${environment.apiUrl}/Auth/register`, data));
  }

  logout(): void {
    this.accessToken.set(null);
    this.currentUser.set(null);
    this.router.navigate(['/login']);
  }
}
