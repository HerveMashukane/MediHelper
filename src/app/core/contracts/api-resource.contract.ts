import { Observable } from 'rxjs';
import { ApiResponse } from '../models/api-response.model';

/**
 * Standard REST contract for NestJS resources.
 * Frontend services implement this interface; mock/local until HTTP is wired.
 */
export interface ApiResourceContract<T, CreateDto = Partial<T>, UpdateDto = Partial<T>> {
  getAll(): Observable<ApiResponse<T[]>>;
  getById(id: string): Observable<ApiResponse<T>>;
  create(dto: CreateDto): Observable<ApiResponse<T>>;
  update(id: string, dto: UpdateDto): Observable<ApiResponse<T>>;
  delete(id: string): Observable<ApiResponse<void>>;
}

/** HTTP verbs mapped to NestJS controller methods */
export const REST_METHODS = {
  LIST: 'GET',
  GET_ONE: 'GET',
  CREATE: 'POST',
  UPDATE: 'PUT',
  DELETE: 'DELETE',
} as const;
