import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoctorsFormComponent } from './doctors-form/doctors-form.component';
import { Doctor, DoctorsService } from '../../services/doctors/doctors.service';
import { FormsModule } from '@angular/forms';
import { ConfirmDialogService } from '../../confirm-dialog.service';
import { DetailModalComponent, DetailField } from '../../shared/components/detail-modal/detail-modal.component';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';
import { AppButtonComponent } from '../../shared/components/app-button/app-button.component';

@Component({
  selector: 'app-doctors',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    DoctorsFormComponent,
    DetailModalComponent,
    PageHeaderComponent,
    AppButtonComponent,
  ],
  templateUrl: './doctors.component.html',
  styleUrl: './doctors.component.css',
})
export class DoctorsComponent {
  isFormVisible = false;
  selectedDoctor: Doctor | null = null;
  isModalOpen = false;
  selectedSpeciality = 'All';
  searchDoctor = '';
  editingDoctor: Doctor | null = null;
  modalFields: DetailField[] = [];

  constructor(
    private doctorsService: DoctorsService,
    private confirm: ConfirmDialogService
  ) {}

  get filteredDoctors(): Doctor[] {
    return this.doctorsService.doctorsSource.value.filter(
      (d) =>
        (this.selectedSpeciality === 'All' ||
          d.speciality.toLowerCase() === this.selectedSpeciality.toLowerCase()) &&
        (this.searchDoctor === '' ||
          d.fullName.toLowerCase().includes(this.searchDoctor.toLowerCase()))
    );
  }

  toggleForm(): void {
    this.isFormVisible = !this.isFormVisible;
    if (!this.isFormVisible) {
      this.editingDoctor = null;
    }
  }

  viewDoctor(doctor: Doctor): void {
    this.selectedDoctor = doctor;
    this.modalFields = [
      { label: 'Full Name', value: doctor.fullName },
      { label: 'Speciality', value: doctor.speciality },
      { label: 'Hospital', value: doctor.hospital },
      { label: 'Email', value: doctor.email },
      { label: 'Phone', value: doctor.phone },
    ];
    this.isModalOpen = true;
  }

  closeModel(): void {
    this.selectedDoctor = null;
    this.isModalOpen = false;
  }

  async removeDoctor(d: Doctor): Promise<void> {
    const ok = await this.confirm.request({
      title: 'Delete Doctor',
      message: 'Are you sure you want to delete the',
      highlight: `Dr. ${d.preferedName}`,
      confirmText: 'Yes, delete',
      cancelText: 'Cancel',
    });
    if (!ok) return;
    this.doctorsService.removeDoctor(d);
  }

  editDoctor(doctor: Doctor): void {
    this.editingDoctor = { ...doctor };
    this.isFormVisible = true;
  }
}
