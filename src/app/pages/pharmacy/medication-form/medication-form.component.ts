import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Medication, MedicationService } from '../../../services/medication.service';

@Component({
  selector: 'app-medication-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './medication-form.component.html',
  styleUrl: './medication-form.component.css'
})
export class MedicationFormComponent {
  // medication form schema
  id = 0;
  medName = "";
  doctorName = "";
  dosage = "";
  dosageUnit = "";
  schedule = "";
  startDate = "";
  endDate = "";
  status = "";
  // progress = "";
  notes? = "";

  constructor(private medicationService: MedicationService){}

  // add new medication
  addMedication() {
    if (
      this.medName &&
      this.doctorName &&
      this.dosage &&
      this.dosageUnit &&
      this.schedule &&
      this.startDate &&
      this.endDate &&
      this.status
      // this.progress
    ) {
      const newMedication: Medication = {
        id: Date.now(),
        medName: this.medName,
        doctorName: this.doctorName,
        dosage: this.dosage,
        dosageUnit: this.dosageUnit,
        schedule: this.schedule,
        startDate: this.startDate,
        endDate: this.endDate,
        status: this.status as 'Active' | 'Inactive' | 'Pending' | 'Completed',
        // progress: Number(this.progress), // convert progress to a number
        notes: this.notes
        
      }
      this.medicationService.addMedication(newMedication);
      this.resetForm();
      this.closeForm();
    }
  }

  // reset form fields
  resetForm() {
    this.medName = "";
    this.doctorName = "";
    this.dosage = "";
    this.dosageUnit = "";
    this.schedule = "";
    this.startDate = "";
    this.endDate = "";
    this.status = "";
    this.notes = "";
  }
  // close medication form
  @Output() cancel = new EventEmitter<void>();
  closeForm() {
    this.cancel.emit();
  }
}
