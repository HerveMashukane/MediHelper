export type AppointmentStatus =
  | 'Active'
  | 'Upcoming'
  | 'Completed'
  | 'Pending'
  | 'Canceled';

export interface Appointment {
  id: string;
  patientId?: string;
  patientName: string;
  doctorId?: string;
  doctorName: string;
  date: string;
  time: string;
  status: AppointmentStatus | string;
  type: string;
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
}

export type CreateAppointmentDto = Omit<Appointment, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateAppointmentDto = Partial<CreateAppointmentDto>;
