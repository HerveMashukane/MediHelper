import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'

export interface RadiologyExam {

  id: string

  patient: string

  examType: 'X-Ray' | 'MRI' | 'CT Scan' | 'Ultrasound'

  bodyPart: string

  doctor: string

  radiologist: string

  date: string

  status: 'Pending' | 'In Review' | 'Completed' | 'Urgent'

  report?: string

  imageUrl?: string

}

@Component({
  selector: 'app-radiology',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './radiology.component.html',
  styleUrls: ['./radiology.component.css']
})
export class RadiologyComponent {

  /* ------------------------------
     UI STATE
  ------------------------------ */

  searchTerm = ''

  currentFilter: string = 'All'

  isFormVisible = false


  /* ------------------------------
     FILTER OPTIONS
  ------------------------------ */

  statusFilters: string[] = [
    'All',
    'Pending',
    'In Review',
    'Completed',
    'Urgent'
  ]


  /* ------------------------------
     MOCK DATA
     (Temporary until backend)
  ------------------------------ */

  radiologyExams: RadiologyExam[] = [

    {
      id: '1',
      patient: 'John Smith',
      examType: 'X-Ray',
      bodyPart: 'Chest',
      doctor: 'Dr. Williams',
      radiologist: 'Dr. Adams',
      date: '2026-03-10',
      status: 'Completed',
      report: 'No abnormal findings'
    },

    {
      id: '2',
      patient: 'Maria Lopez',
      examType: 'MRI',
      bodyPart: 'Brain',
      doctor: 'Dr. Carter',
      radiologist: 'Dr. Evans',
      date: '2026-03-11',
      status: 'In Review'
    },

    {
      id: '3',
      patient: 'David Brown',
      examType: 'CT Scan',
      bodyPart: 'Abdomen',
      doctor: 'Dr. Taylor',
      radiologist: 'Dr. Wilson',
      date: '2026-03-12',
      status: 'Pending'
    },

    {
      id: '4',
      patient: 'Sophia Johnson',
      examType: 'Ultrasound',
      bodyPart: 'Kidney',
      doctor: 'Dr. Clark',
      radiologist: 'Dr. Lee',
      date: '2026-03-12',
      status: 'Urgent'
    }

  ]


  /* ------------------------------
     FORM CONTROL
  ------------------------------ */

  toggleForm() {
    this.isFormVisible = !this.isFormVisible
  }

  closeFormFromChild() {
    this.isFormVisible = false
  }


  /* ------------------------------
     FILTER METHODS
  ------------------------------ */

  setFilter(filter: string) {
    this.currentFilter = filter
  }


  /* ------------------------------
     FILTERED RESULTS
  ------------------------------ */

  get filteredRadiology(): RadiologyExam[] {

    return this.radiologyExams.filter(exam => {

      const matchesSearch =
        exam.patient.toLowerCase()
        .includes(this.searchTerm.toLowerCase())

      const matchesStatus =
        this.currentFilter === 'All' ||
        exam.status === this.currentFilter

      return matchesSearch && matchesStatus

    })

  }

}