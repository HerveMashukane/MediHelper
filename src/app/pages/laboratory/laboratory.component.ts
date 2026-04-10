import { Component } from '@angular/core';
import { LaboratoryService, LaboTest } from '../../services/laboratory/laboratory.service';
import { Observable } from 'rxjs';
import { LaboratoryFormComponent } from './laboratory-form/laboratory-form.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-laboratory',
  standalone: true,
  imports: [LaboratoryFormComponent, CommonModule],
  templateUrl: './laboratory.component.html',
  styleUrl: './laboratory.component.css'
})
export class LaboratoryComponent {
  tests$: Observable<LaboTest[]>


  constructor(private laboratoryService: LaboratoryService){
    this.tests$ = this.laboratoryService.tests$;
  }
  get filteredTests() {
    const allTests = this.laboratoryService.laboTestSource.value;
    return allTests;
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
