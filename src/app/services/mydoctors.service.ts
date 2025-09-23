import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

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
  providedIn: 'root',
})
export class MydoctorsService {
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
    const updatedDoctors = [...currentDoctors, doctor];
    this.doctorsSource.next(updatedDoctors);
    this.saveDoctorsToLocalStorage(updatedDoctors);
  }

  // remove doctors
  removeDoctor(doctorId: number) {
    const currentDoctors = this.doctorsSource.value;
    const index = currentDoctors.findIndex(d => d.id === doctorId)

    if(index !== -1 && confirm('Are you sure?')) {
      const updatedDoctors = [...currentDoctors];
      updatedDoctors.splice(index, 1)
      this.doctorsSource.next(updatedDoctors)
      this.saveDoctorsToLocalStorage(updatedDoctors);
    };
  }
}