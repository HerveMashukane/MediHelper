import { Component, EventEmitter, Output } from '@angular/core';
import { RadiologyExam, RadiologyExamsService } from '../../../services/radiology/radiology-exams.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-radiology-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './radiology-form.component.html',
  styleUrl: './radiology-form.component.css'
})
export class RadiologyFormComponent {

  constructor(private radiologyExamsService: RadiologyExamsService){}

  form = {
    patientName: "",
    examType: "",
    bodyPart: "",
    radiologist: "",
    date: "",
    status: "",
  }

  // close form
  @Output() cancel = new EventEmitter<void>();
  closeForm() {
    this.cancel.emit();
  }

  // add new exam
  addRadioExam() {
    if(
      this.form.patientName &&
      this.form.examType &&
      this.form.bodyPart &&
      this.form.radiologist &&
      this.form.date &&
      this.form.date
    ) {
      const newExam = {
        id: Date.now(),
        patientName: this.form.patientName,
        examType: this.form.examType,
        bodyPart: this.form.bodyPart,
        radiologist: this.form.radiologist,
        date: this.form.date,
        status: this.form.status,
      }
      this.radiologyExamsService.addRadioExam(newExam);
      this.resetFrom();
      this.closeForm();
    }
  }

  // reset form
  resetFrom() {
    this.form = {
      patientName: "",
      examType: "",
      bodyPart: "",
      radiologist: "",
      date: "",
      status: "",
    }
  }
}
