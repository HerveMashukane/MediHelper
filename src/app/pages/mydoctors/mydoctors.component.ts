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
  // ngOnInit(): void {
  //   this.doctorsService.doctors$.subscribe
  // }
  // doctors: any = [
  //   {
  //     preferedName: 'Dr. Christelle', 
  //     fullName: 'Dr. Christelle Pelaya', 
  //     image: '/assets/images/herve.png', 
  //     alt: 'Dr. Christelle Pelaya', 
  //     speciality: 'Generalist', 
  //     viewBtn: 'View', 
  //     contactBtn: 'Contact'
  //   },
  //   {
  //     preferedName: 'Dr. Herve', 
  //     fullName: 'Dr. Herve Mashukane', 
  //     image: '/assets/images/herve.png', 
  //     alt: 'Dr. Herve Mashukane', 
  //     speciality: 'Cardiologist', 
  //     viewBtn: 'View', 
  //     contactBtn: 'Contact'
  //   },
  //   {
  //     preferedName: 'Dr. Hiro', 
  //     fullName: 'Dr. Hiro Mataba', 
  //     image: '/assets/images/herve.png', 
  //     alt: 'Dr. Hiro Mataba', 
  //     speciality: 'Dermatologist', 
  //     viewBtn: 'View', 
  //     contactBtn: 'Contact'
  //   },
  //   {
  //     preferedName: 'Dr. Christelle', 
  //     fullName: 'Dr. Christelle Pelaya', 
  //     image: '/assets/images/herve.png', 
  //     alt: 'Dr. Christelle Pelaya', 
  //     speciality: 'Neurologist', 
  //     viewBtn: 'View', 
  //     contactBtn: 'Contact'
  //   },
  //   {
  //     preferedName: 'Dr. Herve', 
  //     fullName: 'Dr. Herve Mashukane', 
  //     image: '/assets/images/herve.png', 
  //     alt: 'Dr. Herve Mashukane', 
  //     speciality: 'Surgerist', 
  //     viewBtn: 'View', 
  //     contactBtn: 'Contact'
  //   },
  //   {
  //     preferedName: 'Dr. Hiro', 
  //     fullName: 'Dr. Hiro Mataba', 
  //     image: '/assets/images/herve.png', 
  //     alt: 'Dr. Hiro Mataba', 
  //     speciality: 'Oncologist', 
  //     viewBtn: 'View', 
  //     contactBtn: 'Contact'
  //   },
  // ]
}