import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface DetailField {
  label: string;
  value: string;
}

@Component({
  selector: 'app-detail-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (open) {
      <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4" (click)="onBackdrop()">
        <div
          class="clinical-card w-full max-w-md p-6 space-y-4"
          (click)="$event.stopPropagation()"
        >
          <div class="flex justify-between items-start">
            <div>
              <h3 class="text-xl font-semibold text-white">{{ title }}</h3>
              @if (subtitle) {
                <p class="text-clinical-muted text-sm">{{ subtitle }}</p>
              }
            </div>
            <button type="button" class="text-slate-400 hover:text-white" (click)="close.emit()" aria-label="Close">
              <i class="bi bi-x-lg"></i>
            </button>
          </div>
          @if (imageUrl) {
            <img [src]="imageUrl" [alt]="title" class="w-24 h-24 rounded-full object-cover border border-slate-600 mx-auto" />
          }
          <dl class="space-y-2 text-sm">
            @for (f of fields; track f.label) {
              <div class="flex justify-between gap-4 border-b border-slate-800 pb-2">
                <dt class="text-clinical-muted">{{ f.label }}</dt>
                <dd class="text-white text-right">{{ f.value || '—' }}</dd>
              </div>
            }
          </dl>
          <ng-content></ng-content>
        </div>
      </div>
    }
  `,
})
export class DetailModalComponent {
  @Input() open = false;
  @Input({ required: true }) title!: string;
  @Input() subtitle?: string;
  @Input() imageUrl?: string;
  @Input() fields: DetailField[] = [];
  @Input() closeOnBackdrop = true;

  @Output() close = new EventEmitter<void>();

  onBackdrop(): void {
    if (this.closeOnBackdrop) {
      this.close.emit();
    }
  }
}
