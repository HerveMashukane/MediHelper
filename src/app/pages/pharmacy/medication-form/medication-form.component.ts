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
  id = "";
  name = "";
  dosage = "";
  schedule = "";
  doctor = "";
  startDate = "";
  endDate = "";
  status = "";
  progress = "";
  notes? = "";

  constructor(private medicationService: MedicationService){}

  // add new medication
  submitMedication() {
    if (
      this.name &&
      this.dosage &&
      this.schedule &&
      this.doctor &&
      this.startDate &&
      this.endDate &&
      this.status &&
      this.progress
    ) {
      const newMedication: Medication = {
        id: this.id,
        name: this.name,
        dosage: this.dosage,
        schedule: this.schedule,
        doctor: this.doctor,
        startDate: this.startDate,
        endDate: this.endDate,
        status: this.status as 'Active' | 'Inactive' | 'Pending' | 'Completed',
        progress: Number(this.progress), // convert progress to a number
        notes: this.notes
        
      }
      this.medicationService.addMedication(newMedication);
    }
  }
  // close medication form
  @Output() cancel = new EventEmitter<void>();
  closeForm() {
    this.cancel.emit();
  }
}
