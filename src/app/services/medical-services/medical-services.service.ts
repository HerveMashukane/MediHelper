import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { API_ENDPOINTS } from '../../core/constants/api-endpoints';
import { ApiResourceContract } from '../../core/contracts/api-resource.contract';
import { ApiResponse } from '../../core/models/api-response.model';
import {
  CreateMedicalServiceDto,
  MedicalService,
  UpdateMedicalServiceDto,
} from '../../core/models/medical-service.model';
import { ApiBaseService } from '../../core/services/api-base.service';

@Injectable({ providedIn: 'root' })
export class MedicalServicesService implements ApiResourceContract<
  MedicalService,
  CreateMedicalServiceDto,
  UpdateMedicalServiceDto
> {
  private readonly endpoint = API_ENDPOINTS.medicalServices;
  private readonly source = new BehaviorSubject<MedicalService[]>(this.load());

  readonly services$ = this.source.asObservable();

  constructor(private api: ApiBaseService) {}

  getAll(): Observable<ApiResponse<MedicalService[]>> {
    return this.api.mockResponse(this.source.value);
  }

  getById(id: string): Observable<ApiResponse<MedicalService>> {
    const item = this.source.value.find((s) => s.id === id);
    return item
      ? this.api.mockResponse(item)
      : this.api.mockError('Medical service not found', 404);
  }

  create(dto: CreateMedicalServiceDto): Observable<ApiResponse<MedicalService>> {
    const created: MedicalService = { ...dto, id: crypto.randomUUID() };
    const next = [...this.source.value, created];
    this.persist(next);
    return this.api.mockResponse(created);
  }

  update(id: string, dto: UpdateMedicalServiceDto): Observable<ApiResponse<MedicalService>> {
    const list = this.source.value;
    const idx = list.findIndex((s) => s.id === id);
    if (idx === -1) {
      return this.api.mockError('Medical service not found', 404);
    }
    const updated = { ...list[idx], ...dto };
    const next = [...list];
    next[idx] = updated;
    this.persist(next);
    return this.api.mockResponse(updated);
  }

  delete(id: string): Observable<ApiResponse<void>> {
    this.persist(this.source.value.filter((s) => s.id !== id));
    return this.api.mockResponse(undefined as void);
  }

  /** NestJS: GET ${endpoint} */
  listUrl(): string {
    return this.api.resolveUrl(this.endpoint);
  }

  private persist(services: MedicalService[]): void {
    this.source.next(services);
    localStorage.setItem('medical_services', JSON.stringify(services));
  }

  private load(): MedicalService[] {
    try {
      const raw = localStorage.getItem('medical_services');
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }
}
