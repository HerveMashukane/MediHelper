import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

export type KpiAccent = 'green' | 'sky' | 'yellow' | 'red' | 'slate';

@Component({
  selector: 'app-kpi-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div
      class="clinical-card p-5 transition cursor-default"
      [class.hover:border-clinical-accent]="!!link"
      [ngClass]="accentBorderClass"
    >
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
        <a [routerLink]="link" class="text-xs text-sky-400 mt-2 inline-block hover:underline">View details</a>
      }
    </div>
  `,
})
export class KpiCardComponent {
  @Input({ required: true }) title!: string;
  @Input({ required: true }) value!: string | number;
  @Input() icon?: string;
  @Input() trend?: string;
  @Input() accent: KpiAccent = 'sky';
  @Input() link?: string;

  get accentValueClass(): string {
    const map: Record<KpiAccent, string> = {
      green: 'text-emerald-400',
      sky: 'text-sky-400',
      yellow: 'text-amber-400',
      red: 'text-red-400',
      slate: 'text-slate-300',
    };
    return map[this.accent];
  }

  get accentBorderClass(): string {
    const map: Record<KpiAccent, string> = {
      green: 'hover:border-emerald-500',
      sky: 'hover:border-sky-500',
      yellow: 'hover:border-amber-400',
      red: 'hover:border-red-400',
      slate: 'hover:border-slate-500',
    };
    return this.link ? map[this.accent] : '';
  }
}
