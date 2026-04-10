import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AppointmentsFormComponent } from './appointments-form/appointments-form.component';
import { AppointmentService, Appointment } from '../../services/appointments/appointment.service';
@Component({
  selector: 'app-appointments',
  standalone: true,
  imports: [CommonModule, AppointmentsFormComponent],
  templateUrl: './appointments.component.html',
  styleUrl: './appointments.component.css'
})
export class AppointmentsComponent {

  patientAppointments: Appointment[] = [];
  isFormVisible: boolean = false;

  constructor(private appointmentService: AppointmentService) {
    this.loadAppointments();
  }

  loadAppointments() {
    this.patientAppointments = this.appointmentService.getAppointments();
  }

  toggleFormVisibility() {
    this.isFormVisible = !this.isFormVisible;
  }

  // toggle menu actions in the appointments table
  activeMenuIndex: number | null = null;
  toggleMenu(index: number) {
    this.activeMenuIndex = this.activeMenuIndex === index ? null : index;
  }
}
