import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output} from '@angular/core';
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

  // CREATE AND EDIT MEDICATION
  submitMedication(){
    // EDIT MEDICATION
    const isEditing = this.formData.id !== 0;
    if(isEditing) {
      this.medicationService.updateMedcations({...this.formData});
    } else {
      // CREATE NEW MEDICATION
      if(
        this.formData.medName &&
        this.formData.dosage &&
        this.formData.schedule &&
        this.formData.doctorName &&
        this.formData.startDate &&
        this.formData.endDate &&
        this.formData.status
      ) {
        const newMedication: Medication = {
          ...this.formData,
          id: Date.now()
       };
       this.medicationService.addMedication(newMedication);
       this.resetForm();
      } else {
        alert("please fill out all fields");
      }
    }
    this.closeForm();
  }


  // POPULATE FORM ON EDIT
  ngOnInit() {
    if(this.medication) {
      this.formData = {...this.medication}
    }
  }
  // reset form fields
  resetForm() {
    this.formData = {
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
      notes: "",
    };
  }

  // display medications form data in the form while editing
  @Input() medication: Medication | null = null;
  // close medication form
  @Output() cancel = new EventEmitter<void>();
  closeForm() {
    this.cancel.emit();
  }
}
