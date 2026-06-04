import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { combineLatest, map, Observable } from 'rxjs';
import { DashboardShellComponent, DashboardKpi } from '../../../shared/components/dashboard-shell/dashboard-shell.component';
import { PatientsService } from '../../../services/patients/patients.service';
import { AppointmentService } from '../../../services/appointments/appointment.service';

@Component({
  selector: 'app-reception-dashboard',
  standalone: true,
  imports: [CommonModule, DashboardShellComponent],
  template: `
    <app-dashboard-shell
      title="Reception Dashboard"
      subtitle="Front desk operations"
      [kpis]="(kpis$ | async) ?? []"
      [showConnection]="false"
      alertMessage="Walk-in queue: 2 patients waiting"
      alertActionRoute="/receptionist/patients"
      alertActionLabel="Register patient"
    >
      <div class="clinical-card p-6">
        <h2 class="text-lg font-semibold text-white mb-3">Desk checklist</h2>
        <ul class="text-sm text-slate-300 space-y-2">
          <li>Verify insurance for afternoon appointments</li>
          <li>Print visit summaries for discharged patients</li>
          <li>Update no-show status for missed slots</li>
        </ul>
      </div>
    </app-dashboard-shell>
  `,
})
export class ReceptionDashboardComponent {
  kpis$: Observable<DashboardKpi[]>;

  constructor(
    private patientsService: PatientsService,
    private appointmentService: AppointmentService
  ) {
    this.kpis$ = combineLatest([
      this.patientsService.patientStats$,
      this.appointmentService.appointmentStats$,
    ]).pipe(
      map(([p, a]): DashboardKpi[] => [
        { title: 'Registered Patients', value: p.Total, icon: 'fa-users', accent: 'green', link: '/receptionist/patients' },
        { title: 'Appointments Today', value: a.Active + a.Upcoming, icon: 'fa-calendar-day', accent: 'sky', link: '/receptionist/appointments' },
        { title: 'Pending Check-in', value: a.Pending, icon: 'fa-clock', accent: 'yellow' },
        { title: 'Cancellations', value: a.Canceled, icon: 'fa-ban', accent: 'red' },
      ])
    );
  }
}
