import { Component } from '@angular/core';
import { NgForOf } from "@angular/common";

@Component({
  selector: 'app-mydoctors',
  standalone: true,
  imports: [NgForOf],
  templateUrl: './mydoctors.component.html',
  styleUrl: './mydoctors.component.css'
})
export class MydoctorsComponent {
  doctors: any = [
    {
      preferedName: 'Dr. Christelle', 
      fullName: 'Dr. Christelle Pelaya', 
      image: '/assets/images/herve.png', 
      alt: 'Dr. Christelle Pelaya', 
      speciality: 'Generalist', 
      viewBtn: 'View', 
      contactBtn: 'Contact'
    },
    {
      preferedName: 'Dr. Herve', 
      fullName: 'Dr. Herve Mashukane', 
      image: '/assets/images/herve.png', 
      alt: 'Dr. Herve Mashukane', 
      speciality: 'Cardiologist', 
      viewBtn: 'View', 
      contactBtn: 'Contact'
    },
    {
      preferedName: 'Dr. Hiro', 
      fullName: 'Dr. Hiro Mataba', 
      image: '/assets/images/herve.png', 
      alt: 'Dr. Hiro Mataba', 
      speciality: 'Dermatologist', 
      viewBtn: 'View', 
      contactBtn: 'Contact'
    },
    {
      preferedName: 'Dr. Patricia', 
      fullName: 'Dr. Patricia Masiri', 
      image: '/assets/images/herve.png', 
      alt: 'Dr. Patricia Masiri', 
      speciality: 'Neurologist', 
      viewBtn: 'View', 
      contactBtn: 'Contact'
    },
    {
      preferedName: 'Dr. Herve', 
      fullName: 'Dr. Herve Mashukane', 
      image: '/assets/images/herve.png', 
      alt: 'Dr. Herve Mashukane', 
      speciality: 'Surgerist', 
      viewBtn: 'View', 
      contactBtn: 'Contact'
    },
    {
      preferedName: 'Dr. Hiro', 
      fullName: 'Dr. Hiro Mataba', 
      image: '/assets/images/herve.png', 
      alt: 'Dr. Hiro Mataba', 
      speciality: 'Oncologist', 
      viewBtn: 'View', 
      contactBtn: 'Contact'
    },
  ]
}