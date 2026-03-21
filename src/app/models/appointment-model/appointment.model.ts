export interface Appointment {
  patientName:string;
  doctorName:string;
  date:string;
  time:string;
  status:string;
  type: string;
  message?: string;
}