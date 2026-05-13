import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Medication, MedicationService } from '../../../services/medication/medication.service';

@Component({
  selector: 'app-medication-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './medication-form.component.html',
  styleUrl: './medication-form.component.css'
})
export class MedicationFormComponent {
  // MEDICATION STRUCTURE
  formData: Medication = {
    id: 0,
    medName: "",
    doctorName: "",
    dosage: "",
    dosageUnit: "",
    schedule: "",
    startDate: "",
    endDate: "",
    status: "Inactive",
    progress: 0,
    notes:  "",
  }

  constructor(private medicationService: MedicationService){}

  // add new medication
  submitMedication() {
    // check if form is editing or adding new medication
    const isEditMode = this.formData.id !== 0;

    if(isEditMode) {
      this.medicationService.updateMedcations({...this.formData});
    }
    if (
      this.formData.medName &&
      this.formData.doctorName &&
      this.formData.dosage &&
      this.formData.dosageUnit &&
      this.formData.schedule &&
      this.formData.startDate &&
      this.formData.endDate &&
      this.formData.status
      // this.progress
    ) {
      const newMedication: Medication = {
        id: Date.now(),
        medName: this.formData.medName,
        doctorName: this.formData.doctorName,
        dosage: this.formData.dosage,
        dosageUnit: this.formData.dosageUnit,
        schedule: this.formData.schedule,
        startDate: this.formData.startDate,
        endDate: this.formData.endDate,
        status: this.formData.status as 'Active' | 'Inactive' | 'Pending' | 'Completed',
        progress: Number(this.formData.progress), // convert progress to a number
        notes: this.formData.notes
        
      }
      this.medicationService.addMedication(newMedication);
      this.resetForm();
      this.closeForm();
    }
  }

  // COPY DATA TO FORM
  ngOnInit() {
    if(this.medication) {
      this.formData = {
        ...this.medication,
      }
    }
  }

  // reset form fields
  resetForm() {
    this.formData.medName = "";
    this.formData.doctorName = "";
    this.formData.dosage = "";
    this.formData.dosageUnit = "";
    this.formData.schedule = "";
    this.formData.startDate = "";
    this.formData.endDate = "";
    this.formData.status = "Inactive";
    this.formData.notes = "";
  }
  // display medications form data in the form while editing
  @Input() medication: Medication | null = null;
  // close medication form
  @Output() cancel = new EventEmitter<void>();
  closeForm() {
    this.cancel.emit();
  }
}
