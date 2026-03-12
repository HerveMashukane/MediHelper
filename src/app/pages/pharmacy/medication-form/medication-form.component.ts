import { Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-medication-form',
  standalone: true,
  imports: [],
  templateUrl: './medication-form.component.html',
  styleUrl: './medication-form.component.css'
})
export class MedicationFormComponent {
  @Output() cancel = new EventEmitter<void>();
  closeForm() {
    this.cancel.emit();
  }
}
