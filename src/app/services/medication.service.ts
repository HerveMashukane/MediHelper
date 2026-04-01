import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

// medication form schema
export interface Medication {
  id: number;
  medName: string;
  doctorName: string;
  dosage: string;
  dosageUnit: string;
  schedule: string
  startDate: string
  endDate: string
  status: 'Active' | 'Inactive' | 'Pending' | 'Completed'
  // progress: number
  notes?: string
}

@Injectable({
  providedIn: 'root'
})
export class MedicationService {
  // medications observable list
  public medicationsSource = new BehaviorSubject<Medication[]>([]);
  medications$ = this.medicationsSource.asObservable();

  constructor() { }

  addMedication(medication: Medication){
    const currentMedications = this.medicationsSource.value;
    const updatedMedications = [...currentMedications, medication];
    this.medicationsSource.next(updatedMedications);
  }
}
