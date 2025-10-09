import { Patient, PatientRecordsService } from './../../../services/patient-records.service';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-patients-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './patients-form.component.html',
  styleUrl: './patients-form.component.css'
})
export class PatientsFormComponent {
  id = 0;
  preferedName = '';
  image = '';
  fullName = '';
  email = '';
  phone = '';
  department = '';
  age = '';
  bloodGroup = '';

  constructor(private patientsRecordService: PatientRecordsService) {}

  // patients data submission
  onSubmit() {
    if(this.preferedName && this.fullName && this.email && this.phone && this.department && this.age && this.bloodGroup) {
      const newPatient: Patient = {
        id: this.id,
        preferedName: this.preferedName,
        image: this.image,
        fullName: this.fullName,
        email: this.email,
        phone: this.phone,
        department: this.department,
        age: this.age,
        bloodGroup: this.bloodGroup,
      }
      this.patientsRecordService.addPatient(newPatient);
    }
    this.preferedName = '';
    this.preferedName = '';
    this.image = '';
    this.fullName = '';
    this.email = '';
    this.phone = '';
    this.department = '';
    this.age = '';
    this.bloodGroup = '';
  }

  @Output() close = new EventEmitter<void>();
  // cancel patients form
  onCancel() {
    this.close.emit();
  }

  // Handle file patient selection
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
       this.image = reader.result as string; // base64 data
      };
      reader.readAsDataURL(file);
    }
  }
}
