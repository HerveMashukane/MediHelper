import { Injectable } from '@angular/core';

export interface Appointment {
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

  private appointments: Appointment[] = [
    {
      patientName: 'Ava Richardson',
      doctorName: 'Dr. Sarah Williams',
      date: '2026-04-11',
      time: '09:30',
      status: 'Upcoming',
      type: 'Consultation',
      message: 'First visit for general checkup'
    },
    {
      patientName: 'Luccas Benett',
      doctorName: 'Dr. David Kim',
      date: '2026-04-10',
      time: '11:00',
      status: 'Completed',
      type: 'Follow-up',
      message: 'Post-treatment review'
    },
    {
      patientName: 'Isabella Price',
      doctorName: 'Dr. Emily Stone',
      date: '2026-04-12',
      time: '14:00',
      status: 'Pending',
      type: 'Consultation',
      message: 'Waiting confirmation from patient'
    },
    {
      patientName: 'Noah Peterson',
      doctorName: 'Dr. John Smith',
      date: '2026-04-09',
      time: '16:30',
      status: 'Canceled',
      type: 'Emergency',
      message: 'Patient canceled due to travel'
    },
    {
      patientName: 'Sofia Coleman',
      doctorName: 'Dr. Sarah Williams',
      date: '2026-04-13',
      time: '10:15',
      status: 'Upcoming',
      type: 'Consultation',
      message: 'Routine dental check'
    },
    {
      patientName: 'Liam Foster',
      doctorName: 'Dr. David Kim',
      date: '2026-04-08',
      time: '08:45',
      status: 'Completed',
      type: 'Surgery Follow-up',
      message: 'Post-surgery evaluation'
    }
  ];

  getAppointments(): Appointment[] {
    return this.appointments;
  }
}