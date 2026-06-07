import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { KpiCardComponent, KpiAccent } from '../kpi-card/kpi-card.component';

export interface DashboardKpi {
  title: string;
  value: string | number;
  trend?: string;
  icon?: string;
  accent?: KpiAccent;
  link?: string;
}

@Component({
  selector: 'app-dashboard-shell',
  standalone: true,
  imports: [CommonModule, RouterLink, KpiCardComponent],
  template: `
    <section class="page-container space-y-8 animate-pageFlip">
      <header class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 class="text-3xl font-semibold text-white">{{ title }}</h1>
          <p class="text-clinical-muted text-sm mt-1">
            {{ subtitle }} • {{ today | date:'fullDate' }}
          </p>
        </div>
        <div class="flex items-center gap-4 text-sm">
          @if (showConnection) {
            <div class="flex items-center gap-2">
              <span
                class="w-2 h-2 rounded-full"
                [ngClass]="connected ? 'connection-dot-online' : 'connection-dot-offline'"
              ></span>
              <span [ngClass]="connected ? 'connection-text-online' : 'connection-text-offline'">
                {{ connected ? 'System Connected' : 'System Disconnected' }}
              </span>
            </div>
          }
          <ng-content select="[headerActions]"></ng-content>
        </div>
      </header>

      @if (alertMessage) {
        <div class="alert-danger">
          <p class="alert-danger-text">{{ alertMessage }}</p>
          @if (alertActionRoute) {
            <a [routerLink]="alertActionRoute" class="btn-danger btn-sm shrink-0">
              {{ alertActionLabel ?? 'View' }}
            </a>
          }
        </div>
      }

      <div class="kpi-grid">
        @for (kpi of kpis; track kpi.title) {
          <app-kpi-card
            [title]="kpi.title"
            [value]="kpi.value"
            [trend]="kpi.trend"
            [icon]="kpi.icon"
            [accent]="kpi.accent ?? 'appointment'"
            [link]="kpi.link"
          />
        }
      </div>

      <ng-content></ng-content>
    </section>
  `,
})
export class DashboardShellComponent {
  @Input({ required: true }) title!: string;
  @Input() subtitle = 'Operational overview';
  @Input() kpis: DashboardKpi[] = [];
  @Input() alertMessage?: string;
  @Input() alertActionRoute?: string;
  @Input() alertActionLabel?: string;
  @Input() showConnection = true;
  @Input() connected = true;

  today = new Date();
}
