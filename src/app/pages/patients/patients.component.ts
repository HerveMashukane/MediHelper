import { Patient, PatientsService } from './../../services/patients.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PatientsFormComponent } from '../patients/patients-form/patients-form.component';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { ConfirmDialogService } from '../../confirm-dialog.service';
import { CardModalComponent } from '../../reusable-components/card-modal/card-modal.component';

@Component({
  selector: 'app-patients',
  standalone: true,
  imports: [CommonModule, FormsModule, CardModalComponent, PatientsFormComponent],
  templateUrl: './patients.component.html',
  styleUrl: './patients.component.css'
})
export class PatientsComponent {
  patients$: Observable<Patient[]>;
  isFormVisible: boolean = false;

   constructor(
    private patientsService: PatientsService,
    private confirm: ConfirmDialogService
  ) {
    this.patients$ = this.patientsService.patients$;
  }

  // remove patient from list
  async removePatient(id: number, fullName: string) {
    const ok = await this.confirm.request({
      title: 'Delete Patient',
      message: 'Are you sure you want to delete ',
      hightlight: `${fullName}`,
      confirmText: 'Yes, delete',
      cancelText: 'Cancel',
    });

    if (!ok) return;
    this.patientsService.removePatient(id);
  }

  // toggle patient form
  toggleForm() {
    this.isFormVisible = !this.isFormVisible;
  }

  // filters variables
  selectedDepartment: string = 'All';
  searchPatient: string = '';

  // getter to filter patients by department and name
  get filteredPatients() {
    const allPatients = this.patientsService.patientsSource.value;

    return allPatients.filter(p => 
      (this.selectedDepartment === 'All' || p.department === this.selectedDepartment) && 
      (this.searchPatient === '' || p.fullName.toLowerCase().includes(this.searchPatient.toLowerCase()))
    );
  }

  // view patient
  selectedPatient: Patient | null = null;
  isModelOpen: boolean = false;
  closeModel() {
    this.isModelOpen = false;
  }
  
  viewPatient(patient: Patient) {
    this.selectedPatient = patient;
    this.isModelOpen = true;
  }

  // edit patients
  editPatient(patient: Patient) {
    this.toggleForm()
  }
}
