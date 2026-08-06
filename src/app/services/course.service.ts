import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Course, CourseDetail, PagedResponse } from '../models/course.model';

export interface EnrollmentPayload {
  studentId?: number | string;
  courseCode: string;   
  term?: string;
  notes?: string;
  backupCourses?: string[];
}

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private http = inject(HttpClient);
  
  private baseUrl = 'http://localhost:5065/api/v2/courses';
  private enrollUrl = 'http://localhost:5065/api/v2/enrollments';
  private studentsUrl = 'http://localhost:5065/api/v2/students';

  getAll(page = 1, pageSize = 50): Observable<Course[]> {
    return this.http
      .get<PagedResponse<Course>>(this.baseUrl, {
        params: { page: page.toString(), pageSize: pageSize.toString() }
      })
      .pipe(
        tap((res) => console.log('V2 API Payload Response:', res)),
        map((response) => {
          if (Array.isArray(response?.data)) return response.data;
          if (Array.isArray((response as any)?.items)) return (response as any).items;
          if (Array.isArray(response)) return response;
          return [];
        })
      );
  }

  getById(id: string | number): Observable<CourseDetail> {
    return this.http.get<CourseDetail>(`${this.baseUrl}/${id}`);
  }

  createStudent(studentId: string): Observable<any> {
    const payload = {
      studentId,
      studentCode: studentId,
      code: studentId,
      name: `Student ${studentId}`
    };
    return this.http.post(this.studentsUrl, payload);
  }

  enroll(payload: EnrollmentPayload): Observable<any> {
    return this.http.post(this.enrollUrl, payload);
  }
}