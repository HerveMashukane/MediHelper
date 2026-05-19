import { Component, EventEmitter, Input, Output } from '@angular/core';
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

  formData = {
    id: 0,
    patientName: "",
    examType: "",
    bodyPart: "",
    radiologist: "",
    date: "",
    status: "",
  }

  // CLOSE FORM
  @Output() cancel = new EventEmitter<void>();
  closeForm() {
    this.cancel.emit();
  }

  // POPULATE FORM DATA
  ngOnInit() {
    if(this.radioExam) {
      this.formData = {...this.radioExam}
    }
  }

  // EDIT/ADD RADIO EXAMS
  @Input() radioExam: RadiologyExam | null = null;
  submitRadioExam() {
    // EDIT
    const isEditing = this.formData.id !== 0;
    if(isEditing) {
      this.radiologyExamsService.updateRadioExam({...this.formData});
    } else {
      // CREATE NEW EXAM
      const newRadioExam: RadiologyExam = {
        ...this.formData,
        id: Date.now()
      }
      this.radiologyExamsService.addRadioExam(newRadioExam);
    }
    this.resetFrom();
    this.closeForm();
  }

   // RESET FORM
  resetFrom() {
    this.formData = {
      id: 0,
      patientName: "",
      examType: "",
      bodyPart: "",
      radiologist: "",
      date: "",
      status: "",
    }
  }
}
