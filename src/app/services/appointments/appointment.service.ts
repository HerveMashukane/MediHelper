import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Appointment {
  id: number;
  patientName: string;
  doctorName: string;
  date: string;
  time: string;
  status: string;
  type: string;
  notes?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor() {
  }
  
  public appointmentsSource = new BehaviorSubject<Appointment[]>([
    {
      id: 1,
      patientName: 'Ava Richardson',
      doctorName: 'Dr. William Smith',
      date: '2026-04-11',
      time: '09:00',
      status: 'Active',
      type: 'Consultation',
      notes: ''
    },
    {
      id: 2,
      patientName: 'Ava Richardson',
      doctorName: 'Dr. William Smith',
      date: '2026-04-10',
      time: '09:30',
      status: 'Upcoming',
      type: 'Consultation',
      notes: 'First visit for general checkup'
    },
    {
      id: 3,
      patientName: 'Ava Richardson',
      doctorName: 'Dr. William Smith',
      date: '2026-04-09',
      time: '08:30',
      status: 'Completed',
      type: 'Consultation',
      notes: 'First visit for general checkup'
    },
    {
      id: 4,
      patientName: 'Ava Richardson',
      doctorName: 'Dr. William Smith',
      date: '2026-04-08',
      time: '09:00',
      status: 'Pending',
      type: 'Consultation',
      notes: 'First visit for general checkup'
    },
    {
      id: 5,
      patientName: 'Ava Richardson',
      doctorName: 'Dr. William Smith',
      date: '2026-04-07',
      time: '09:00',
      status: 'Canceled',
      type: 'Consultation',
      notes: 'First visit for general checkup'
    },
  ]);
  // get observable list of appointments
  appointments$ = this.appointmentsSource.asObservable();
  // reactive stats of appointments
  appointmentStats$ = this.appointments$.pipe(
    map((appointments) => {
      const stats = {
        Active: 0,
        Upcoming: 0,
        Completed: 0,
        Pending: 0,
        Canceled: 0,
        Total: 0,
      }
      for(let app of appointments){
        if(stats[app.status as keyof typeof stats] !== undefined){
          stats[app.status as keyof typeof stats]++;
          stats.Total++;
        }
      }
      return stats;
    })
  )

  // ADD NEW APPOINTMENT
  addAppointment(appointment: Appointment) {
    const currentAppointments = this.appointmentsSource.value;
    const updatedAppointments = [...currentAppointments, appointment]
    this.appointmentsSource.next(updatedAppointments);
  }

  // REMOVE APPOINTMENTS
  removeAppointment(removedApp: number) {
    const currentAppointments = this.appointmentsSource.value;
    const index = currentAppointments.findIndex(app => app.id === removedApp);

    if(index !== -1) {
      const updatedAppointments = [...currentAppointments];
      updatedAppointments.splice(index, 1);

      this.appointmentsSource.next(updatedAppointments);
    }
  }

  // UPDATE APPOINTMENTS
  updateAppointments(updatedApp: Appointment) {
    const currentAppointments = this.appointmentsSource.value;
    const index = currentAppointments.findIndex(app => app.id === updatedApp.id);

    if(index !== -1) {
      const updatedAppointments = [...currentAppointments];
      updatedAppointments[index] = updatedApp;
      this.appointmentsSource.next(updatedAppointments);
    }
  }
}