import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Course {
  id: number;
  code: string;
  title: string;
  maxCapacity: number;
  enrollmentCount: number;
}

export interface PagedResponse<T> {
  items: T[];
  totalCount: number;
  page: number;
  pageSize: number;
}

export interface EnrollmentPayload {
  studentId: string;
  courseId: string | number;
  term: string;
  notes?: string;
  backupCourses?: string[];
}

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:5065/api/v1/courses';

  getAll(page = 1, pageSize = 50): Observable<Course[]> {
    return this.http
      .get<PagedResponse<Course>>(this.baseUrl, {
        params: { page: page.toString(), pageSize: pageSize.toString() }
      })
      .pipe(map((response) => response.items));
  }

  // Fetches a single course by ID
  getById(id: string | number): Observable<Course> {
    return this.http.get<Course>(`${this.baseUrl}/${id}`);
  }

  // Submits an enrollment payload to the server
  enroll(payload: EnrollmentPayload): Observable<any> {
    return this.http.post(`${this.baseUrl}/enroll`, payload);
  }
}