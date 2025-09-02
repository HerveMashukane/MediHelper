import { SettingsComponent } from './pages/settings/settings.component';
import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PatientRecordsComponent } from './pages/patient-records/patient-records.component';
import { MedicationsComponent } from './pages/medications/medications.component';
import { AppointmentsComponent } from './pages/appointments/appointments.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }, // default route
      { path: 'dashboard', component: DashboardComponent },
      { path: 'patients', component: PatientRecordsComponent },
      { path: 'medications', component: MedicationsComponent },
      { path: 'appointments', component: AppointmentsComponent },
      {path: 'settings', component: SettingsComponent},
    ]
  }
];
