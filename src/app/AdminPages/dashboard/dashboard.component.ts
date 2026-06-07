import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { combineLatest, map, Observable } from 'rxjs';
import { RouterLink } from '@angular/router';
import {
  DashboardShellComponent,
  DashboardKpi,
} from '../../shared/components/dashboard-shell/dashboard-shell.component';
import { DataTableComponent, TableColumn } from '../../shared/components/data-table/data-table.component';
import { AppointmentService } from '../../services/appointments/appointment.service';
import { PatientsService } from '../../services/patients/patients.service';
import { DoctorsService } from '../../services/doctors/doctors.service';
import { MedicationService } from '../../services/medication/medication.service';
import { ConnectionStatusService } from '../../services/connection-status/connection-status.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, DashboardShellComponent, DataTableComponent],
  template: `
    <app-dashboard-shell
      title="MediHelper Dashboard"
      subtitle="Hospital operational overview"
      [kpis]="(kpis$ | async) ?? []"
      [connected]="(isOnline$ | async) ?? false"
      alertMessage="2 missed appointments • 1 urgent patient requires attention"
      alertActionRoute="/admin/appointments"
      alertActionLabel="View Critical Cases"
    >
      <div class="content-grid-3">
        <div class="content-main">
          <div class="clinical-card p-6">
            <div class="flex justify-between items-center mb-4">
              <h2 class="table-section-title">Upcoming Appointments</h2>
              <a routerLink="/appointments" class="link-action">View all</a>
            </div>
            <div class="clinical-card p-4 flex items-center justify-between">
              <div>
                <p class="font-medium text-white">Herve Mashukane</p>
                <span class="text-sm text-clinical-muted">10:00 AM • Cardiology</span>
              </div>
              <div class="flex gap-2">
                <button class="btn-secondary btn-sm">Complete</button>
                <button class="btn-danger btn-sm">Cancel</button>
              </div>
            </div>
          </div>

          <div>
            <h2 class="table-section-title mb-3">Recent Activity</h2>
            <app-data-table
              [columns]="activityColumns"
              [rows]="patientActivities"
              emptyMessage="No recent activity."
            />
          </div>
        </div>

        <div class="space-y-6">
          <div class="clinical-card p-6">
            <h2 class="table-section-title mb-4">Today Timeline</h2>
            <div class="space-y-3 text-sm">
              <div class="flex justify-between items-center">
                <span class="text-clinical-muted">09:00</span>
                <span class="timeline-badge-neutral">Available</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-clinical-muted">10:00</span>
                <span class="timeline-badge-info">Booked • Dr Herve</span>
              </div>
            </div>
          </div>
          <div class="clinical-card p-6">
            <h2 class="table-section-title mb-4">Insights</h2>
            <ul class="space-y-2 text-sm text-clinical-body">
              <li>Peak hours: 10AM - 12PM</li>
              <li>Most active doctor: Dr Herve</li>
              <li>High cancellation rate today</li>
            </ul>
          </div>
        </div>
      </div>
    </app-dashboard-shell>
  `,
})
export class DashboardComponent {
  isOnline$: Observable<boolean>;
  kpis$: Observable<DashboardKpi[]>;

  activityColumns: TableColumn<Record<string, unknown>>[] = [
    { key: 'patientName', header: 'Patient' },
    { key: 'doctorName', header: 'Doctor' },
    { key: 'date', header: 'Date' },
    { key: 'status', header: 'Status' },
  ];

  patientActivities: Record<string, unknown>[] = [
    { patientName: 'Herve Mashukane', doctorName: 'Christelle Pelaya', date: 'September 2, 2025', status: 'Completed' },
    { patientName: 'Hiro Mataba', doctorName: 'Herve Mashukane', date: 'August 10, 2025', status: 'Pending' },
    { patientName: 'Christelle Pelaya', doctorName: 'Hiro Mataba', date: 'July 2, 2025', status: 'Canceled' },
  ];

  constructor(
    private appointmentService: AppointmentService,
    private patientService: PatientsService,
    private doctorService: DoctorsService,
    private medicationService: MedicationService,
    private connectionsStatusService: ConnectionStatusService
  ) {
    this.isOnline$ = this.connectionsStatusService.isOnline$;
    this.kpis$ = combineLatest([
      this.patientService.patientStats$,
      this.doctorService.doctorStats$,
      this.appointmentService.appointmentStats$,
      this.medicationService.medicationStats$,
    ]).pipe(
      map(([p, d, a, m]): DashboardKpi[] => [
        { title: 'Patients', value: p.Total, trend: '+2 new', icon: 'fa-user-injured', accent: 'patient', link: '/admin/patients' },
        { title: 'Doctors', value: d.Total, trend: '+2 new', icon: 'fa-user-doctor', accent: 'doctor', link: '/admin/doctors' },
        { title: 'Appointments', value: a.Total, trend: '+4 today', icon: 'fa-calendar-check', accent: 'appointment', link: '/admin/appointments' },
        { title: 'Medications Due', value: m.Total, trend: '1 overdue', icon: 'fa-pills', accent: 'medication', link: '/admin/pharmacy' },
        { title: 'Critical Alerts', value: 2, trend: 'Requires attention', icon: 'fa-triangle-exclamation', accent: 'critical' },
      ])
    );
  }
}
