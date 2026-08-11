import { Service, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Course,  PagedResponse } from '../models/course.model';
import { environment } from '../../environments/environment';


export interface EnrollmentPayload {
  studentId?: number | string;
  courseCode: string;   
  term?: string;
  notes?: string;
  backupCourses?: string[];
}

@Service()
export class CourseService {
  private http = inject(HttpClient);
  private readonly base = `${environment.apiUrl}/courses`;
  private readonly enrollUrl = `${environment.apiUrl}/enrollments`;
  private readonly studentsUrl = `${environment.apiUrl}/students`;

  getAll(page: number = 1, pageSize: number = 50): Observable<Course[]> {
    return this.http
      .get<PagedResponse<Course>>(this.base, {
        params: { page: page.toString(), pageSize: pageSize.toString() }
      })
      .pipe(
        tap((res) => console.log('V2 API Payload Response:', res)),
        map((response) => {
          if (Array.isArray(response?.items)) return response.items;
          if (Array.isArray((response as any)?.items)) return (response as any).items;
          if (Array.isArray(response)) return response;
          return [];
        })
      );
  }

  getById(id: string | number): Observable<Course> {
    return this.http.get<Course>(`${this.base}/${id}`);
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