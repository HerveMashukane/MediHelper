import { Component } from '@angular/core';
import { LaboratoryService, LaboTest } from '../../services/laboratory/laboratory.service';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
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
  tests$: Observable<LaboTest[]>;
  filteredTests$: Observable<LaboTest[]>;

  // filters
  searchTerm = "";
  searchTerm$ = new BehaviorSubject<string>("");
  constructor(private laboratoryService: LaboratoryService){
    this.tests$ = this.laboratoryService.tests$;

    // reactive laboratory tests filter
    this.filteredTests$ = combineLatest([
      this.tests$,
      this.searchTerm$
    ]).pipe(
      map(([tests, searchTerm]) => {
        return tests.filter(test => {
          const matchesSearch = 
          test.patientName.toLowerCase().includes(searchTerm.toLowerCase());
          test.technologistName.toLowerCase().includes(searchTerm.toLowerCase());
          test.testType.toLowerCase().includes(searchTerm.toLowerCase());

          return matchesSearch;
        })
      })
    )
  }

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
