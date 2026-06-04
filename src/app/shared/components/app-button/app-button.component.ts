import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      [type]="type"
      [disabled]="disabled"
      (click)="onClick($event)"
      class="inline-flex items-center justify-center gap-2 rounded-lg font-medium transition disabled:opacity-50 disabled:cursor-not-allowed"
      [ngClass]="[sizeClass, variantClass]"
    >
      @if (icon) {
        <i [class]="icon"></i>
      }
      <ng-content></ng-content>
    </button>
  `,
})
export class AppButtonComponent {
  @Input() type: 'button' | 'submit' = 'button';
  @Input() variant: ButtonVariant = 'primary';
  @Input() size: ButtonSize = 'md';
  @Input() disabled = false;
  @Input() icon?: string;
  @Output() clicked = new EventEmitter<MouseEvent>();

  get variantClass(): string {
    const map: Record<ButtonVariant, string> = {
      primary: 'bg-sky-600 hover:bg-sky-500 text-white',
      secondary: 'bg-slate-700 hover:bg-slate-600 text-white',
      danger: 'bg-red-700 hover:bg-red-600 text-white',
      ghost: 'bg-transparent hover:bg-slate-800 text-slate-300',
    };
    return map[this.variant];
  }

  get sizeClass(): string {
    const map: Record<ButtonSize, string> = {
      sm: 'px-3 py-1 text-sm',
      md: 'px-4 py-2 text-sm',
      lg: 'px-6 py-2.5',
    };
    return map[this.size];
  }

  onClick(event: MouseEvent): void {
    if (!this.disabled) {
      this.clicked.emit(event);
    }
  }
}
