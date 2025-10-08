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

  // observable list of patients
  private patientsSource = new BehaviorSubject<Patient[]>(this.loadPatientsFromLocalStorage());
  patients$ = this.patientsSource.asObservable();

  // save patients to local storage
  private savePatientsToLocalStorage(patients: Patient[]) {
    localStorage.setItem('patients', JSON.stringify(patients));
  }

  // load patients from local storage
  private loadPatientsFromLocalStorage() {
    const storedPatients = localStorage.getItem('patients');
    return storedPatients ? JSON.parse(storedPatients) : [];
  }

  // add new patient
  addPatient(patient: Patient) {
    const currentPatients = this.patientsSource.value;

    // assign id to patient
    if(!patient.id) {
      patient.id = Date.now();
    }
    
    const updatedPatients = [...currentPatients, patient]; // immutable patients list
    this.patientsSource.next(updatedPatients); // update observable list of patients
    this.savePatientsToLocalStorage(updatedPatients); //save patients to local storage
  }

  // remove patient
  removePatient() {

  }
}
