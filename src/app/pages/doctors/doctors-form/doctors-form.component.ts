import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Doctor, DoctorsService } from '../../../services/doctors/doctors.service';
import { EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-doctors-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './doctors-form.component.html',
  styleUrl: './doctors-form.component.css',
})
export class DoctorsFormComponent {

  // copy existing data and display them in the form when editing
  ngOnInit() {
    if (this.doctor) {
      this.formData = { ...this.doctor };
    }
  }

  // gather form data
  formData = {
    id: 0,
    image: "",
    fullName: "",
    preferedName: "",
    email: "",
    phone: "",
    speciality: "",
    hospital: "",
  }

  // cancel form
  @Output() cancel = new EventEmitter<void>();

  constructor(private doctorsService: DoctorsService) {}

  onSubmit() {
    // EDIT MODE (has id means already exists)
    if (this.formData.id) {

      // No strict validation required here
      // Even if user changes nothing, we allow save
      this.doctorsService.updateDoctor(this.formData);

    } else {

      // CREATE MODE (create new doctor must validate first)
      if (
        this.formData.preferedName && 
        this.formData.fullName && 
        this.formData.email && 
        this.formData.phone && 
        this.formData.speciality && 
        this.formData.hospital
      ) {

        const newDoctor: Doctor = {
          ...this.formData,
          id: Date.now()    // ensure ID is generated
        };

        this.doctorsService.addDoctor(newDoctor);

      } else {
        // Optional but important UX feedback
        alert('Please fill all required fields');
        return; // stop execution
      }
    }

    this.cancel.emit(); // close form after success
  }
  // Handle file doctor selection
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
       this.formData.image = reader.result as string; // base64 data
      };
      reader.readAsDataURL(file);
    }
  }

  @Input() doctor: Doctor | null = null;
  // cancel form
  onCancel() {
    this.cancel.emit();
  }

}
