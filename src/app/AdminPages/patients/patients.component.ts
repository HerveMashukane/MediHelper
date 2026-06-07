import { Patient, PatientsService } from '../../services/patients/patients.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PatientsFormComponent } from './patients-form/patients-form.component';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { ConfirmDialogService } from '../../confirm-dialog.service';
import { DetailModalComponent, DetailField } from '../../shared/components/detail-modal/detail-modal.component';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';
import { AppButtonComponent } from '../../shared/components/app-button/app-button.component';

@Component({
  selector: 'app-patients',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    DetailModalComponent,
    PatientsFormComponent,
    PageHeaderComponent,
    AppButtonComponent,
  ],
  templateUrl: './patients.component.html',
  styleUrl: './patients.component.css',
})
export class PatientsComponent {
  patients$: Observable<Patient[]>;
  isFormVisible = false;
  selectedDepartment = 'All';
  searchPatient = '';
  selectedPatient: Patient | null = null;
  isModelOpen = false;
  editingPatient: Patient | null = null;
  modalFields: DetailField[] = [];

  constructor(
    private patientsService: PatientsService,
    private confirm: ConfirmDialogService
  ) {
    this.patients$ = this.patientsService.patients$;
  }

  get filteredPatients(): Patient[] {
    return this.patientsService.patientsSource.value.filter(
      (p) =>
        (this.selectedDepartment === 'All' || p.department === this.selectedDepartment) &&
        (this.searchPatient === '' ||
          p.fullName.toLowerCase().includes(this.searchPatient.toLowerCase()))
    );
  }

  async removePatient(p: Patient): Promise<void> {
    const ok = await this.confirm.request({
      title: 'Delete Patient',
      message: 'Are you sure you want to delete ',
      highlight: `${p.preferedName}`,
      confirmText: 'Yes, delete',
      cancelText: 'Cancel',
    });
    if (!ok) return;
    this.patientsService.removePatient(p);
  }

  toggleForm(): void {
    this.isFormVisible = !this.isFormVisible;
    if (!this.isFormVisible) {
      this.editingPatient = null;
    }
  }

  closeModel(): void {
    this.isModelOpen = false;
  }

  viewPatient(patient: Patient): void {
    this.selectedPatient = patient;
    this.modalFields = [
      { label: 'Full Name', value: patient.fullName },
      { label: 'Department', value: patient.department },
      { label: 'Email', value: patient.email },
      { label: 'Phone', value: patient.phone },
      { label: 'Age', value: patient.age },
      { label: 'Blood Group', value: patient.bloodGroup },
    ];
    this.isModelOpen = true;
  }

  editPatient(patient: Patient): void {
    this.editingPatient = { ...patient };
    this.isFormVisible = true;
  }
}
