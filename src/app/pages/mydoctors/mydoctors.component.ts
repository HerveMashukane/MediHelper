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
      preferedName: 'Dr. Herve', 
      fullName: 'Dr. Herve Mashukane', 
      image: '/assets/images/herve.png', 
      alt: 'Dr. Herve Mashukane', 
      speaciality: 'Generalist', 
      viewBtn: 'View', 
      contactBtn: 'Contact'
    },
    {
      preferedName: 'Dr. Herve', 
      fullName: 'Dr. Herve Mashukane', 
      image: '/assets/images/herve.png', 
      alt: 'Dr. Herve Mashukane', 
      speaciality: 'Cardiologist', 
      viewBtn: 'View', 
      contactBtn: 'Contact'
    },
    {
      preferedName: 'Dr. Herve', 
      fullName: 'Dr. Herve Mashukane', 
      image: '/assets/images/herve.png', 
      alt: 'Dr. Herve Mashukane', 
      speaciality: 'Dermatologist', 
      viewBtn: 'View', 
      contactBtn: 'Contact'
    },
    {
      preferedName: 'Dr. Herve', 
      fullName: 'Dr. Herve Mashukane', 
      image: '/assets/images/herve.png', 
      alt: 'Dr. Herve Mashukane', 
      speaciality: 'Neurologist', 
      viewBtn: 'View', 
      contactBtn: 'Contact'
    },
    {
      preferedName: 'Dr. Herve', 
      fullName: 'Dr. Herve Mashukane', 
      image: '/assets/images/herve.png', 
      alt: 'Dr. Herve Mashukane', 
      speaciality: 'Surgerist', 
      viewBtn: 'View', 
      contactBtn: 'Contact'
    },
    {
      preferedName: 'Dr. Herve', 
      fullName: 'Dr. Herve Mashukane', 
      image: '/assets/images/herve.png', 
      alt: 'Dr. Herve Mashukane', 
      speaciality: 'Oncologist', 
      viewBtn: 'View', 
      contactBtn: 'Contact'
    },
  ]
}