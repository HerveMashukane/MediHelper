import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { API_ENDPOINTS } from '../../core/constants/api-endpoints';
import { ApiResourceContract } from '../../core/contracts/api-resource.contract';
import { ApiResponse } from '../../core/models/api-response.model';
import {
  Appointment,
  CreateAppointmentDto,
  UpdateAppointmentDto,
} from '../../core/models/appointment.model';
import { ApiBaseService } from '../../core/services/api-base.service';
import { newEntityId, toEntityId } from '../../core/utils/id.util';

export type { Appointment } from '../../core/models/appointment.model';

const SEED: Appointment[] = [
  { id: '1', patientName: 'Ava Richardson', doctorName: 'Dr. William Smith', date: '2026-04-11', time: '09:00', status: 'Active', type: 'Consultation', notes: '' },
  { id: '2', patientName: 'Ava Richardson', doctorName: 'Dr. William Smith', date: '2026-04-10', time: '09:30', status: 'Upcoming', type: 'Consultation', notes: 'First visit for general checkup' },
  { id: '3', patientName: 'Ava Richardson', doctorName: 'Dr. William Smith', date: '2026-04-09', time: '08:30', status: 'Completed', type: 'Consultation', notes: 'First visit for general checkup' },
  { id: '4', patientName: 'Ava Richardson', doctorName: 'Dr. William Smith', date: '2026-04-08', time: '09:00', status: 'Pending', type: 'Consultation', notes: 'First visit for general checkup' },
  { id: '5', patientName: 'Ava Richardson', doctorName: 'Dr. William Smith', date: '2026-04-07', time: '09:00', status: 'Canceled', type: 'Consultation', notes: 'First visit for general checkup' },
];

@Injectable({ providedIn: 'root' })
export class AppointmentService implements ApiResourceContract<
  Appointment,
  CreateAppointmentDto,
  UpdateAppointmentDto
> {
  private readonly endpoint = API_ENDPOINTS.appointments;
  public appointmentsSource = new BehaviorSubject<Appointment[]>(SEED);
  appointments$ = this.appointmentsSource.asObservable();

  appointmentStats$ = this.appointments$.pipe(
    map((appointments) => {
      const stats = {
        Active: 0,
        Upcoming: 0,
        Completed: 0,
        Pending: 0,
        Canceled: 0,
        Total: 0,
      };
      for (const app of appointments) {
        const key = app.status as keyof typeof stats;
        if (key in stats && key !== 'Total') {
          stats[key]++;
          stats.Total++;
        }
      }
      return stats;
    })
  );

  constructor(private api: ApiBaseService) {}

  getAll(): Observable<ApiResponse<Appointment[]>> {
    return this.api.mockResponse(this.appointmentsSource.value);
  }

  getById(id: string): Observable<ApiResponse<Appointment>> {
    const item = this.appointmentsSource.value.find((a) => a.id === id);
    return item
      ? this.api.mockResponse(item)
      : this.api.mockError('Appointment not found', 404);
  }

  create(dto: CreateAppointmentDto): Observable<ApiResponse<Appointment>> {
    const created: Appointment = { ...dto, id: newEntityId() };
    this.addAppointment(created);
    return this.api.mockResponse(created);
  }

  update(id: string, dto: UpdateAppointmentDto): Observable<ApiResponse<Appointment>> {
    const current = this.appointmentsSource.value.find((a) => a.id === id);
    if (!current) {
      return this.api.mockError('Appointment not found', 404);
    }
    const updated = { ...current, ...dto };
    this.updateAppointments(updated);
    return this.api.mockResponse(updated);
  }

  delete(id: string): Observable<ApiResponse<void>> {
    this.removeAppointment(id);
    return this.api.mockResponse(undefined as void);
  }

  addAppointment(appointment: Appointment): void {
    const withId = { ...appointment, id: appointment.id || newEntityId() };
    const updated = [...this.appointmentsSource.value, withId];
    this.appointmentsSource.next(updated);
  }

  removeAppointment(id: string | number): void {
    const sid = toEntityId(id);
    const updated = this.appointmentsSource.value.filter((a) => a.id !== sid);
    this.appointmentsSource.next(updated);
  }

  updateAppointments(updatedApp: Appointment): void {
    const current = this.appointmentsSource.value;
    const index = current.findIndex((a) => a.id === updatedApp.id);
    if (index !== -1) {
      const updated = [...current];
      updated[index] = updatedApp;
      this.appointmentsSource.next(updated);
    }
  }

  listUrl(): string {
    return this.api.resolveUrl(this.endpoint);
  }
}
