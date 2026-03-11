import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SlotsService } from '../../../services/slots.service';

@Component({
  selector: 'app-appointments-form',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './appointments-form.component.html',
  styleUrl: './appointments-form.component.css'
})
export class AppointmentsFormComponent {

  constructor(private slotsService: SlotsService){}
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
}
