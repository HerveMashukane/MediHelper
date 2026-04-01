import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

// medication form schema
export interface Medication {
  id: string
  name: string
  dosage: string
  schedule: string
  doctor: string
  startDate: string
  endDate: string
  status: 'Active' | 'Inactive' | 'Pending' | 'Completed'
  progress: number
  notes?: string
}

@Injectable({
  providedIn: 'root'
})
export class MedicationService {
  // medications observable list
  private medicationsSource = new BehaviorSubject<Medication[]>([]);
  medications$ = this.medicationsSource.asObservable();

  constructor() { }

  addMedication(medication: Medication){
    const currentMedications = this.medicationsSource.value;
    const updatedMedications = [...currentMedications, medication];
    this.medicationsSource.next(updatedMedications);
  }
}
