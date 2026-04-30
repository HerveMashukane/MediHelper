import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AppointmentsFormComponent } from './appointments-form/appointments-form.component';
import { AppointmentService, Appointment } from '../../services/appointments/appointment.service';
import { Observable } from 'rxjs';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-appointments',
  standalone: true,
  imports: [CommonModule, AppointmentsFormComponent, FormsModule],
  templateUrl: './appointments.component.html',
  styleUrl: './appointments.component.css'
})
export class AppointmentsComponent {

  appointments$!: Observable<Appointment[]>;
  filteredAppointments$!: Observable<Appointment[]>;

  searchTerm: string = '';
  selectedStatus: string = 'All';
  searchTerm$ = new BehaviorSubject<string>('');
  selectedStatus$ = new BehaviorSubject<string>('All');

  constructor(private appointmentService: AppointmentService) {
    this.appointments$ = this.appointmentService.appointments$;
    this.appointmentStats$ = this.appointmentService.appointmentStats$;
  }

  ngOnInit(): void {
    this.appointments$ = this.appointmentService.appointments$;

    this.filteredAppointments$ = combineLatest([
      this.appointments$,
      this.searchTerm$,
      this.selectedStatus$
    ]).pipe(
      map(([appointments, searchTerm, selectedStatus]) => {
        return appointments.filter(app => {
          const matchesSearch =
            app.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            app.doctorName.toLowerCase().includes(searchTerm.toLowerCase());

          const matchesStatus =
            selectedStatus === 'All' || app.status === selectedStatus;

          return matchesSearch && matchesStatus;
        });
      })
    );
  }
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
  toggleFormVisibility() {
    this.isFormVisible = !this.isFormVisible;
  }

  // toggle menu actions in the appointments table
  activeMenuIndex: number | null = null;
  toggleMenu(index: number) {
    this.activeMenuIndex = this.activeMenuIndex === index ? null : index;
  }
}