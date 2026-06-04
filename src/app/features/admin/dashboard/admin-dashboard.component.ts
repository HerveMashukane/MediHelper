import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { combineLatest, map, Observable } from 'rxjs';
import {
  DashboardShellComponent,
  DashboardKpi,
} from '../../../shared/components/dashboard-shell/dashboard-shell.component';
import { DataTableComponent, TableColumn } from '../../../shared/components/data-table/data-table.component';
import { PatientsService } from '../../../services/patients/patients.service';
import { DoctorsService } from '../../../services/doctors/doctors.service';
import { AppointmentService } from '../../../services/appointments/appointment.service';
import { MedicationService } from '../../../services/medication/medication.service';
import { ConnectionStatusService } from '../../../services/connection-status/connection-status.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, DashboardShellComponent, DataTableComponent],
  template: `
    <app-dashboard-shell
      title="Admin Dashboard"
      subtitle="Hospital-wide operations"
      [kpis]="(kpis$ | async) ?? []"
      [connected]="(isOnline$ | async) ?? false"
      alertMessage="2 missed appointments • 1 urgent patient requires attention"
      alertActionRoute="/admin/appointments"
      alertActionLabel="View appointments"
    >
      <div class="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div class="xl:col-span-2">
          <h2 class="text-lg font-semibold text-white mb-3">Recent Appointments</h2>
          <app-data-table
            [columns]="appointmentColumns"
            [rows]="(recentAppointments$ | async) ?? []"
            emptyMessage="No appointments scheduled."
          />
        </div>
        <div class="clinical-card p-6">
          <h2 class="text-lg font-semibold text-white mb-4">Today&apos;s Insights</h2>
          <ul class="space-y-2 text-sm text-slate-300">
            <li>Peak hours: 10AM – 12PM</li>
            <li>Most active department: Cardiology</li>
            <li>Review billing queue before end of day</li>
          </ul>
        </div>
      </div>
    </app-dashboard-shell>
  `,
})
export class AdminDashboardComponent {
  isOnline$: Observable<boolean>;
  kpis$: Observable<DashboardKpi[]>;
  recentAppointments$: Observable<Record<string, unknown>[]>;

  appointmentColumns: TableColumn<Record<string, unknown>>[] = [
    { key: 'patientName', header: 'Patient' },
    { key: 'doctorName', header: 'Doctor' },
    { key: 'date', header: 'Date' },
    { key: 'status', header: 'Status' },
  ];

  constructor(
    private patientsService: PatientsService,
    private doctorsService: DoctorsService,
    private appointmentService: AppointmentService,
    private medicationService: MedicationService,
    private connectionStatus: ConnectionStatusService
  ) {
    this.isOnline$ = this.connectionStatus.isOnline$;
    this.kpis$ = combineLatest([
      this.patientsService.patientStats$,
      this.doctorsService.doctorStats$,
      this.appointmentService.appointmentStats$,
      this.medicationService.medicationStats$,
    ]).pipe(
      map(([p, d, a, m]): DashboardKpi[] => [
        { title: 'Patients', value: p.Total, trend: 'Registered in system', icon: 'fa-user-injured', accent: 'green', link: '/admin/patients' },
        { title: 'Doctors', value: d.Total, trend: 'Active staff', icon: 'fa-user-doctor', accent: 'green', link: '/admin/doctors' },
        { title: 'Appointments', value: a.Total, trend: 'All statuses', icon: 'fa-calendar-check', accent: 'sky', link: '/admin/appointments' },
        { title: 'Medications Due', value: m.Total, trend: 'Pharmacy queue', icon: 'fa-pills', accent: 'yellow', link: '/admin/pharmacy' },
        { title: 'Critical Alerts', value: 2, trend: 'Requires attention', icon: 'fa-triangle-exclamation', accent: 'red' },
      ])
    );
    this.recentAppointments$ = this.appointmentService.appointments$.pipe(
      map((apps) => apps.slice(0, 6) as unknown as Record<string, unknown>[])
    );
  }
}
