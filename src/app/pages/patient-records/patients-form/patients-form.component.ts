import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-patients-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './patients-form.component.html',
  styleUrl: './patients-form.component.css'
})
export class PatientsFormComponent {
  id = 0;
  image: string | null = null;
  fullName = '';
  preferedName = '';
  email = '';
  phone = '';
  speciality = '';
  hospital = '';

  // patients data submission
  onSubmit() {

  }

  // cancel patients form
  onCancel() {
    
  }
}
