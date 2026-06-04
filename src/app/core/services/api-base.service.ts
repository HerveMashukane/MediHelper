import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ApiResponse } from '../models/api-response.model';

/**
 * Base API helper — swap `useMock` for HttpClient when NestJS is ready.
 */
@Injectable({ providedIn: 'root' })
export class ApiBaseService {
  /** Toggle when connecting to NestJS backend */
  readonly useMock = true;
  readonly mockDelayMs = 150;

  mockResponse<T>(data: T, message?: string): Observable<ApiResponse<T>> {
    return of({ data, message }).pipe(delay(this.mockDelayMs));
  }

  mockError(message: string, statusCode = 400): Observable<never> {
    return throwError(() => ({ statusCode, message }));
  }

  /** Future: return environment.apiUrl + path */
  resolveUrl(path: string): string {
    return path;
  }
}
