import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
export const errorInterceptor: HttpInterceptorFn = (req, next) =>
{
const router = inject(Router);
return next(req).pipe(
catchError((err: HttpErrorResponse) => {
// Extract C# RFC 7807 ProblemDetails detail property
const detailMessage = err.error?.detail ?? 'A system erroroccurred. Please try again.';
if (err.status === 401) {
// Redirect expired or unauthenticated sessions back to login
router.navigate(['/login']);
} else {
// Surface structured error to developer console / UI notification
console.error('API Error Response:', detailMessage);
}
return throwError(() => err);
})
);
};