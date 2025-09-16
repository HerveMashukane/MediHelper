import { Component, OnInit } from '@angular/core';
import { CommonModule } from "@angular/common";
import { DoctorsFormComponent } from "./doctors-form/doctors-form.component";
import { Observable } from 'rxjs';
import { Doctor, MydoctorsService } from '../../services/mydoctors.service';

@Component({
  selector: 'app-mydoctors',
  standalone: true,
  imports: [CommonModule, DoctorsFormComponent],
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
}