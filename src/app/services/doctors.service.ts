import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

// doctors interface
export interface Doctor {
  id: number;
  image: string;
  fullName: string;
  preferedName: string;
  email: string;
  phone: string;
  speciality: string;
  hospital: string;
}

@Injectable({
  providedIn: 'root'
})
export class DoctorsService {
  public doctorsSource = new BehaviorSubject<Doctor[]>(this.loadDoctorsFromLocalStorage());
  doctors$ = this.doctorsSource.asObservable();

  // save doctors to local storage
  private saveDoctorsToLocalStorage(doctors: Doctor[]) {
    localStorage.setItem('doctors', JSON.stringify(doctors));
  }

  // load doctors from local storage
  private loadDoctorsFromLocalStorage(): Doctor[] {
    const storedDoctors = localStorage.getItem('doctors');
    return storedDoctors ? JSON.parse(storedDoctors) : [];
  }
  // add new doctor, update list and save to LS
  addDoctor(doctor: Doctor) {
    const currentDoctors = this.doctorsSource.value;
    // assign id to doctor
    if(!doctor.id) {
      doctor.id = Date.now();
    }
    const updatedDoctors = [...currentDoctors, doctor];
    this.doctorsSource.next(updatedDoctors);
    this.saveDoctorsToLocalStorage(updatedDoctors);
  }

  // remove doctors
  removeDoctor(doctorId: number) {
    const currentDoctors = this.doctorsSource.value;
    const index = currentDoctors.findIndex(d => d.id === doctorId);

    if(index !== -1) {
      const updatedDoctors = [...currentDoctors];
      updatedDoctors.splice(index, 1)
      this.doctorsSource.next(updatedDoctors);
      this.saveDoctorsToLocalStorage(updatedDoctors);
    }
  }
}
