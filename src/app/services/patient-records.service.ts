import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

// patients interface
export interface Patient {
  id: number;
  preferedName: string;
  image: string;
  fullName: string;
  email: string;
  phone: string;
  department: string;
  age: string;
  bloodGroup: string;
}

@Injectable({
  providedIn: 'root'
})
export class PatientRecordsService {

  private patientsSource = new BehaviorSubject<Patient[]>([]);
  patients$ = this.patientsSource.asObservable();

  // add new patient
  addPatient(patient: Patient) {
    const currentPatients = this.patientsSource.value;
    const updatedPatients = [...currentPatients, patient];
    this.patientsSource.next(updatedPatients);
  }
}
