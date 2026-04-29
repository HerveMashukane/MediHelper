import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MedicationFormComponent } from './medication-form/medication-form.component';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { Medication, MedicationService } from '../../services/medication/medication.service';

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
  medicationStats$: Observable<{
    Active: number,
    Inactive: number,
    Completed: number,
    Pending: number,
    Total: number
  }>;

  constructor(private medicationService: MedicationService){
    this.medications$ = this.medicationService.medications$;
    this.medicationStats$ = this.medicationService.medicationStats$;
  }

  closeFromChild() {
    this.isFormVisible = false;
  }
  toggleForm() {
    this.isFormVisible = !this.isFormVisible;
  }
  // filters
  searchTerm = ''
  selectedStatus = 'All'
  statusFilters = ['All','Active','Pending','Inactive','Completed']

  setFilter(filter: string) {
    this.selectedStatus = filter
  }

  get filteredMedications() {
    const allMedications = this.medicationService.medicationsSource.value;

    return allMedications.filter(med =>
      (this.selectedStatus === 'All' || med.status === this.selectedStatus) &&
      (this.searchTerm === '' || med.medName.toLowerCase().includes(this.searchTerm.toLowerCase()))
    );
  }

  // get medication progress dynamically
  currentTime = Date.now();

  ngOnInit() {
    setInterval(() => {
      this.currentTime = Date.now();
    }, 60000);
  }
  getProgress(med: Medication): number {
    const start = new Date(med.startDate).getTime();
    const end = new Date(med.endDate).getTime();

    if (this.currentTime <= start) return 0;
    if (this.currentTime >= end) return 100;

    return Math.round(((this.currentTime - start) / (end - start)) * 100);
  }

  // toiggle action menu in table
  activeMenuIndex: number | null = null;
  toggleMenu(index: number) {
    this.activeMenuIndex = this.activeMenuIndex === index ? null : index;
  }
}
