import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { API_ENDPOINTS } from '../../core/constants/api-endpoints';
import { ApiResourceContract } from '../../core/contracts/api-resource.contract';
import { ApiResponse } from '../../core/models/api-response.model';
import {
  CreatePatientDto,
  Patient,
  UpdatePatientDto,
} from '../../core/models/patient.model';
import { ApiBaseService } from '../../core/services/api-base.service';
import { newEntityId, toEntityId } from '../../core/utils/id.util';

export type { Patient } from '../../core/models/patient.model';

@Injectable({ providedIn: 'root' })
export class PatientsService implements ApiResourceContract<Patient, CreatePatientDto, UpdatePatientDto> {
  private readonly endpoint = API_ENDPOINTS.patients;
  public patientsSource = new BehaviorSubject<Patient[]>(this.loadPatientsFromLocalStorage());
  patients$ = this.patientsSource.asObservable();

  patientStats$ = this.patients$.pipe(
    map((patients) => {
      const stats = {
        Pediatry: 0,
        Cardiology: 0,
        Dermatology: 0,
        Neurology: 0,
        Surgery: 0,
        Oncology: 0,
        Total: 0,
      };
      for (const p of patients) {
        const key = p.department as keyof typeof stats;
        if (key in stats && key !== 'Total') {
          stats[key]++;
          stats.Total++;
        }
      }
      return stats;
    })
  );

  constructor(private api: ApiBaseService) {}

  getAll(): Observable<ApiResponse<Patient[]>> {
    return this.api.mockResponse(this.patientsSource.value);
  }

  getById(id: string): Observable<ApiResponse<Patient>> {
    const patient = this.patientsSource.value.find((p) => p.id === id);
    return patient
      ? this.api.mockResponse(patient)
      : this.api.mockError('Patient not found', 404);
  }

  create(dto: CreatePatientDto): Observable<ApiResponse<Patient>> {
    const patient: Patient = { ...dto, id: newEntityId() };
    this.addPatient(patient);
    return this.api.mockResponse(patient);
  }

  update(id: string, dto: UpdatePatientDto): Observable<ApiResponse<Patient>> {
    const current = this.patientsSource.value.find((p) => p.id === id);
    if (!current) {
      return this.api.mockError('Patient not found', 404);
    }
    const updated = { ...current, ...dto };
    this.updatePatients(updated);
    return this.api.mockResponse(updated);
  }

  delete(id: string): Observable<ApiResponse<void>> {
    const patient = this.patientsSource.value.find((p) => p.id === id);
    if (patient) {
      this.removePatient(patient);
    }
    return this.api.mockResponse(undefined as void);
  }

  addPatient(patient: Patient): void {
    const current = this.patientsSource.value;
    const withId = { ...patient, id: patient.id || newEntityId() };
    const updated = [...current, withId];
    this.patientsSource.next(updated);
    this.savePatientsToLocalStorage(updated);
  }

  removePatient(removedPatient: Patient): void {
    const updated = this.patientsSource.value.filter((p) => p.id !== removedPatient.id);
    this.patientsSource.next(updated);
    this.savePatientsToLocalStorage(updated);
  }

  updatePatients(updatedPatient: Patient): void {
    const current = this.patientsSource.value;
    const index = current.findIndex((p) => p.id === updatedPatient.id);
    if (index !== -1) {
      const updated = [...current];
      updated[index] = updatedPatient;
      this.patientsSource.next(updated);
      this.savePatientsToLocalStorage(updated);
    }
  }

  listUrl(): string {
    return this.api.resolveUrl(this.endpoint);
  }

  private savePatientsToLocalStorage(patients: Patient[]): void {
    localStorage.setItem('patients', JSON.stringify(patients));
  }

  private loadPatientsFromLocalStorage(): Patient[] {
    try {
      const stored = localStorage.getItem('patients');
      if (!stored) return [];
      const parsed = JSON.parse(stored) as Patient[];
      return parsed.map((p) => ({ ...p, id: toEntityId(p.id) }));
    } catch {
      return [];
    }
  }
}
