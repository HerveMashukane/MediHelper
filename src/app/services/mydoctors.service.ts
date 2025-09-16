import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Doctor {
  fullName: string;
  preferedName: string;
  speciality: string;
  image: string;
}

@Injectable({
  providedIn: 'root',
})
export class MydoctorsService {
  private doctorsSource = new BehaviorSubject<Doctor[]>(this.loadDoctorsFromLocalStorage());
  doctors$ = this.doctorsSource.asObservable();

  // save doctors to local storage
  private saveDoctorsToLocaltorage(doctors: Doctor[]) {
    localStorage.setItem('doctors', JSON.stringify(doctors));
  }

  // load doctors from local storage
  private loadDoctorsFromLocalStorage(): Doctor[] {
    const storedDoctors = localStorage.getItem('doctors');
    return storedDoctors ? JSON.parse(storedDoctors) : [];
  }

  addDoctor(doctor: Doctor) {
    const currentDoctor = this.doctorsSource.value;
    const updatedDoctor = [...currentDoctor, doctor]
    this.doctorsSource.next(updatedDoctor);
    this.saveDoctorsToLocaltorage(updatedDoctor);
  }
}