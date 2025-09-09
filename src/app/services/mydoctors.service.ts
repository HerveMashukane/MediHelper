import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Doctor {
  fullName: string,
  preferedName: string,
  image: string,
  speciality: string,
}
@Injectable({
  providedIn: 'root'
})

export class MydoctorsService {
  private doctorsSource = new BehaviorSubject<Doctor[]>([]);
  doctors$ = this.doctorsSource.asObservable();

  addDoctor(doctor: Doctor) {
    const currentDoctor = this.doctorsSource.value;
    this.doctorsSource.next([...currentDoctor, doctor]);
  }
}
