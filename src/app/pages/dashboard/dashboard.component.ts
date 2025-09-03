import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  patientActivities: any = [
    {patientName: 'Hiro Mataba', doctorName: 'Herve Mashukane', date: 'September 2, 2025', status: 'Completed'},
    {patientName: 'Hiro Mataba', doctorName: 'Herve Mashukane', date: 'September 2, 2025', status: 'Pending'},
    {patientName: 'Hiro Mataba', doctorName: 'Herve Mashukane', date: 'September 2, 2025', status: 'Canceled'},
    {patientName: 'Herve Mashukane', doctorName: 'Christelle Pelaya', date: 'September 2, 2025', status: 'Completed'},
    {patientName: 'Christelle Pelaya', doctorName: 'Hiro Mataba', date: 'September 2, 2025', status: 'Pending'},
    {patientName: 'Hiro Mataba', doctorName: 'Herve Mashukane', date: 'September 2, 2025', status: 'Canceled'},
  ]
}
