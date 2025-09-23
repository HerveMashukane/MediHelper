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
  private doctors: Doctor[] = [];
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
    const currentDoctor = this.doctorsSource.value;
    const updatedDoctor = [...currentDoctor, doctor];
    this.doctorsSource.next(updatedDoctor);
    this.saveDoctorsToLocalStorage(updatedDoctor);
  }
}