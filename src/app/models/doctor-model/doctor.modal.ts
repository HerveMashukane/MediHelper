export interface Doctor {
  id:number;
  name:string;
  specialty:string;
  workingDays:string[];
  startTime:string;
  endTime:string;
  slotDuration:number;
}