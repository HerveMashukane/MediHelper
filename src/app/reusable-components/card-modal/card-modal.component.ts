import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Doctor } from '../../services/mydoctors.service';
import { Patient } from '../../services/patient-records.service';

@Component({
  selector: 'app-card-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-modal.component.html',
  styleUrl: './card-modal.component.css'
})
export class CardModalComponent {
  // doctors & patients functionality
    @Input() patient: Patient | null = null;
    @Input() doctor: Doctor | null = null;
    @Input() isDoctorsModalOpen: boolean = false;
    @Input() isPatientsModalOpen: boolean = false;
    @Output() close = new EventEmitter<void>();
  
    onClose() {
      this.close.emit();
    }
}
