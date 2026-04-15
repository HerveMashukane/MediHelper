import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-radiology-form',
  standalone: true,
  imports: [],
  templateUrl: './radiology-form.component.html',
  styleUrl: './radiology-form.component.css'
})
export class RadiologyFormComponent {

  // close form
  @Output() cancel = new EventEmitter<void>();
  closeForm() {
    this.cancel.emit();
  }
}
