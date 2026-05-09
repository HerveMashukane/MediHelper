import { Component } from '@angular/core';
import { LaboratoryService, LaboTest } from '../../services/laboratory/laboratory.service';
import { BehaviorSubject, combineLatest, map, merge, Observable } from 'rxjs';
import { LaboratoryFormComponent } from './laboratory-form/laboratory-form.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-laboratory',
  standalone: true,
  imports: [LaboratoryFormComponent, CommonModule, FormsModule],
  templateUrl: './laboratory.component.html',
  styleUrl: './laboratory.component.css'
})
export class LaboratoryComponent {
  // observable list of all tests
  laboTests$: Observable<LaboTest[]>;
  // filters
  filteredTests$: Observable<LaboTest[]>;
  searchTerm = "";
  selectedTestType: string = "All";
  selectedStatus: string = "All";
  searchTerm$ = new BehaviorSubject<string>("");
  selectedTestType$ = new BehaviorSubject<string>("");
  selectedStatus$ = new BehaviorSubject<string>("");
  constructor(private laboratoryService: LaboratoryService){
    this.laboTests$ = this.laboratoryService.laboTests$;

    // reactive laboratory tests filter
    this.filteredTests$ = combineLatest([
      this.laboTests$,
      this.searchTerm$,
      this.selectedTestType$,
      this.selectedStatus$
    ]).pipe(
      map(([tests, searchTerm]) => {
        return tests.filter(test => {
          const matchesSearch = 
            test.patientName.toLowerCase().includes(searchTerm.toLowerCase());
            test.technologistName.toLowerCase().includes(searchTerm.toLowerCase());
            test.testType.toLowerCase().includes(searchTerm.toLowerCase());

          const matchesType = 
            this.selectedTestType === "All" || test.testType === this.selectedTestType

          const matchesStatus = 
            this.selectedStatus === "All" || test.status === this.selectedStatus
          return matchesSearch && matchesType && matchesStatus;
        })
      })
    );

    // KPI cards test status stats
    this.laboTestStats$ = this.laboTests$.pipe(
      map((tests) => {
        const stats = {
          Active: 0,
          Pending: 0,
          Completed: 0,
          Critical: 0,
          Total: 0
        }
        for(let test of tests) {
          if(stats[test.status as keyof typeof stats] !== undefined) {
            stats[test.status as keyof typeof stats]++;
            stats.Total++;
          }
        }
        return stats
      })
    )
  }

  // KPI cards test status stats
  laboTestStats$: Observable<{
    Active: number;
    Pending: number;
    Completed: number;
    Critical: number;
    Total: number;
  }>;

  // toggle form visibility
  isFormVisible: boolean = false;
  toggleForm() {
    this.isFormVisible = !this.isFormVisible;
  }

  // close form from chuld component
  closeFromChild() {
    this.isFormVisible = false;
  }

  // actions toggle menu in table
  activeMenuIndex: number | null = null;
  toggleMenu(index: number) {
    this.activeMenuIndex = this.activeMenuIndex === index ? null : index;
  }
}
