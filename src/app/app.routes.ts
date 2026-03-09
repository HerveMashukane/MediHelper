import { PatientsComponent } from './pages/patients/patients.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MedicationTrackerComponent } from './pages/medication-tracker/medication-tracker.component';
import { AppointmentsComponent } from './pages/appointments/appointments.component';
import { BookingsComponent } from './pages/bookings/bookings.component';
import { DoctorsComponent } from './pages/doctors/doctors.component';
import { LaboratoryComponent } from './pages/laboratory/laboratory.component';
import { RadiologyComponent } from './pages/radiology/radiology.component';
import { BillingComponent } from './pages/billing/billing.component';
import { InsuranceComponent } from './pages/insurance/insurance.component';
import { ReportsComponent } from './pages/reports/reports.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {path: '', redirectTo: 'dashboard', pathMatch: 'full'}, //default route
      { path: 'dashboard', component: DashboardComponent },
      { path: 'patients', component: PatientsComponent },
      {path: 'doctors', component: DoctorsComponent},
      { path: 'appointments', component: AppointmentsComponent },
      { path: 'pharmacy', component: MedicationTrackerComponent },
      {path: 'bookings', component: BookingsComponent},
      {path: 'laboratory', component: LaboratoryComponent},
      {path: 'radiology', component: RadiologyComponent},
      {path: 'billing', component: BillingComponent},
      {path: 'insurance', component: InsuranceComponent},
      {path: 'reports', component: ReportsComponent},
      {path: 'settings', component: SettingsComponent},
    ]
  }
];
