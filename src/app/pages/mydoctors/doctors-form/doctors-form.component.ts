import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'
import { MydoctorsService, Doctor } from '../../../services/mydoctors.service';

@Component({
  selector: 'app-doctors-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './doctors-form.component.html',
  styleUrl: './doctors-form.component.css'
})
export class DoctorsFormComponent {
  fullName = '';
  preferedName = '';
  speciality = '';
  image = '';

  constructor(private doctorService: MydoctorsService) {}

  onSubmit() {
    if(this.fullName && this.preferedName && this.speciality && this.image) {
      const newDoctor: Doctor = {
        id: Date.now(),
        fullName: this.fullName,
        preferedName: this.preferedName,
        speciality: this.speciality,
        image: this.image,
      };
      this.doctorService.addDoctor(newDoctor);

      this.fullName = '';
      this.preferedName = '';
      this.speciality = '';
      this.image = ''
    }
  }
}
