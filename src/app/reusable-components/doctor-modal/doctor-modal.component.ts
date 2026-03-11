import { Component } from '@angular/core';

export interface Doctor {
  id:number;
  name:string;
  specialty:string;
  workingDays:string[];
  startTime:string;
  endTime:string;
  slotDuration:number;
}
@Component({
  selector: 'app-doctor-modal',
  standalone: true,
  imports: [],
  templateUrl: './doctor-modal.component.html',
  styleUrl: './doctor-modal.component.css'
})
export class DoctorModalComponent {

}
