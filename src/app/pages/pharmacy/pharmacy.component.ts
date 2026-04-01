import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MedicationFormComponent } from './medication-form/medication-form.component';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { Medication, MedicationService } from '../../services/medication.service';

@Component({
  selector: 'app-pharmacy',
  standalone: true,
  imports: [CommonModule, MedicationFormComponent, FormsModule],
  templateUrl: './pharmacy.component.html',
  styleUrl: './pharmacy.component.css'
})
export class PharmacyComponent {
  isFormVisible: boolean = false;
  medications$: Observable<Medication[]>;

  constructor(private medicationService: MedicationService){
    this.medications$ = this.medicationService.medications$;
  }

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
    const allMedications = this.medicationService.medicationsSource.value;

    return allMedications.filter(med =>
      (this.currentFilter === 'All' || med.status === this.currentFilter) &&
      (this.searchTerm === '' || med.medName.toLowerCase().includes(this.searchTerm.toLowerCase()))
    );
  }
}
