import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';



// medication form schema
export interface Medication {
  id: number;
  medName: string;
  doctorName: string;
  dosage: string;
  dosageUnit: string;
  schedule: string;
  startDate: string;
  endDate: string;
  status: 'Active' | 'Inactive' | 'Pending' | 'Completed';
  progress: number;
  notes?: string;
}

@Injectable({
  providedIn: 'root'
})
export class MedicationService {

  // medications observable list
  public medicationsSource = new BehaviorSubject<Medication[]>([
    // {
    //   id: 1,
    //   medName: 'Amoxicillin',
    //   doctorName: 'Dr. Carter',
    //   dosage: '500',
    //   dosageUnit: 'mg',
    //   schedule: 'Twice daily',
    //   startDate: '2026-04-01',
    //   endDate: '2026-04-10',
    //   status: 'Completed',
    //   progress: 40,
    //   notes: 'Take after meals'
    // },
    // {
    //   id: 2,
    //   medName: 'Ibuprofen',
    //   doctorName: 'Dr. Smith',
    //   dosage: '200',
    //   dosageUnit: 'mg',
    //   schedule: 'Every 8h',
    //   startDate: '2026-03-25',
    //   endDate: '2026-04-25',
    //   status: 'Active',
    //   progress: 100
    // },
    // {
    //   id: 3,
    //   medName: 'Metformin',
    //   doctorName: 'Dr. Lee',
    //   dosage: '850',
    //   dosageUnit: 'mg',
    //   schedule: 'Daily',
    //   startDate: '2026-04-03',
    //   endDate: '2026-05-03',
    //   status: 'Pending',
    //   progress: 10
    // },
    // {
    //   id: 4,
    //   medName: 'Amoxicillin',
    //   doctorName: 'Dr. Carter',
    //   dosage: '500',
    //   dosageUnit: 'mg',
    //   schedule: 'Twice daily',
    //   startDate: '2026-02-01',
    //   endDate: '2026-04-20',
    //   status: 'Inactive',
    //   progress: 40,
    //   notes: 'Take after meals'
    // },
    // {
    //   id: 5,
    //   medName: 'Ibuprofen',
    //   doctorName: 'Dr. Smith',
    //   dosage: '200',
    //   dosageUnit: 'mg',
    //   schedule: 'Every 8h',
    //   startDate: '2026-03-25',
    //   endDate: '2026-06-25',
    //   status: 'Active',
    //   progress: 100
    // },
    // {
    //   id: 6,
    //   medName: 'Metformin',
    //   doctorName: 'Dr. Lee',
    //   dosage: '850',
    //   dosageUnit: 'mg',
    //   schedule: 'Daily',
    //   startDate: '2026-04-03',
    //   endDate: '2026-05-03',
    //   status: 'Pending',
    //   progress: 10
    // },
    // {
    //   id: 7,
    //   medName: 'Amoxicillin',
    //   doctorName: 'Dr. Carter',
    //   dosage: '500',
    //   dosageUnit: 'mg',
    //   schedule: 'Twice daily',
    //   startDate: '2026-04-01',
    //   endDate: '2026-04-10',
    //   status: 'Completed',
    //   progress: 40,
    //   notes: 'Take after meals'
    // },
    // {
    //   id: 8,
    //   medName: 'Ibuprofen',
    //   doctorName: 'Dr. Smith',
    //   dosage: '200',
    //   dosageUnit: 'mg',
    //   schedule: 'Every 8h',
    //   startDate: '2026-03-25',
    //   endDate: '2026-04-25',
    //   status: 'Active',
    //   progress: 100
    // },
    // {
    //   id: 9,
    //   medName: 'Metformin',
    //   doctorName: 'Dr. Lee',
    //   dosage: '850',
    //   dosageUnit: 'mg',
    //   schedule: 'Daily',
    //   startDate: '2026-04-03',
    //   endDate: '2026-05-03',
    //   status: 'Pending',
    //   progress: 10
    // },
    // {
    //   id: 10,
    //   medName: 'Amoxicillin',
    //   doctorName: 'Dr. Carter',
    //   dosage: '500',
    //   dosageUnit: 'mg',
    //   schedule: 'Twice daily',
    //   startDate: '2026-02-01',
    //   endDate: '2026-04-20',
    //   status: 'Inactive',
    //   progress: 40,
    //   notes: 'Take after meals'
    // }
  ]);
  medications$ = this.medicationsSource.asObservable();
  // reactive stats of medications
  medicationStats$ = this.medications$.pipe(
    map((medications) => {
      const stats = {
        Active: 0,
        Inactive: 0,
        Completed: 0,
        Pending: 0,
        Total: 0,
      }
      for(let med of medications) {
        if(stats[med.status as keyof typeof stats] !== undefined) {
          stats[med.status as keyof typeof stats]++;
          stats.Total++;
        }
      }
      return stats;
    })
  )

  constructor() { }

  addMedication(medication: Medication){
    const currentMedications = this.medicationsSource.value;
    const updatedMedications = [...currentMedications, medication];
    this.medicationsSource.next(updatedMedications);
  }
}
