import { Injectable } from '@angular/core';

export interface Appointment {
  patientName:string;
  doctorName:string;
  date:string;
  time:string;
  status:string;
  type: string;
  message?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor() { }
}
