import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SlotsService {
  constructor() { }
  
  generateSlots(start:string,end:string,duration:number)
  {
  const slots:any[]=[]
  let [hour,minute] = start.split(':').map(Number)
  let [endHour,endMinute] = end.split(':').map(Number)
  let current = new Date()
  current.setHours(hour,minute,0)
  let endTime = new Date()
  endTime.setHours(endHour,endMinute,0)
  while(current < endTime)
  {
  slots.push({
  time:current.toTimeString().slice(0,5),
  booked:false
  })
  current.setMinutes(current.getMinutes()+duration)
  }
  return slots
  }
}
