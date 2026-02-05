import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'
import { Doctor, MydoctorsService } from '../../../services/mydoctors.service';
import { EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-doctors-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './doctors-form.component.html',
  styleUrl: './doctors-form.component.css',
})
export class DoctorsFormComponent {
  id = 0;
  image: string | null = null;
  fullName = '';
  preferedName = '';
  email = '';
  phone = '';
  speciality = '';
  hospital = '';

  // cancel form
  @Output() cancel = new EventEmitter<void>();

  constructor(private doctorsService: MydoctorsService) {}

  onSubmit() {
    if (
        this.fullName && this.preferedName && this.email && this.phone && this.speciality && this.hospital && this.image) {
      const newDoctor: Doctor = {
        id: this.id,
        image: this.image,
        fullName: this.fullName,
        preferedName: this.preferedName,
        email: this.email,
        phone: this.phone,
        speciality: this.speciality,
        hospital: this.hospital,
      };
      this.doctorsService.addDoctor(newDoctor);
      this.cancel.emit();
      // Reset form
      this.image = null;
      this.fullName = '';
      this.preferedName = '';
      this.email = '';
      this.phone = '';
      this.speciality = '';
      this.hospital = '';
    }
  }
  // Handle file doctor selection
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

  // cancel form
  onCancel() {
    this.cancel.emit();
  }

}
