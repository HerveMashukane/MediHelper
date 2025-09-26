import { Patient } from './../../../services/patient-records.service';
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
  department= '';
  age = '';
  bloodGroup = '';

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
    }
  }

  @Output() close = new EventEmitter<void>();
  // cancel patients form
  onCancel() {
    this.close.emit();
  }
}
