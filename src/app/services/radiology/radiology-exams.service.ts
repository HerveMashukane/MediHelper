import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface RadiologyExam {
  id: string;
  patient: string
  examType: 'X-Ray' | 'MRI' | 'CT Scan' | 'Ultrasound';
  bodyPart: string;
  radiologist: string;
  date: string
  status: 'Pending' | 'In Review' | 'Completed' | 'Urgent';
  report?: string;
  imageUrl?: string;
}

@Injectable({
  providedIn: 'root'
})

export class RadiologyExamsService {

  // MOCK DATA (Temporary until backend)
  public radioExamsSource = new BehaviorSubject<RadiologyExam[]>([
  {
    id: 'RX-1001',
    patient: 'John Smith',
    examType: 'X-Ray',
    bodyPart: 'Chest',
    radiologist: 'Dr. Adams',
    date: '2026-04-08',
    status: 'Completed',
    report: 'No abnormalities detected. Lungs are clear.',
    imageUrl: 'https://example.com/xray1.jpg'
  },

  {
    id: 'RX-1002',
    patient: 'Maria Lopez',
    examType: 'MRI',
    bodyPart: 'Brain',
    radiologist: 'Dr. Evans',
    date: '2026-04-09',
    status: 'In Review',
    report: 'Possible minor lesion detected, further analysis required.'
  },

  {
    id: 'RX-1003',
    patient: 'David Brown',
    examType: 'CT Scan',
    bodyPart: 'Abdomen',
    radiologist: 'Dr. Wilson',
    date: '2026-04-10',
    status: 'Pending'
  },

  {
    id: 'RX-1004',
    patient: 'Sophia Johnson',
      examType: 'Ultrasound',
      bodyPart: 'Kidney',
      radiologist: 'Dr. Lee',
      date: '2026-04-10',
      status: 'Urgent',
      report: 'Hydronephrosis suspected. Immediate review required.'
    },

    {
      id: 'RX-1005',
      patient: 'Michael Tan',
      examType: 'X-Ray',
      bodyPart: 'Spine',
      radiologist: 'Dr. Adams',
      date: '2026-04-11',
      status: 'Completed',
      report: 'Mild scoliosis observed in thoracic region.'
    },

    {
      id: 'RX-1006',
      patient: 'Grace Mutesi',
      examType: 'CT Scan',
      bodyPart: 'Chest',
      radiologist: 'Dr. Evans',
      date: '2026-04-11',
      status: 'Pending'
    },

    {
      id: 'RX-1007',
      patient: 'Paul Mukendi',
      examType: 'MRI',
      bodyPart: 'Knee',
      radiologist: 'Dr. Wilson',
      date: '2026-04-12',
      status: 'In Review'
    },

    {
      id: 'RX-1008',
      patient: 'Linda Kabila',
      examType: 'Ultrasound',
      bodyPart: 'Abdomen',
      radiologist: 'Dr. Lee',
      date: '2026-04-12',
      status: 'Urgent',
      report: 'Appendicitis suspected. Surgical evaluation recommended.'
    }
  ]);
  radioExams$ = this.radioExamsSource.asObservable(); // radiology exams observable
  
  constructor() { }
}
