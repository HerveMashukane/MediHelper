import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { RadiologyFormComponent } from './radiology-form/radiology-form.component'
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs'
import { RadiologyExam, RadiologyExamsService } from '../../services/radiology/radiology-exams.service'

@Component({
  selector: 'app-radiology',
  standalone: true,
  imports: [RadiologyFormComponent, CommonModule, FormsModule],
  templateUrl: './radiology.component.html',
  styleUrls: ['./radiology.component.css']
})
export class RadiologyComponent {
  radioExams$: Observable<RadiologyExam[]>;
  filteredRadioExams$: Observable<RadiologyExam[]>;

  // filters
  searchTerm = '';
  searchTerm$ = new BehaviorSubject<string>("");

  constructor(public radiologyExamsService: RadiologyExamsService) {
    this.radioExams$ = radiologyExamsService.radioExams$;

    // reactive radiology exams filter
    this.filteredRadioExams$ = combineLatest([
      this.radioExams$,
      this.searchTerm$
    ]).pipe(
      map(([radioExams, searchTerm]) => {
        return radioExams.filter(exam => {
          const matchesSearch = 
            exam.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
            exam.radiologist.toLowerCase().includes(searchTerm.toLowerCase()) ||
            exam.examType.toLowerCase().includes(searchTerm.toLowerCase());
          return matchesSearch
        })
      })
    )
  }
  isFormVisible = false

  // three dots toggle for actions in table
  activeMenuIndex: number | null = null;
  toggleMenu(index: number) {
    this.activeMenuIndex = this.activeMenuIndex === index ? null : index;
  }


  // form control methods

  toggleForm() {
    this.isFormVisible = !this.isFormVisible
  }

  closeFormFromChild() {
    this.isFormVisible = false
  }
}