import { Patient, PatientsService } from '../../../services/patients/patients.service';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-patients-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './patients-form.component.html',
  styleUrl: './patients-form.component.css'
})
export class PatientsFormComponent {
  formData: Patient = {
    id: 0,
    preferedName: '',
    image: '',
    fullName: '',
    email: '',
    phone: '',
    department: '',
    age: '',
    bloodGroup: ''
  };

  constructor(private patientsService: PatientsService) {}

  // populate form on edit
  ngOnInit() {
    if (this.patient) {
      this.formData = { ...this.patient };
    }
  }
  // patients data submission
  onSubmit() {
    // EDIT MODE (has id means already exists)
    if (this.formData.id) {

      // No strict validation required here
      // Even if user changes nothing, we allow save
      this.patientsService.updatePatient(this.formData);

    } else {

      // CREATE MODE (create new patient must validate first)
      if (
        this.formData.preferedName && 
        this.formData.fullName && 
        this.formData.email && 
        this.formData.phone && 
        this.formData.department && 
        this.formData.age && 
        this.formData.bloodGroup
      ) {

        const newPatient: Patient = {
          ...this.formData,
          id: Date.now()    // ensure ID is generated
        };

        this.patientsService.addPatient(newPatient);

      } else {
        // Optional but important UX feedback
        alert('Please fill all required fields');
        return; // stop execution
      }
    }

    this.close.emit(); // close form after success
  }


  @Input() patient: Patient | null = null;
  // cancel patients form
  @Output() close = new EventEmitter<void>();
  onCancel() {
    this.close.emit();
  }

  // Handle file patient selection
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
       this.formData.image = reader.result as string; // base64 data
      };
      reader.readAsDataURL(file);
    }
  }
}