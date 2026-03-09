import { PatientsComponent } from './pages/patients/patients.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MedicationTrackerComponent } from './pages/medication-tracker/medication-tracker.component';
import { AppointmentsComponent } from './pages/appointments/appointments.component';
import { BookingsComponent } from './pages/bookings/bookings.component';
import { DoctorsComponent } from './pages/doctors/doctors.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {path: '', redirectTo: 'dashboard', pathMatch: 'full'}, //default route
      { path: 'dashboard', component: DashboardComponent },
      { path: 'patients', component: PatientsComponent },
      { path: 'medications', component: MedicationTrackerComponent },
      { path: 'appointments', component: AppointmentsComponent },
      {path: 'bookings', component: BookingsComponent},
      {path: 'mydoctor', component: DoctorsComponent},
      {path: 'settings', component: SettingsComponent},
    ]
  }
];
