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
    testType: 'BloodTest',
    technologistName: 'Dr. Carter',
    date: '2026-04-09',
    status: 'Completed',
  },
  {
    id: 2,
    patientName: 'Maria Lopez',
    testType: 'UrineTest',
    technologistName: 'Dr. Evans',
    date: '2026-04-10',
    status: 'Pending',
  },
  {
    id: 3,
    patientName: 'David Brown',
    testType: 'BodyTest',
    technologistName: 'Dr. Wilson',
    date: '2026-04-11',
    status: 'Active',
  },
  {
    id: 4,
    patientName: 'Sophia Johnson',
    testType: 'BloodTest',
    technologistName: 'Dr. Lee',
    date: '2026-04-12',
    status: 'Critical',
  },
  {
    id: 5,
    patientName: 'Paul Mukendi',
    testType: 'UrineTest',
    technologistName: 'Dr. Carter',
    date: '2026-04-13',
    status: 'Completed',
  },
  {
    id: 6,
    patientName: 'John Smith',
    testType: 'BloodTest',
    technologistName: 'Dr. Carter',
    date: '2026-04-09',
    status: 'Completed',
  },
  {
    id: 7,
    patientName: 'Maria Lopez',
    testType: 'UrineTest',
    technologistName: 'Dr. Evans',
    date: '2026-04-10',
    status: 'Pending',
  },
]);
  laboTests$ = this.laboTestSource.asObservable();

  constructor() { }


  // ADD NEW LABO TEST
  addLaboTest(test: LaboTest) {
    const currentLabTests = this.laboTestSource.value;
    const updatedLabTests = [...currentLabTests, test];
    this.laboTestSource.next(updatedLabTests);
  }

  // UPDATE LABO TESTS
  updateLabTests(updatedTest: LaboTest) {
    const currentLabTests = this.laboTestSource.value;

    const index = currentLabTests.findIndex(labTest => labTest.id === updatedTest.id);

    if(index !== -1) {
      const updatedLabTests = [...currentLabTests];
      updatedLabTests[index] = updatedTest;

      this.laboTestSource.next(updatedLabTests);
    }
  }

  // REMOVE RADIOLOGY TEST
  removeRadioTest(removedLabTest: number) {
    const currentLabTests = this.laboTestSource.value;
    const index = currentLabTests.findIndex(labTest => labTest.id === removedLabTest);

    if(index !== -1) {
      const updatedLabTests = [...currentLabTests];
      updatedLabTests.splice(index, 1);
      this.laboTestSource.next(updatedLabTests);
    }
  }
}
