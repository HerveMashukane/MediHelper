import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LaboratoryService, LaboTest } from '../../../services/laboratory/laboratory.service';

@Component({
  selector: 'app-laboratory-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './laboratory-form.component.html',
  styleUrl: './laboratory-form.component.css'
})
export class LaboratoryFormComponent {
  id = 0;
  patientName = "";
  testType = "";
  technologistName = "";
  date = "";
  status = "";

  constructor(private laboratoryService: LaboratoryService){}

  // add new test
  onSubmit() {
    if(
      this.patientName &&
      this.technologistName &&
      this.testType &&
      this.date &&
      this.status
    ){
      const newLaboTest: LaboTest = {
        id: Date.now(),
        patientName: this.patientName,
        technologistName: this.technologistName,
        testType: this.testType,
        date: this.date,
        status: this.status as 'Active' | 'Inactive' | 'Pending' | 'Completed' | 'Canceled',
      }
      this.laboratoryService.addLaboTest(newLaboTest);
      this.resetForm();
      this.closeForm();
    }
  }

  // reset form
  resetForm(){
    this.patientName = "";
    this.technologistName = "";
    this.testType = "";
    this.date = "";
    this.status = "";
  }

  // close form
  @Output() cancel = new EventEmitter<void>();
  closeForm() {
    this.cancel.emit();
  }
}
