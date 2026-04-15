import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface LaboTest{
  id: number;
  patientName: string;
  testType: string;
  technologistName: string;
  date: string;
  status: string;
}
@Injectable({
  providedIn: 'root'
})
export class LaboratoryService {
  public laboTestSource = new BehaviorSubject<LaboTest[]>([
  {
    id: 1,
    patientName: 'John Smith',
    testType: 'Blood Test',
    technologistName: 'Dr. Carter',
    date: '2026-04-09',
    status: 'Completed',
  },
  {
    id: 2,
    patientName: 'Maria Lopez',
    testType: 'Urine Test',
    technologistName: 'Dr. Evans',
    date: '2026-04-10',
    status: 'Pending',
  },
  {
    id: 3,
    patientName: 'David Brown',
    testType: 'Whole Body Test',
    technologistName: 'Dr. Wilson',
    date: '2026-04-11',
    status: 'Active',
  },
  {
    id: 4,
    patientName: 'Sophia Johnson',
    testType: 'Blood Test',
    technologistName: 'Dr. Lee',
    date: '2026-04-12',
    status: 'Canceled',
  },
  {
    id: 5,
    patientName: 'Paul Mukendi',
    testType: 'Urine Test',
    technologistName: 'Dr. Carter',
    date: '2026-04-13',
    status: 'Completed',
  },
  {
    id: 6,
    patientName: 'John Smith',
    testType: 'Blood Test',
    technologistName: 'Dr. Carter',
    date: '2026-04-09',
    status: 'Completed',
  },
  {
    id: 7,
    patientName: 'Maria Lopez',
    testType: 'Urine Test',
    technologistName: 'Dr. Evans',
    date: '2026-04-10',
    status: 'Pending',
  },
]);
  tests$ = this.laboTestSource.asObservable();

  constructor() { }


  addLaboTest(test: LaboTest) {
    const currentTests = this.laboTestSource.value;
    const updatedTests = [...currentTests, test];
    this.laboTestSource.next(updatedTests);
  }
}
