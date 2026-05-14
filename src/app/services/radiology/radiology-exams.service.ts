import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface RadiologyExam {
  id: number;
  patientName: string;
  examType: string;
  bodyPart: string;
  radiologist: string;
  date: string
  status: string;
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
    id: 1,
    patientName: 'John Smith',
    examType: 'X-Ray',
    bodyPart: 'Chest',
    radiologist: 'Dr. Adams',
    date: '2026-04-08',
    status: 'Completed',
    report: 'No abnormalities detected. Lungs are clear.',
    imageUrl: 'https://example.com/xray1.jpg'
  },

  {
    id: 2,
    patientName: 'Maria Lopez',
    examType: 'MRI',
    bodyPart: 'Brain',
    radiologist: 'Dr. Evans',
    date: '2026-04-09',
    status: 'In Review',
    report: 'Possible minor lesion detected, further analysis required.'
  },

  {
    id: 3,
    patientName: 'David Brown',
    examType: 'CT Scan',
    bodyPart: 'Abdomen',
    radiologist: 'Dr. Wilson',
    date: '2026-04-10',
    status: 'Pending'
  },

  {
    id: 4,
    patientName: 'Sophia Johnson',
      examType: 'Ultrasound',
      bodyPart: 'Kidney',
      radiologist: 'Dr. Lee',
      date: '2026-04-10',
      status: 'Urgent',
      report: 'Hydronephrosis suspected. Immediate review required.'
    },

    {
      id: 5,
      patientName: 'Michael Tan',
      examType: 'X-Ray',
      bodyPart: 'Spine',
      radiologist: 'Dr. Adams',
      date: '2026-04-11',
      status: 'Completed',
      report: 'Mild scoliosis observed in thoracic region.'
    },

    {
      id: 6,
      patientName: 'Grace Mutesi',
      examType: 'CT Scan',
      bodyPart: 'Chest',
      radiologist: 'Dr. Evans',
      date: '2026-04-11',
      status: 'Pending'
    },

    {
      id: 7,
      patientName: 'Paul Mukendi',
      examType: 'MRI',
      bodyPart: 'Knee',
      radiologist: 'Dr. Wilson',
      date: '2026-04-12',
      status: 'In Review'
    },

    {
      id: 8,
      patientName: 'Linda Kabila',
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

  // add new radiology exam
  addRadioExam(radioExam: RadiologyExam) {
    const currentRadioExams = this.radioExamsSource.value;
    const updatedRadioExams = [...currentRadioExams, radioExam];
    this.radioExamsSource.next(updatedRadioExams);
  }

  // UPDATE RADIOLOGY EXAM
  updateRadioExam(updatedExam: RadiologyExam) {
    const currentRadioExams = this.radioExamsSource.value;
    const index = currentRadioExams.findIndex(exam => exam.id === updatedExam.id);
    if(index !== 0) {
      const updatedRadioExams = [...currentRadioExams];
      updatedRadioExams[index] = updatedExam;

      this.radioExamsSource.next(updatedRadioExams);
    }
  }

  // REMOVE RADIO EXAM
  removeRadioExam(removedExam: number) {
    const currentRadioExams = this.radioExamsSource.value;
    const index = currentRadioExams.findIndex(exam => exam.id === removedExam);

    if(index !== -1) {
      const updatedRadioExams = [...currentRadioExams];
      updatedRadioExams.splice(index, 1);

      this.radioExamsSource.next(updatedRadioExams);
    }
  }
}
