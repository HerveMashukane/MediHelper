import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { combineLatest, map, Observable } from 'rxjs';
import { DashboardShellComponent, DashboardKpi } from '../../../shared/components/dashboard-shell/dashboard-shell.component';
import { AppointmentService } from '../../../services/appointments/appointment.service';
import { PatientsService } from '../../../services/patients/patients.service';

@Component({
  selector: 'app-doctor-dashboard',
  standalone: true,
  imports: [CommonModule, DashboardShellComponent],
  template: `
    <app-dashboard-shell
      title="Doctor Dashboard"
      subtitle="Your clinical workspace"
      [kpis]="(kpis$ | async) ?? []"
      [showConnection]="false"
      alertMessage="You have 3 appointments today • 1 lab result pending review"
      alertActionRoute="/doctor/appointments"
      alertActionLabel="Open schedule"
    >
      <div class="clinical-card p-6">
        <h2 class="text-lg font-semibold text-white mb-3">Clinical priorities</h2>
        <ul class="text-sm text-clinical-body space-y-2">
          <li>Review pending consultation notes</li>
          <li>Follow up on abnormal lab results</li>
          <li>Confirm tomorrow&apos;s surgical cases</li>
        </ul>
      </div>
    </app-dashboard-shell>
  `,
})
export class DoctorDashboardComponent {
  kpis$: Observable<DashboardKpi[]>;

  constructor(
    private appointmentService: AppointmentService,
    private patientsService: PatientsService
  ) {
    this.kpis$ = combineLatest([
      this.appointmentService.appointmentStats$,
      this.patientsService.patientStats$,
    ]).pipe(
      map(([a, p]): DashboardKpi[] => [
        { title: "Today's Appointments", value: a.Upcoming + a.Active, icon: 'fa-calendar-day', accent: 'appointment', link: '/doctor/appointments' },
        { title: 'My Patients', value: p.Total, icon: 'fa-user-injured', accent: 'patient', link: '/doctor/patients' },
        { title: 'Pending Reviews', value: 4, trend: 'Labs & imaging', icon: 'fa-file-medical', accent: 'medication' },
        { title: 'Completed Today', value: a.Completed, icon: 'fa-circle-check', accent: 'patient' },
      ])
    );
  }
}
