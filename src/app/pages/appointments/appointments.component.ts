import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-appointments',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './appointments.component.html',
  styleUrl: './appointments.component.css'
})
export class AppointmentsComponent {
  patientAppointments: any = [
    {patientName: 'Herve Mashukane', doctorName: 'Christelle Pelaya', date: 'September 2, 2025', time: '10:00AM', status: 'Completed', viewBtn: 'View', editBtn: 'Edit', cancelBtn: 'Cancel'},
    {patientName: 'Hiro Mataba', doctorName: 'Herve Mashukane', date: 'August 10, 2025', time: '11:30AM', status: 'Pending', viewBtn: 'View', editBtn: 'Edit', cancelBtn: 'Cancel'},
    {patientName: 'Christelle Pelaya', doctorName: 'Hiro Mataba', date: 'July 2, 2025', time: '2:00PM', status: 'Canceled', viewBtn: 'View', editBtn: 'Edit', cancelBtn: 'Cancel'},
    {patientName: 'Herve Mashukane', doctorName: 'Christelle Pelaya', date: 'March 22, 2025', time: '2:30PM', status: 'Completed', viewBtn: 'View', editBtn: 'Edit', cancelBtn: 'Cancel'},
    {patientName: 'Hiro Mataba', doctorName: 'Herve Mashukane', date: 'February 18, 2025', status: 'Pending', time: '3:30PM', viewBtn: 'View', editBtn: 'Edit', cancelBtn: 'Cancel'},
    {patientName: 'Christelle Pelaya', doctorName: 'Hiro Mataba', date: 'January 15, 2025', status: 'Canceled', time: '4:00PM', viewBtn: 'View', editBtn: 'Edit', cancelBtn: 'Cancel'},
    {patientName: 'Herve Mashukane', doctorName: 'Christelle Pelaya', date: 'September 2, 2025', time: '10:00AM', status: 'Completed', viewBtn: 'View', editBtn: 'Edit', cancelBtn: 'Cancel'},
    {patientName: 'Hiro Mataba', doctorName: 'Herve Mashukane', date: 'August 10, 2025', time: '11:30AM', status: 'Pending', viewBtn: 'View', editBtn: 'Edit', cancelBtn: 'Cancel'},
    {patientName: 'Christelle Pelaya', doctorName: 'Hiro Mataba', date: 'July 2, 2025', time: '2:00PM', status: 'Canceled', viewBtn: 'View', editBtn: 'Edit', cancelBtn: 'Cancel'},
    {patientName: 'Herve Mashukane', doctorName: 'Christelle Pelaya', date: 'March 22, 2025', time: '2:30PM', status: 'Completed', viewBtn: 'View', editBtn: 'Edit', cancelBtn: 'Cancel'},
    {patientName: 'Hiro Mataba', doctorName: 'Herve Mashukane', date: 'February 18, 2025', status: 'Pending', time: '3:30PM', viewBtn: 'View', editBtn: 'Edit', cancelBtn: 'Cancel'},
    {patientName: 'Christelle Pelaya', doctorName: 'Hiro Mataba', date: 'January 15, 2025', status: 'Canceled', time: '4:00PM', viewBtn: 'View', editBtn: 'Edit', cancelBtn: 'Cancel'},
  ]
}
