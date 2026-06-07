import { Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface TableColumn<T = unknown> {
  key: string;
  header: string;
  cell?: (row: T) => string;
  width?: string;
}

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="table-wrapper">
      @if (loading) {
        <div class="p-8 text-center text-clinical-muted">Loading records...</div>
      } @else if (error) {
        <div class="p-8 text-center text-clinical-error">{{ error }}</div>
      } @else if (!rows?.length) {
        <div class="p-8 text-center text-clinical-muted">{{ emptyMessage }}</div>
      } @else {
        <div class="overflow-x-auto">
          <table class="table text-left">
            <thead class="table-head">
              <tr>
                @for (col of columns; track col.key) {
                  <th class="table-cell font-medium" [style.width]="col.width">{{ col.header }}</th>
                }
                @if (actionsTemplate) {
                  <th class="table-cell w-24">Actions</th>
                }
              </tr>
            </thead>
            <tbody>
              @for (row of rows; track trackByFn($index, row)) {
                <tr class="table-row">
                  @for (col of columns; track col.key) {
                    <td class="table-cell">
                      {{ col.cell ? col.cell(row) : getCellValue(row, col.key) }}
                    </td>
                  }
                  @if (actionsTemplate) {
                    <td class="table-cell">
                      <ng-container *ngTemplateOutlet="actionsTemplate; context: { $implicit: row }"></ng-container>
                    </td>
                  }
                </tr>
              }
            </tbody>
          </table>
        </div>
      }
    </div>
  `,
})
export class DataTableComponent<T extends Record<string, unknown>> {
  @Input({ required: true }) columns!: TableColumn<T>[];
  @Input() rows: T[] = [];
  @Input() loading = false;
  @Input() error: string | null = null;
  @Input() emptyMessage = 'No records found.';
  @Input() actionsTemplate?: TemplateRef<{ $implicit: T }>;
  @Input() trackBy: keyof T | ((row: T) => string) = 'id' as keyof T;
  @Output() rowClick = new EventEmitter<T>();

  trackByFn(index: number, row: T): string | number {
    if (typeof this.trackBy === 'function') {
      return this.trackBy(row);
    }
    const key = this.trackBy as string;
    const val = row[key];
    return val != null ? String(val) : index;
  }

  getCellValue(row: T, key: string): string {
    const val = row[key];
    return val != null ? String(val) : '—';
  }
}
