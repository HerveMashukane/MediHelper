import { Doctor, DoctorsService } from '../../../services/doctors/doctors.service';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { DynamicFormComponent } from '../../../shared/components/dynamic-form/dynamic-form.component';
import { DOCTOR_FORM_CONFIG } from '../../../features/clinical/config/doctor-form.schema';

@Component({
  selector: 'app-doctors-form',
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
export class DoctorsFormComponent implements OnChanges {
  formConfig = DOCTOR_FORM_CONFIG;
  initialValue: Record<string, unknown> | null = null;
  isEdit = false;
  private imageData = '';

  constructor(private doctorsService: DoctorsService) {}

  @Input() doctor: Doctor | null = null;
  @Output() close = new EventEmitter<void>();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['doctor']) {
      if (this.doctor?.id) {
        this.isEdit = true;
        this.initialValue = { ...this.doctor };
        this.imageData = this.doctor.image ?? '';
      } else {
        this.isEdit = false;
        this.initialValue = null;
      }
    }
  }

  onSubmit(value: Record<string, unknown>): void {
    const payload: Doctor = {
      id: this.doctor?.id ?? '',
      fullName: String(value['fullName'] ?? ''),
      preferedName: String(value['preferedName'] ?? ''),
      email: String(value['email'] ?? ''),
      phone: String(value['phone'] ?? ''),
      speciality: String(value['speciality'] ?? ''),
      hospital: String(value['hospital'] ?? ''),
      image: this.imageData || this.doctor?.image || '',
    };

    if (this.isEdit && payload.id) {
      this.doctorsService.updateDoctors(payload);
    } else {
      this.doctorsService.addDoctor({ ...payload, id: '' });
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
