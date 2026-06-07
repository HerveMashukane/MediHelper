import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

export type KpiAccent = 'patient' | 'doctor' | 'appointment' | 'medication' | 'critical' | 'neutral';

@Component({
  selector: 'app-kpi-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="clinical-card p-5 transition" [class.cursor-pointer]="!!link" [class.hover:opacity-90]="!!link">
      <div class="flex items-start justify-between gap-2">
        <p class="text-clinical-muted text-sm">{{ title }}</p>
        @if (icon) {
          <i class="fa-solid {{ icon }} text-clinical-muted text-lg"></i>
        }
      </div>
      <h2 class="text-2xl font-semibold mt-2" [ngClass]="accentValueClass">{{ value }}</h2>
      @if (trend) {
        <p class="text-xs mt-1" [ngClass]="accentValueClass">{{ trend }}</p>
      }
      @if (link) {
        <a [routerLink]="link" class="link-action mt-2 inline-block">View details</a>
      }
    </div>
  `,
})
export class KpiCardComponent {
  @Input({ required: true }) title!: string;
  @Input({ required: true }) value!: string | number;
  @Input() icon?: string;
  @Input() trend?: string;
  @Input() accent: KpiAccent = 'appointment';
  @Input() link?: string;

  get accentValueClass(): string {
    const map: Record<KpiAccent, string> = {
      patient: 'kpi-accent-patient',
      doctor: 'kpi-accent-doctor',
      appointment: 'kpi-accent-appointment',
      medication: 'kpi-accent-medication',
      critical: 'kpi-accent-critical',
      neutral: 'kpi-accent-neutral',
    };
    return map[this.accent];
  }
}
