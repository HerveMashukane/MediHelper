import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { map, Observable } from 'rxjs';
import { DashboardShellComponent, DashboardKpi } from '../../../shared/components/dashboard-shell/dashboard-shell.component';
import { MedicationService } from '../../../services/medication/medication.service';

@Component({
  selector: 'app-staff-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, DashboardShellComponent],
  template: `
    <app-dashboard-shell
      title="Medical Staff Dashboard"
      subtitle="Lab • Pharmacy • Radiology"
      [kpis]="(kpis$ | async) ?? []"
      [showConnection]="false"
    >
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <a routerLink="/staff/pharmacy" class="clinical-card p-5 transition block hover:opacity-90">
          <h3 class="font-semibold text-white"><i class="fa-solid fa-pills mr-2 text-clinical-accent"></i>Pharmacy</h3>
          <p class="text-sm text-clinical-muted mt-2">Dispensing & inventory</p>
        </a>
        <a routerLink="/staff/laboratory" class="clinical-card p-5 transition block hover:opacity-90">
          <h3 class="font-semibold text-white"><i class="fa-solid fa-flask mr-2 text-clinical-accent"></i>Laboratory</h3>
          <p class="text-sm text-clinical-muted mt-2">Tests & results</p>
        </a>
        <a routerLink="/staff/radiology" class="clinical-card p-5 transition block hover:opacity-90">
          <h3 class="font-semibold text-white"><i class="fa-solid fa-x-ray mr-2 text-clinical-accent"></i>Radiology</h3>
          <p class="text-sm text-clinical-muted mt-2">Imaging orders</p>
        </a>
      </div>
    </app-dashboard-shell>
  `,
})
export class StaffDashboardComponent {
  kpis$: Observable<DashboardKpi[]>;

  constructor(private medicationService: MedicationService) {
    this.kpis$ = this.medicationService.medicationStats$.pipe(
      map((m): DashboardKpi[] => [
        { title: 'Pharmacy Queue', value: m.Pending, icon: 'fa-pills', accent: 'medication', link: '/staff/pharmacy' },
        { title: 'Lab Orders', value: 12, icon: 'fa-flask', accent: 'appointment', link: '/staff/laboratory' },
        { title: 'Imaging Pending', value: 5, icon: 'fa-x-ray', accent: 'appointment', link: '/staff/radiology' },
        { title: 'Completed Today', value: m.Completed, icon: 'fa-check', accent: 'patient' },
      ])
    );
  }
}
