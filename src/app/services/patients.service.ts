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
export class PatientsService {

  // observable list of patients
  public patientsSource = new BehaviorSubject<Patient[]>(this.loadPatientsFromLocalStorage());
  patients$ = this.patientsSource.asObservable();

  private formVisibleSubject = new BehaviorSubject<Patient[]>([]);
  isFormVisible$ = this.formVisibleSubject.asObservable();

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
  removePatient(patientId: number) {
    const currentPatients = this.patientsSource.value;

    const index = currentPatients.findIndex(p => p.id === patientId);

    if(index !== -1) {
      const updatedPatients = [...currentPatients];
      updatedPatients.splice(index, 1);
      this.patientsSource.next(updatedPatients);
      this.savePatientsToLocalStorage(updatedPatients);
    }
  }
}
