import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { SlotsService } from '../../../services/slots.service';
import { AppointmentService } from '../../../services/appointment.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-appointments-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './appointments-form.component.html',
  styleUrl: './appointments-form.component.css'
})
export class AppointmentsFormComponent {

  patientName = '';
  constructor(
    private slotsService: SlotsService,
    private appointmentService: AppointmentService,
  ){}
  slots:any[]=[]
  selectedDoctor:any
  selectedDate: any

loadSlots()
{

if(!this.selectedDoctor) return

this.slots = this.slotsService.generateSlots(

this.selectedDoctor.startTime,
this.selectedDoctor.endTime,
this.selectedDoctor.slotDuration

)

}
  selectedSlot = '';

  selectSlot(slot:any)
  {
    if(!slot.booked)
    {
      this.selectedSlot = slot.time;
    }
  }

  // close form
  @Output() close = new EventEmitter<void>();
  onCancel() {
    this.close.emit();
  }

  // book appointment
  bookAppointment() {
    
  }
}
