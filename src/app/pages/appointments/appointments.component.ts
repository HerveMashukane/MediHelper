import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AppointmentsFormComponent } from './appointments-form/appointments-form.component';
import { AppointmentService, Appointment } from '../../services/appointments/appointment.service';
import { Observable } from 'rxjs';

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
    Total: number;
  }>;
  isFormVisible: boolean = false;

  constructor(private appointmentService: AppointmentService) {
    this.appointments$ = this.appointmentService.appointments$;
    this.appointmentStats$ = this.appointmentService.appointmentStats$;
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