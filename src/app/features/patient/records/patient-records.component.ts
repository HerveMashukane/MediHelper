import { Component } from '@angular/core';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';

@Component({
  selector: 'app-patient-records',
  standalone: true,
  imports: [PageHeaderComponent],
  template: `
    <section class="page-container animate-pageFlip">
      <app-page-header
        title="My Health Records"
        subtitle="Visit history, prescriptions, and lab results"
      />
      <div class="clinical-card p-8 text-center text-clinical-muted">
        Records will load from GET /api/v1/patients/:id/records when the backend is connected.
      </div>
    </section>
  `,
})
export class PatientRecordsComponent {}
