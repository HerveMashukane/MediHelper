import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-billing',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './billing.component.html',
  styleUrl: './billing.component.css'
})
export class BillingComponent {
  invoices = [
    {
      id: 'INV-0012',
      client: 'Herve Mashukane',
      amount: 1200,
      dueDate: '2026-04-01',
      status: 'Pending'
    },
    {
      id: 'INV-0011',
      client: 'Christelle Pelaya',
      amount: 800,
      dueDate: '2026-03-25',
      status: 'Paid'
    },
    {
      id: 'INV-0010',
      client: 'John Smith',
      amount: 1500,
      dueDate: '2026-04-10',
      status: 'Overdue'
    },
    {
      id: 'INV-0009',
      client: 'Maria Lopez',
      amount: 950,
      dueDate: '2026-03-28',
      status: 'Paid'
    }
  ];

  // actions toglle menu in table
  activeMenuIndex: number | null = null;
  toggleMenu(index: number) {
    this.activeMenuIndex = this.activeMenuIndex === index ? null : index;
  }
}
