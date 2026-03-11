import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AppointmentsFormComponent } from './appointments-form/appointments-form.component';

@Component({
  selector: 'app-appointments',
  standalone: true,
  imports: [CommonModule, AppointmentsFormComponent],
  templateUrl: './appointments.component.html',
  styleUrl: './appointments.component.css'
})
export class AppointmentsComponent {

  patientAppointments: any = [
    {
      patientName: 'Herve Mashukane', 
      doctorName: 'Christelle Pelaya', 
      date: 'September 2, 2025', time: '10:00AM', 
      status: 'Completed'
    },
    {
      patientName: 'Hiro Mataba', 
      octorName: 'Herve Mashukane', 
      date: 'August 10, 2025', 
      time: '11:30AM', 
      status: 'Pending'
    },
    {
      patientName: 'Christelle Pelaya', 
      doctorName: 'Hiro Mataba', 
      date: 'July 2, 2025', 
      time: '2:00PM', 
      status: 'Canceled'
    },
    {
      patientName: 'Herve Mashukane', 
      doctorName: 'Christelle Pelaya', 
      date: 'March 22, 2025', 
      time: '2:30PM', 
      status: 'Completed'
    },
    {
      patientName: 'Hiro Mataba', 
      doctorName: 'Herve Mashukane', 
      date: 'February 18, 2025', 
      status: 'Pending', 
      time: '3:30PM'
    },
    {
      patientName: 'Christelle Pelaya', 
      doctorName: 'Hiro Mataba', 
      date: 'January 15, 2025', 
      status: 'Canceled', 
      time: '4:00PM'
    },
    {
      patientName: 'Herve Mashukane', 
      doctorName: 'Christelle Pelaya', 
      date: 'September 2, 2025', 
      time: '10:00AM', 
      status: 'Completed'
    },
    {
      patientName: 'Hiro Mataba', 
      doctorName: 'Herve Mashukane', 
      date: 'August 10, 2025', 
      time: '11:30AM', 
      status: 'Pending'
    },
    {
      patientName: 'Christelle Pelaya', 
      doctorName: 'Hiro Mataba', 
      date: 'July 2, 2025', 
      time: '2:00PM', 
      status: 'Canceled'
    },
    {
      patientName: 'Herve Mashukane', 
      doctorName: 'Christelle Pelaya', 
      date: 'March 22, 2025', 
      time: '2:30PM', 
      status: 'Completed'
    },
    {
      patientName: 'Hiro Mataba', 
      doctorName: 'Herve Mashukane', 
      date: 'February 18, 2025', 
      status: 'Pending', 
      time: '3:30PM'
    },
    {
      patientName: 'Christelle Pelaya', 
      doctorName: 'Hiro Mataba', 
      date: 'January 15, 2025', 
      status: 'Canceled', 
      time: '4:00PM'
    },
  ]

  // Toggle appointments form visibility
  isFormVisible: boolean = false;
  toggleFormVisibility() {
    this.isFormVisible = !this.isFormVisible;
  }
}
