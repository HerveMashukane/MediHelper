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
  form = {
    id: 0,
    patientName: "",
    testType: "",
    technologistName: "",
    date: "",
    status: "",
  }

  constructor(private laboratoryService: LaboratoryService){}

  // add new test
  onSubmit() {
    if(
      this.form.patientName &&
      this.form.technologistName &&
      this.form.testType &&
      this.form.date &&
      this.form.status
    ){
      const newLaboTest: LaboTest = {
        id: Date.now(),
        patientName: this.form.patientName,
        technologistName: this.form.technologistName,
        testType: this.form.testType,
        date: this.form.date,
        status: this.form.status as 'Active' | 'Inactive' | 'Pending' | 'Completed' | 'Canceled',
      }
      this.laboratoryService.addLaboTest(newLaboTest);
      this.resetForm();
      this.closeForm();
    }
  }

  // reset form
  resetForm(){
    this.form.patientName = "";
    this.form.technologistName = "";
    this.form.testType = "";
    this.form.date = "";
    this.form.status = "";
  }

  // close form
  @Output() cancel = new EventEmitter<void>();
  closeForm() {
    this.cancel.emit();
  }
}
