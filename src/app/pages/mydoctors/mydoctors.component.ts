import { Component } from '@angular/core';
import { CommonModule } from "@angular/common";
import { DoctorsFormComponent } from "./doctors-form/doctors-form.component";
import { Observable } from 'rxjs';
import { Doctor, MydoctorsService } from '../../services/mydoctors.service';
import { ModalComponent } from "../../shared/modal/modal.component";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-mydoctors',
  standalone: true,
  imports: [CommonModule, FormsModule, DoctorsFormComponent, ModalComponent],
  templateUrl: './mydoctors.component.html',
  styleUrl: './mydoctors.component.css',
})
export class MydoctorsComponent {
  doctors$: Observable<Doctor[]>;

  constructor(private doctorsService: MydoctorsService) {
    this.doctors$ = this.doctorsService.doctors$;
  }

  // toggle form
  isFormVisible: boolean = false;
  toggleForm() {
    this.isFormVisible = !this.isFormVisible;
  }

  // view doctor's details
  selectedDoctor: Doctor | null = null;
  isModelOpen: boolean = false;

  viewDoctor(doctor: Doctor) {
    this.selectedDoctor = doctor;
    this.isModelOpen = true;
  }

  // close details
  closeModel() {
    this.selectedDoctor = null;
    this.isModelOpen = false;
  }

  // filter doctors
  selectedSpeciality: string = 'All';
  searchDoctor: string = '';

  get filteredDoctors() {
    const allDoctors = this.doctorsService.doctorsSource.value;
    return allDoctors.filter(d =>
    (this.selectedSpeciality === 'All' || d.speciality === this.selectedSpeciality) &&
    (this.searchDoctor === '' || d.fullName.toLowerCase().includes(this.searchDoctor.toLowerCase()))
    );
  }
}