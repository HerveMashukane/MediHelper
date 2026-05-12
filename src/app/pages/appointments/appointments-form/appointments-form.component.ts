import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SlotsService } from '../../../services/slots/slots.service';
import { Appointment, AppointmentService } from '../../../services/appointments/appointment.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-appointments-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './appointments-form.component.html',
  styleUrl: './appointments-form.component.css'
})
export class AppointmentsFormComponent {

  // ================= DOCTORS =================
  doctors = [
    { id: 1, name: 'Dr Herve', startTime: '07:00', endTime: '12:00', slotDuration: 30},
    { id: 2, name: 'Dr Alice', startTime: '12:00', endTime: '17:00', slotDuration: 20 }
  ];

  // ================= FORM STATE =================
  formData = {
    id: 0,
    patientName: '',
    doctorName: '',
    date: '',
    time: '',
    status: 'Pending',
    type: '',
    notes: '',
  };
  // ================= SLOTS =================
  slots: any[] = [];
  selectedDoctor: any = null;

  constructor(
    private slotsService: SlotsService,
    private appointmentService: AppointmentService
  ) {}

  // ================= LOAD SLOTS =================
  loadSlots() {
    // find selected doctor object
    this.selectedDoctor = this.doctors.find(
      d => d.name === this.formData.doctorName
    );

    if (!this.selectedDoctor || !this.formData.date) return;

    this.slots = this.slotsService.generateSlots(
      this.selectedDoctor.startTime,
      this.selectedDoctor.endTime,
      this.selectedDoctor.slotDuration
    );
  }

  // ================= SELECT SLOT =================
  selectedSlot = '';

  selectSlot(slot: any) {
    if (!slot.booked) {
      this.selectedSlot = slot.time;
      this.formData.time = slot.time;
    }
  }

  // get data from parent and display in the form
  @Input() appointment: Appointment | null = null;
  // copy data of editing doctor and display in the form
  ngOnInit() {
    if (this.appointment) {
      this.formData = { 
        ...this.appointment,
        notes: this.appointment.notes?? ''
      };
    }
  }
  // ================= CLOSE FORM =================
  @Output() close = new EventEmitter<void>();
  onCancel() {
    this.close.emit();
  }

  // ================= BOOK APPOINTMENT =================
  bookAppointment() {
    if(this.formData.id) {
      this.appointmentService.updateAppointments(this.formData);
    }
    if(
      this.formData.patientName &&
      this.formData.doctorName &&
      this.formData.date &&
      this.formData.status &&
      this.formData.time &&
      this.formData.type
    ){
      const newAppointment = {
        ...this.formData,
        id: Date.now(),
      }
      // add appointment
      this.appointmentService.addAppointment(newAppointment);
      // reset form after submit
      this.resetForm();
      // close form
      this.onCancel();
    }
  }

  // ================= RESET FORM =================
  resetForm() {
    this.formData = {
      id: 0,
      patientName: '',
      doctorName: '',
      date: '',
      time: '',
      status: 'Active',
      type: '',
      notes: ''
    };

    this.selectedSlot = '';
    this.slots = [];
    this.selectedDoctor = null;
  }
}