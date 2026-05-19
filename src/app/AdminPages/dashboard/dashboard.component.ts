import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { AppointmentService } from '../../services/appointments/appointment.service';
import { PatientsService } from '../../services/patients/patients.service';
import { DoctorsService } from '../../services/doctors/doctors.service';
import { MedicationService } from '../../services/medication/medication.service';
import { ConnectionStatusService } from '../../services/connection-status/connection-status.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  // Observable to hold appointments statistics
  appointmentStats$: Observable<{
    Active: number;
    Upcoming: number;
    Completed: number;
    Pending: number;
    Canceled: number;
    Total: number;
  }>;
  // Observable to hold patients statistics
  patientStats$: Observable<{
    Pediatry: number,
    Cardiology: number,
    Dermatology: number,
    Neurology: number,
    Surgery: number,
    Oncology: number,
    Total: number,
  }>;
  // Observable to hold doctors statistics
  doctorStats$: Observable<{
    Generalist: number,
    Cardiologist: number,
    Dermatologist: number,
    Neurologist: number,
    Surgeon: number,
    Oncologist: number,
    Total: number,
  }>;
  // Observable to hold medications statitics
  medicationStats$: Observable<{
    Active: number,
    Inactive: number,
    Completed: number,
    Pending: number,
    Total: number
  }>;
  // check system online status
  isOnline$: Observable<boolean>;

  constructor(
    private appointmentService: AppointmentService,
    private patientService: PatientsService,
    private doctorService: DoctorsService,
    private medicationService: MedicationService,
    private connectionsStatusService: ConnectionStatusService
  ) 
  {
    this.appointmentStats$ = this.appointmentService.appointmentStats$; // appointments stats
    this.patientStats$ = this.patientService.patientStats$; // patients stats
    this.doctorStats$ = this.doctorService.doctorStats$; // doctors stats
    this.medicationStats$ = this.medicationService.medicationStats$; // medicatoion stats
    this.isOnline$ = this.connectionsStatusService.isOnline$; // connection status
  }
  today = new Date();
  patientActivities: any = [
    {patientName: 'Herve Mashukane', doctorName: 'Christelle Pelaya', date: 'September 2, 2025', status: 'Completed'},
    {patientName: 'Hiro Mataba', doctorName: 'Herve Mashukane', date: 'August 10, 2025', status: 'Pending'},
    {patientName: 'Christelle Pelaya', doctorName: 'Hiro Mataba', date: 'July 2, 2025', status: 'Canceled'},
    {patientName: 'Herve Mashukane', doctorName: 'Christelle Pelaya', date: 'March 22, 2025', status: 'Completed'},
    {patientName: 'Hiro Mataba', doctorName: 'Herve Mashukane', date: 'February 18, 2025', status: 'Pending'},
    {patientName: 'Christelle Pelaya', doctorName: 'Hiro Mataba', date: 'January 15, 2025', status: 'Canceled'},
  ]
}
