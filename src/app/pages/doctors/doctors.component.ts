import { Component } from '@angular/core';
import { CommonModule } from "@angular/common";
import { DoctorsFormComponent } from './doctors-form/doctors-form.component';
import { Observable } from 'rxjs';
import { Doctor, DoctorsService } from '../../services/doctors/doctors.service';
import { FormsModule } from '@angular/forms';
import { ConfirmDialogService } from '../../confirm-dialog.service';
import { CardModalComponent } from '../../reusable-components/card-modal/card-modal.component';

@Component({
  selector: 'app-doctors',
  standalone: true,
  imports: [CommonModule, FormsModule, DoctorsFormComponent, CardModalComponent],
  templateUrl: './doctors.component.html',
  styleUrl: './doctors.component.css'
})
export class DoctorsComponent {
  doctors$: Observable<Doctor[]>;
  doctorStats: Observable<{
    Generalist: number,
    Cardiologist: number,
    Dermatologist: number,
    Neurologist: number,
    Surgeon: number,
    Oncologist: number,
    Total: number,
  }>;

  constructor(
    private doctorsService: DoctorsService,
    private confirm: ConfirmDialogService,
  ) {
    this.doctors$ = this.doctorsService.doctors$;
    this.doctorStats = this.doctorsService.doctorStats$
  }

  // toggle form
  isFormVisible: boolean = false;
  toggleForm() {
    this.isFormVisible = !this.isFormVisible;
  }

  // view doctor's details
  selectedDoctor: Doctor | null = null;
  isModalOpen: boolean = false;

  viewDoctor(doctor: Doctor) {
    this.selectedDoctor = doctor;
    this.isModalOpen = true;
  }

  // close details
  closeModel() {
    this.selectedDoctor = null;
    this.isModalOpen = false;
  }

  // filter doctors
  selectedSpeciality: string = 'All';
  searchDoctor: string = '';

  get filteredDoctors() {
    const allDoctors = this.doctorsService.doctorsSource.value;
    return allDoctors.filter(d =>
    (this.selectedSpeciality === 'All' || d.speciality.toLowerCase() === this.selectedSpeciality.toLowerCase()) &&
    (this.searchDoctor === '' || d.fullName.toLowerCase().includes(this.searchDoctor.toLowerCase()))
    );
  }

  // remove dotors
  async removeDoctor(id: number, fullName: string) {
    const ok = await this.confirm.request({
      title: 'Delete Doctor',
      message: 'Are you sure you want to delete the',
      hightlight: `Dr. ${fullName}`,
      confirmText: 'Yes, delete',
      cancelText: 'Cancel',
    })
    if(!ok) return;
    this.doctorsService.removeDoctor(id);
  }
}
