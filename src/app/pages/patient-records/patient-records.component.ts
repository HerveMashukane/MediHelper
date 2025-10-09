import { PatientRecordsService } from './../../services/patient-records.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PatientsFormComponent } from './patients-form/patients-form.component';
import { Observable } from 'rxjs';
import { Patient } from '../../services/patient-records.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-patient-records',
  standalone: true,
  imports: [CommonModule, PatientsFormComponent, FormsModule],
  templateUrl: './patient-records.component.html',
  styleUrl: './patient-records.component.css'
})
export class PatientRecordsComponent {
  patients$: Observable<Patient[]>;
  isFormVisible: boolean = false;

  constructor(private patientRecordsService: PatientRecordsService) {
    this.patients$ = this.patientRecordsService.patients$;
  }
  // patients: any = [
  //   {
  //     preferedName: 'Christelle', 
  //     fullName: 'Christelle Pelaya', 
  //     image: '/assets/images/christelle.png',
  //     alt: 'Christelle Pelaya', 
  //     department: 'Dermatology',
  //     age: '30',
  //     bloodGroup: 'A+',
  //     viewBtn: 'View', 
  //     editBtn: 'Edit',
  //     deleteBtn: 'Delete'
  //   },
  //   {
  //     preferedName: 'Herve', 
  //     fullName: 'Herve Mashukane', 
  //     image: '/assets/images/herve.png', 
  //     alt: 'Herve Mashukane', 
  //     department: 'Cardiology', 
  //     age: '28',
  //     bloodGroup: 'O-',
  //     viewBtn: 'View', 
  //     editBtn: 'Edit',
  //     deleteBtn: 'Delete'
  //   },
  //   {
  //     preferedName: 'Hiro', 
  //     fullName: 'Hiro Mataba', 
  //     image: '/assets/images/hiro.png', 
  //     alt: 'Hiro Mataba', 
  //     department: 'Dermatology', 
  //     age: '70',
  //     bloodGroup: 'B+',
  //     viewBtn: 'View', 
  //     editBtn: 'Edit',
  //     deleteBtn: 'Delete'
  //   },
  //   {
  //     preferedName: 'Christelle', 
  //     fullName: 'Christelle Pelaya', 
  //     image: '/assets/images/christelle.png', 
  //     alt: 'Christelle Pelaya', 
  //     department: 'Dermatology',
  //     age: '30',
  //     bloodGroup: 'A+',
  //     viewBtn: 'View', 
  //     editBtn: 'Edit',
  //     deleteBtn: 'Delete'
  //   },
  //   {
  //     preferedName: 'Herve', 
  //     fullName: 'Herve Mashukane', 
  //     image: '/assets/images/herve.png', 
  //     alt: 'Herve Mashukane', 
  //     department: 'Surgery', 
  //     age: '60',
  //     bloodGroup: 'B',
  //     viewBtn: 'View', 
  //     editBtn: 'Edit',
  //     deleteBtn: 'Delete'
  //   },
  //   {
  //     preferedName: 'Hiro', 
  //     fullName: 'Hiro Mataba', 
  //     image: '/assets/images/hiro.png', 
  //     alt: 'Hiro Mataba', 
  //     department: 'Oncology',
  //     age: '55',
  //     bloodGroup: 'O', 
  //     viewBtn: 'View', 
  //     editBtn: 'Edit',
  //     deleteBtn: 'Delete'
  //   },
  // ]

  // toggle patient form
  toggleForm() {
    this.isFormVisible = !this.isFormVisible;
  }

  // remove patient from list
  removePatient(id: number) {
    this.patientRecordsService.removePatient(id)
  }

  filtererPatients(patient: Patient) {

  }

  // filters variables
  selectedDepartment: string = 'All';
  searchPatient: string = '';

  // getter to filter patients by department and name
  get filteredPatients() {
    const allPatients = this.patientRecordsService.patientsSource.value;

    return allPatients.filter(p => 
      (this.selectedDepartment === 'All' || p.department === this.selectedDepartment) && 
      (this.searchPatient === '' || p.fullName.toLowerCase().includes(this.searchPatient.toLowerCase()))
    );
  }
}
