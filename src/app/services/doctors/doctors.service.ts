import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { API_ENDPOINTS } from '../../core/constants/api-endpoints';
import { ApiResourceContract } from '../../core/contracts/api-resource.contract';
import { ApiResponse } from '../../core/models/api-response.model';
import {
  CreateDoctorDto,
  Doctor,
  UpdateDoctorDto,
} from '../../core/models/doctor.model';
import { ApiBaseService } from '../../core/services/api-base.service';
import { newEntityId, toEntityId } from '../../core/utils/id.util';

export type { Doctor } from '../../core/models/doctor.model';

@Injectable({ providedIn: 'root' })
export class DoctorsService implements ApiResourceContract<Doctor, CreateDoctorDto, UpdateDoctorDto> {
  private readonly endpoint = API_ENDPOINTS.doctors;
  public doctorsSource = new BehaviorSubject<Doctor[]>(this.loadDoctorsFromLocalStorage());
  doctors$ = this.doctorsSource.asObservable();

  doctorStats$ = this.doctors$.pipe(
    map((doctors) => {
      const stats = {
        Generalist: 0,
        Cardiologist: 0,
        Dermatologist: 0,
        Neurologist: 0,
        Surgeon: 0,
        Oncologist: 0,
        Total: 0,
      };
      for (const d of doctors) {
        const key = d.speciality as keyof typeof stats;
        if (key in stats && key !== 'Total') {
          stats[key]++;
          stats.Total++;
        }
      }
      return stats;
    })
  );

  constructor(private api: ApiBaseService) {}

  getAll(): Observable<ApiResponse<Doctor[]>> {
    return this.api.mockResponse(this.doctorsSource.value);
  }

  getById(id: string): Observable<ApiResponse<Doctor>> {
    const doctor = this.doctorsSource.value.find((d) => d.id === id);
    return doctor
      ? this.api.mockResponse(doctor)
      : this.api.mockError('Doctor not found', 404);
  }

  create(dto: CreateDoctorDto): Observable<ApiResponse<Doctor>> {
    const doctor: Doctor = { ...dto, id: newEntityId() };
    this.addDoctor(doctor);
    return this.api.mockResponse(doctor);
  }

  update(id: string, dto: UpdateDoctorDto): Observable<ApiResponse<Doctor>> {
    const current = this.doctorsSource.value.find((d) => d.id === id);
    if (!current) {
      return this.api.mockError('Doctor not found', 404);
    }
    const updated = { ...current, ...dto };
    this.updateDoctors(updated);
    return this.api.mockResponse(updated);
  }

  delete(id: string): Observable<ApiResponse<void>> {
    const doctor = this.doctorsSource.value.find((d) => d.id === id);
    if (doctor) {
      this.removeDoctor(doctor);
    }
    return this.api.mockResponse(undefined as void);
  }

  addDoctor(doctor: Doctor): void {
    const withId = { ...doctor, id: doctor.id || newEntityId() };
    const updated = [...this.doctorsSource.value, withId];
    this.doctorsSource.next(updated);
    this.saveDoctorsToLocalStorage(updated);
  }

  removeDoctor(removed: Doctor): void {
    const updated = this.doctorsSource.value.filter((d) => d.id !== removed.id);
    this.doctorsSource.next(updated);
    this.saveDoctorsToLocalStorage(updated);
  }

  updateDoctors(updatedDoctor: Doctor): void {
    const current = this.doctorsSource.value;
    const index = current.findIndex((d) => d.id === updatedDoctor.id);
    if (index !== -1) {
      const updated = [...current];
      updated[index] = updatedDoctor;
      this.doctorsSource.next(updated);
      this.saveDoctorsToLocalStorage(updated);
    }
  }

  listUrl(): string {
    return this.api.resolveUrl(this.endpoint);
  }

  private saveDoctorsToLocalStorage(doctors: Doctor[]): void {
    localStorage.setItem('doctors', JSON.stringify(doctors));
  }

  private loadDoctorsFromLocalStorage(): Doctor[] {
    try {
      const stored = localStorage.getItem('doctors');
      if (!stored) return [];
      return (JSON.parse(stored) as Doctor[]).map((d) => ({ ...d, id: toEntityId(d.id) }));
    } catch {
      return [];
    }
  }
}
