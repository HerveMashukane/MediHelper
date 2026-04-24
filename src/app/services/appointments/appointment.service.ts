import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Appointment {
  id: number;
  patientName: string;
  doctorName: string;
  date: string;
  time: string;
  status: string;
  type: string;
  message?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor() { }

  public appointmentsSource = new BehaviorSubject<Appointment[]>([
    {
      id: 1,
      patientName: 'Ava Richardson',
      doctorName: 'Dr. William Smith',
      date: '2026-04-11',
      time: '09:00',
      status: 'Active',
      type: 'Consultation',
      message: 'First visit for general checkup'
    },
    {
      id: 2,
      patientName: 'Ava Richardson',
      doctorName: 'Dr. William Smith',
      date: '2026-04-10',
      time: '09:30',
      status: 'Upcoming',
      type: 'Consultation',
      message: 'First visit for general checkup'
    },
    {
      id: 3,
      patientName: 'Ava Richardson',
      doctorName: 'Dr. William Smith',
      date: '2026-04-09',
      time: '08:30',
      status: 'Completed',
      type: 'Consultation',
      message: 'First visit for general checkup'
    },
    {
      id: 4,
      patientName: 'Ava Richardson',
      doctorName: 'Dr. William Smith',
      date: '2026-04-08',
      time: '09:00',
      status: 'Pending',
      type: 'Consultation',
      message: 'First visit for general checkup'
    },
    {
      id: 5,
      patientName: 'Ava Richardson',
      doctorName: 'Dr. William Smith',
      date: '2026-04-07',
      time: '09:00',
      status: 'Canceled',
      type: 'Consultation',
      message: 'First visit for general checkup'
    },
  ]);
  appointments$ = this.appointmentsSource.asObservable();

  addAppointment(appointment: Appointment) {
    const currentAppointments = this.appointmentsSource.value;
    const updatedAppointments = [...currentAppointments, appointment]
    this.appointmentsSource.next(updatedAppointments);
  }
}