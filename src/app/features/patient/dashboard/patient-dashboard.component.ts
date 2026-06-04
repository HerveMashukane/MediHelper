import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { map, Observable } from 'rxjs';
import { DashboardShellComponent, DashboardKpi } from '../../../shared/components/dashboard-shell/dashboard-shell.component';
import { AppointmentService } from '../../../services/appointments/appointment.service';

@Component({
  selector: 'app-patient-dashboard',
  standalone: true,
  imports: [CommonModule, DashboardShellComponent],
  template: `
    <app-dashboard-shell
      title="Patient Portal"
      subtitle="Your health at a glance"
      [kpis]="(kpis$ | async) ?? []"
      [showConnection]="false"
    >
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="clinical-card p-6">
          <h2 class="text-lg font-semibold text-white mb-2">Next appointment</h2>
          <p class="text-slate-300 text-sm">Check Appointments for your full schedule.</p>
        </div>
        <div class="clinical-card p-6">
          <h2 class="text-lg font-semibold text-white mb-2">Health summary</h2>
          <p class="text-slate-300 text-sm">View records for prescriptions, labs, and visit history.</p>
        </div>
      </div>
    </app-dashboard-shell>
  `,
})
export class PatientDashboardComponent {
  kpis$: Observable<DashboardKpi[]>;

  constructor(private appointmentService: AppointmentService) {
    this.kpis$ = this.appointmentService.appointmentStats$.pipe(
      map((a): DashboardKpi[] => [
        { title: 'Upcoming Visits', value: a.Upcoming, icon: 'fa-calendar-check', accent: 'sky', link: '/patient/appointments' },
        { title: 'Completed Visits', value: a.Completed, icon: 'fa-clipboard-check', accent: 'green' },
        { title: 'Active Prescriptions', value: 2, icon: 'fa-pills', accent: 'yellow' },
        { title: 'Messages', value: 0, trend: 'No unread', icon: 'fa-envelope', accent: 'slate' },
      ])
    );
  }
}
