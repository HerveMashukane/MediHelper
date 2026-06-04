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
              <span class="w-2 h-2 rounded-full" [ngClass]="connected ? 'bg-emerald-500' : 'bg-red-500'"></span>
              <span [ngClass]="connected ? 'text-emerald-400' : 'text-red-400'">
                {{ connected ? 'System Connected' : 'System Disconnected' }}
              </span>
            </div>
          }
          <ng-content select="[headerActions]"></ng-content>
        </div>
      </header>

      @if (alertMessage) {
        <div class="bg-red-950/40 border border-red-800 p-4 rounded-xl flex justify-between items-center gap-4">
          <p class="text-sm text-red-200">{{ alertMessage }}</p>
          @if (alertActionRoute) {
            <a [routerLink]="alertActionRoute" class="text-sm bg-red-800 hover:bg-red-700 px-4 py-1.5 rounded-lg transition shrink-0">
              {{ alertActionLabel ?? 'View' }}
            </a>
          }
        </div>
      }

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        @for (kpi of kpis; track kpi.title) {
          <app-kpi-card
            [title]="kpi.title"
            [value]="kpi.value"
            [trend]="kpi.trend"
            [icon]="kpi.icon"
            [accent]="kpi.accent ?? 'sky'"
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
