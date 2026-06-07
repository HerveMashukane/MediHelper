import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  formData = {
    id: 0,
    patientName: "",
    testType: "",
    technologistName: "",
    date: "",
    status: "",
  }

  constructor(private laboratoryService: LaboratoryService){}

  // reset form
  resetForm(){
    this.formData = {
      id: 0,
      patientName: "",
      testType: "",
      technologistName: "",
      date: "",
      status: "",
    }
  }

  // close form
  @Output() cancel = new EventEmitter<void>();
  closeForm() {
    this.cancel.emit();
  }

  // POPULATE DATA ON FORM EDIT
  ngOnInit() {
    if(this.laboTest) {
      this.formData = {...this.laboTest}
    }
  }
  // CREATE AND EDIT LABO TEST
  @Input() laboTest: LaboTest | null = null;
  submitLabTest() {
    const isEdiding = this.formData.id !== 0;
    if(isEdiding) {
      this.laboratoryService.updateLabTests({...this.formData});
    } else {
      const newLabTest: LaboTest = {
        ...this.formData,
        id: Date.now()
      }
      this.laboratoryService.addLaboTest(newLabTest);
    }
    this.resetForm();
    this.closeForm();
  }
}
