import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MedicationFormComponent } from './medication-form/medication-form.component';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
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
  medications$: Observable<Medication[]>; // observable medicatins list
  filteredMedications$: Observable<Medication[]>; // observable list of filtered medication by search and status
  medicationStats$: Observable<{
    Active: number,
    Inactive: number,
    Completed: number,
    Pending: number,
    Total: number
  }>; // observable medication statistics

  // filters
  searchTerm = ''
  selectedStatus = 'All'
  searchTerm$ = new BehaviorSubject<string>("");
  selectedStatus$ = new BehaviorSubject<string>("All");

  constructor(private medicationService: MedicationService){
    this.medications$ = this.medicationService.medications$;
    this.medicationStats$ = this.medicationService.medicationStats$;

    // filter medications by status and search term
    this.filteredMedications$ = combineLatest([
      this.medications$,
      this.searchTerm$,
      this.selectedStatus$
    ]).pipe(
      map(([medications, searchTerm, selectedStatus]) => {
        return medications.filter(med => {
          const matchesSearch =
            med.medName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            med.doctorName.toLowerCase().includes(searchTerm.toLowerCase());

          const matchesStatus =
            selectedStatus === 'All' || med.status === selectedStatus;

          return matchesSearch && matchesStatus;
        });
      })
    );
  }

  closeFromChild() {
    this.isFormVisible = false;
  }
  toggleForm() {
    this.isFormVisible = !this.isFormVisible;
  }

  // get medication progress dynamically
  currentTime = Date.now();

  ngOnInit() {
    // logic for dynamic medication progress
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

  // edit medications
  editingMedication: Medication | null = null;
  editMedications(med: Medication) {
    this.editingMedication = { ...med};
    this.isFormVisible = true;
  }
}
