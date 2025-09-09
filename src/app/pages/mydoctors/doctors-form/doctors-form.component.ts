import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'

@Component({
  selector: 'app-doctors-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './doctors-form.component.html',
  styleUrl: './doctors-form.component.css'
})
export class DoctorsFormComponent {

}
