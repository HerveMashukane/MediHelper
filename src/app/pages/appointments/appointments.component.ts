import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AppointmentsFormComponent } from './appointments-form/appointments-form.component';
import { AppointmentService, Appointment } from '../../services/appointments/appointment.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs';
@Component({
  selector: 'app-appointments',
  standalone: true,
  imports: [CommonModule, AppointmentsFormComponent],
  templateUrl: './appointments.component.html',
  styleUrl: './appointments.component.css'
})
export class AppointmentsComponent {

  appointments$: Observable<Appointment[]>;
  // appointment stats for KPI cards
  appointmentStats$: Observable<{
    Active: number;
    Upcoming: number;
    Completed: number;
    Pending: number;
    Canceled: number;

  }>;
  isFormVisible: boolean = false;

  constructor(private appointmentService: AppointmentService) {
    this.appointments$ = this.appointmentService.appointments$;
    // Reactive KPI stats
    this.appointmentStats$ = this.appointments$.pipe(
      map((appointments) => {
        const stats = {
          Active: 0,
          Upcoming: 0,
          Completed: 0,
          Pending: 0,
          Canceled: 0
        };
        for(let app of appointments) {
          if(stats[app.status as keyof typeof stats] !== undefined) {
            stats[app.status as keyof typeof stats]++;
          }
        }
        return stats;
      })
    )
  }
  toggleFormVisibility() {
    this.isFormVisible = !this.isFormVisible;
  }

  // toggle menu actions in the appointments table
  activeMenuIndex: number | null = null;
  toggleMenu(index: number) {
    this.activeMenuIndex = this.activeMenuIndex === index ? null : index;
  }

  // get all appointments
  get filteredAppointments() {
    const allAppointments = this.appointmentService.appointmentsSource.value;
    return allAppointments;
  }
}