import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { fromEvent, map, merge, Observable, startWith } from 'rxjs';
import { AppointmentService } from '../../services/appointments/appointment.service';
import { PatientsService } from '../../services/patients/patients.service';
import { DoctorsService } from '../../services/doctors/doctors.service';
import { MedicationService } from '../../services/medication/medication.service';

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

  constructor(
    private appointmentService: AppointmentService,
    private patientService: PatientsService,
    private doctorService: DoctorsService,
    private medicationService: MedicationService
  ) 
  {
    this.appointmentStats$ = this.appointmentService.appointmentStats$;
    this.patientStats$ = this.patientService.patientStats$;
    this.doctorStats$ = this.doctorService.doctorStats$;
    this.medicationStats$ = this.medicationService.medicationStats$;
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

  // check system online status
  isOnline$ = merge(
    fromEvent(window, 'online'),
    fromEvent(window, 'offline')
  ).pipe(
    map(() => navigator.onLine),
    startWith(navigator.onLine)
  )
}
