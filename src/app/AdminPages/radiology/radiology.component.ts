import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { RadiologyFormComponent } from './radiology-form/radiology-form.component'
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs'
import { RadiologyExam, RadiologyExamsService } from '../../services/radiology/radiology-exams.service'
import { ConfirmDialogService } from '../../confirm-dialog.service'
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component'
import { AppButtonComponent } from '../../shared/components/app-button/app-button.component'

@Component({
  selector: 'app-radiology',
  standalone: true,
  imports: [RadiologyFormComponent, CommonModule, FormsModule, PageHeaderComponent, AppButtonComponent],
  templateUrl: './radiology.component.html',
  styleUrls: ['./radiology.component.css']
})
export class RadiologyComponent {
  radioExams$: Observable<RadiologyExam[]>;
  filteredRadioExams$: Observable<RadiologyExam[]>;

  // filters
  searchTerm = "";
  selectedStatus = "All"
  searchTerm$ = new BehaviorSubject<string>("");
  selectedStatus$ = new BehaviorSubject<string>("All");

  constructor(public radiologyExamsService: RadiologyExamsService, private confirm: ConfirmDialogService) {
    this.radioExams$ = radiologyExamsService.radioExams$;

    // reactive radiology exams filter
    this.filteredRadioExams$ = combineLatest([
      this.radioExams$,
      this.searchTerm$,
      this.selectedStatus$
    ]).pipe(
      map(([radioExams, searchTerm, selectedStatus]) => {
        return radioExams.filter(exam => {
          // input filter
          const matchesSearch = 
            exam.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            exam.radiologist.toLowerCase().includes(searchTerm.toLowerCase()) ||
            exam.examType.toLowerCase().includes(searchTerm.toLowerCase());

          // status filter
          const matchesStatus = 
            this.selectedStatus === "All" || exam.status === this.selectedStatus;

          return matchesSearch && matchesStatus
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
    this.isFormVisible = !this.isFormVisible;
    this.editingRadioExam = null;
  }

  closeFormFromChild() {
    this.isFormVisible = false
  }

  // EDIT RADIO EXAM
  editingRadioExam: RadiologyExam | null = null;
  editRadioExam(laboExam: RadiologyExam) {
    this.editingRadioExam = { ...laboExam}
    this.isFormVisible = true;
  }

  // REMOVE RADIO EXAM
  async removeRadioExam(id: number, radioExamType: string) {
    const ok = await this.confirm.request({
      title: 'Delete Radiology Exam',
      message: 'Are you sure you want to delete the',
      highlight: `${radioExamType} exam ?`,
      cancelText: 'Cancel',
      confirmText: 'Yes, delete'
    })
    if(!ok) return;
    this.radiologyExamsService.removeRadioExam(id);
  }

  getStatusClass(status: string): string {
    const map: Record<string, string> = {
      Pending: 'status-warning',
      'In Review': 'status-info',
      Completed: 'status-success',
      Urgent: 'status-danger',
    };
    return map[status] ?? 'status-neutral';
  }
}