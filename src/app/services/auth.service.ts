import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
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
@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
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
  // Pass the credentials object directly (it already contains email and password)
  const res = await firstValueFrom(
    this.http.post<AuthResponse>('/api/auth/login', credentials)
  );

  this.accessToken.set(res.accessToken);

  const payload = JSON.parse(atob(res.accessToken.split('.')[1]));
  this.currentUser.set({
    email: payload.email || payload.sub,
    displayName: payload.name || payload.email || 'User',
    role:
      payload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] ||
      payload.role ||
      'Student',
  });
}
  logout(): void {
    this.accessToken.set(null);
    this.currentUser.set(null);
  }
}
