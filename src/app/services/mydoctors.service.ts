import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Doctor {
  id: number,
  fullName: string,
  preferedName: string,
  speciality: string,
  image: string,
}
@Injectable({
  providedIn: 'root'
})

export class MydoctorsService {
  private doctorSource = new BehaviorSubject<Doctor[]>([]);
  doctors$ = this.doctorSource.asObservable();

  addDoctor(doctor: Doctor) {
    const currentDoctor = this.doctorSource.value;
    this.doctorSource.next([...currentDoctor, doctor]);
  }

}
