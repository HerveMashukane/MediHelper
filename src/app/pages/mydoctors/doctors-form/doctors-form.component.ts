import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'
import { Doctor, MydoctorsService } from '../../../services/mydoctors.service';

@Component({
  selector: 'app-doctors-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './doctors-form.component.html',
  styleUrl: './doctors-form.component.css',
})
export class DoctorsFormComponent {
  fullName = '';
  preferedName = '';
  speciality = '';
  image: string | null = null;

  constructor(private doctorsService: MydoctorsService) {}

  onSubmit() {
    if (this.fullName && this.preferedName && this.speciality && this.image) {
      const newDoctor: Doctor = {
        fullName: this.fullName,
        preferedName: this.preferedName,
        speciality: this.speciality,
        image: this.image,
      };
      this.doctorsService.addDoctor(newDoctor);
      // Reset form
      this.fullName = '';
      this.preferedName = '';
      this.speciality = '';
      this.image = null;
    }
  }
  // Handle file selection
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
