import { Patient, PatientsService } from '../../../services/patients/patients.service';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { DynamicFormComponent } from '../../../shared/components/dynamic-form/dynamic-form.component';
import { PATIENT_FORM_CONFIG } from '../../../features/clinical/config/patient-form.schema';

@Component({
  selector: 'app-patients-form',
  standalone: true,
  imports: [DynamicFormComponent],
  template: `
    <app-dynamic-form
      [config]="formConfig"
      [initialValue]="initialValue"
      [isEdit]="isEdit"
      (submitted)="onSubmit($event)"
      (cancelled)="onCancel()"
      (fileSelected)="onFileSelected($event)"
    />
  `,
})
export class PatientsFormComponent implements OnChanges {
  formConfig = PATIENT_FORM_CONFIG;
  initialValue: Record<string, unknown> | null = null;
  isEdit = false;
  private imageData = '';

  constructor(private patientsService: PatientsService) {}

  @Input() patient: Patient | null = null;
  @Output() close = new EventEmitter<void>();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['patient']) {
      if (this.patient?.id) {
        this.isEdit = true;
        this.initialValue = { ...this.patient };
        this.imageData = this.patient.image ?? '';
      } else {
        this.isEdit = false;
        this.initialValue = null;
        this.imageData = '';
      }
    }
  }

  onSubmit(value: Record<string, unknown>): void {
    const payload: Patient = {
      id: this.patient?.id ?? '',
      preferedName: String(value['preferedName'] ?? ''),
      fullName: String(value['fullName'] ?? ''),
      email: String(value['email'] ?? ''),
      phone: String(value['phone'] ?? ''),
      department: String(value['department'] ?? ''),
      age: String(value['age'] ?? ''),
      bloodGroup: String(value['bloodGroup'] ?? ''),
      image: this.imageData || this.patient?.image || '',
    };

    if (this.isEdit && payload.id) {
      this.patientsService.updatePatients(payload);
    } else {
      this.patientsService.addPatient({ ...payload, id: '' });
    }
    this.onCancel();
  }

  onCancel(): void {
    this.close.emit();
  }

  onFileSelected(event: { field: string; file: File }): void {
    if (event.field !== 'image') return;
    const reader = new FileReader();
    reader.onload = () => {
      this.imageData = reader.result as string;
    };
    reader.readAsDataURL(event.file);
  }
}
