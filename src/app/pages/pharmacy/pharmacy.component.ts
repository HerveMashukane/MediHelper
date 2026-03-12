import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MedicationFormComponent } from './medication-form/medication-form.component';
import { FormsModule } from '@angular/forms';

export interface Medication {
  id: string
  name: string
  dosage: string
  schedule: string
  doctor: string
  startDate: string
  endDate: string
  status: 'Active' | 'Inactive' | 'Pending' | 'Completed'
  progress: number
  notes?: string

}

@Component({
  selector: 'app-pharmacy',
  standalone: true,
  imports: [CommonModule, MedicationFormComponent, FormsModule],
  templateUrl: './pharmacy.component.html',
  styleUrl: './pharmacy.component.css'
})
export class PharmacyComponent {
  isFormVisible: boolean = false;
  medicationsTracker: any = [
  {
    name: 'Amoxicillin', 
    dosage: '500mg', 
    schedule: 'Twice a day', 
    status: 'Active', 
  },
  ]
  closeFormFromChild() {
    this.isFormVisible = false;
  }
  toggleForm() {
    this.isFormVisible = !this.isFormVisible;
  }
  searchTerm = ''
  currentFilter = 'All'

  statusFilters = ['All','Active','Pending','Inactive','Completed']

  setFilter(filter: string) {
    this.currentFilter = filter
  }

  get filteredMedications() {

    return this.medicationsTracker.filter((med: any) => {

      const matchesSearch =
        med.name.toLowerCase().includes(this.searchTerm.toLowerCase())

      const matchesStatus =
        this.currentFilter === 'All' || med.status === this.currentFilter

      return matchesSearch && matchesStatus

    })

  }
}
