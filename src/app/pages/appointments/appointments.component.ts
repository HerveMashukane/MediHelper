import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AppointmentsFormComponent } from './appointments-form/appointments-form.component';
import { Appointment } from '../../services/appointment.service';

@Component({
  selector: 'app-appointments',
  standalone: true,
  imports: [CommonModule, AppointmentsFormComponent],
  templateUrl: './appointments.component.html',
  styleUrl: './appointments.component.css'
})
export class AppointmentsComponent {

  patientAppointments: Appointment[] = [];
  isFormVisible:boolean = false;

  toggleFormVisibility()
  {
    this.isFormVisible = !this.isFormVisible;
  }
}
