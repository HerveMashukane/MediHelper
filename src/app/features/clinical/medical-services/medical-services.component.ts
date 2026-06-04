import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { map } from 'rxjs';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { DataTableComponent, TableColumn } from '../../../shared/components/data-table/data-table.component';
import { DynamicFormComponent } from '../../../shared/components/dynamic-form/dynamic-form.component';
import { AppButtonComponent } from '../../../shared/components/app-button/app-button.component';
import { MEDICAL_SERVICE_FORM_CONFIG } from '../config/medical-service-form.schema';
import { MedicalServicesService } from '../../../services/medical-services/medical-services.service';

@Component({
  selector: 'app-medical-services',
  standalone: true,
  imports: [
    CommonModule,
    PageHeaderComponent,
    DataTableComponent,
    DynamicFormComponent,
    AppButtonComponent,
  ],
  template: `
    <section class="page-container animate-pageFlip">
      <app-page-header title="Medical Services" [subtitle]="'Catalog • ' + ((services$ | async)?.length ?? 0) + ' services'">
        <app-button variant="primary" icon="bi bi-plus-lg" (clicked)="openForm()">New Service</app-button>
      </app-page-header>

      <app-data-table
        [columns]="columns"
        [rows]="(tableRows$ | async) ?? []"
        emptyMessage="No medical services defined yet."
      />

      @if (showForm) {
        <app-dynamic-form
          [config]="formConfig"
          [initialValue]="editing"
          [isEdit]="!!editing?.['id']"
          (submitted)="onSubmit($event)"
          (cancelled)="closeForm()"
        />
      }
    </section>
  `,
})
export class MedicalServicesComponent {
  formConfig = MEDICAL_SERVICE_FORM_CONFIG;
  showForm = false;
  editing: Record<string, unknown> | null = null;
  services$;
  tableRows$;

  columns: TableColumn<Record<string, unknown>>[] = [
    { key: 'name', header: 'Service' },
    { key: 'department', header: 'Department' },
    {
      key: 'price',
      header: 'Price',
      cell: (r) => `$${r['price']}`,
    },
    {
      key: 'durationMinutes',
      header: 'Duration',
      cell: (r) => `${r['durationMinutes']} min`,
    },
    {
      key: 'isActive',
      header: 'Status',
      cell: (r) => (r['isActive'] ? 'Active' : 'Inactive'),
    },
  ];

  constructor(private medicalServicesService: MedicalServicesService) {
    this.services$ = this.medicalServicesService.services$;
    this.tableRows$ = this.services$.pipe(
      map((list) => list.map((s) => ({ ...s }) as Record<string, unknown>))
    );
  }

  openForm(): void {
    this.editing = null;
    this.showForm = true;
  }

  closeForm(): void {
    this.showForm = false;
    this.editing = null;
  }

  onSubmit(value: Record<string, unknown>): void {
    const dto = {
      name: String(value['name']),
      department: String(value['department']),
      description: String(value['description'] ?? ''),
      price: Number(value['price']),
      durationMinutes: Number(value['durationMinutes']),
      isActive: true,
    };
    if (this.editing?.['id']) {
      this.medicalServicesService.update(String(this.editing['id']), dto);
    } else {
      this.medicalServicesService.create(dto);
    }
    this.closeForm();
  }
}
