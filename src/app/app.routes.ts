import { PatientsComponent } from './AdminPages/patients/patients.component';
import { SettingsComponent } from './AdminPages/settings/settings.component';
import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { DashboardComponent } from './AdminPages/dashboard/dashboard.component';
import { AppointmentsComponent } from './AdminPages/appointments/appointments.component';
import { DoctorsComponent } from './AdminPages/doctors/doctors.component';
import { LaboratoryComponent } from './AdminPages/laboratory/laboratory.component';
import { RadiologyComponent } from './AdminPages/radiology/radiology.component';
import { BillingComponent } from './AdminPages/billing/billing.component';
import { InsuranceComponent } from './AdminPages/insurance/insurance.component';
import { ReportsComponent } from './AdminPages/reports/reports.component';
import { PharmacyComponent } from './AdminPages/pharmacy/pharmacy.component';
import { AdminLoginComponent } from './core/auth/admin-login/admin-login.component';
import { NavbarComponent } from './layout/navbar/navbar.component';

export const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'}, //default route
  { path: 'login', component: AdminLoginComponent },
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'adminDashboard', component: DashboardComponent },
      { path: 'patients', component: PatientsComponent },
      {path: 'doctors', component: DoctorsComponent},
      { path: 'appointments', component: AppointmentsComponent },
      { path: 'pharmacy', component: PharmacyComponent },
      {path: 'laboratory', component: LaboratoryComponent},
      {path: 'radiology', component: RadiologyComponent},
      {path: 'billing', component: BillingComponent},
      {path: 'insurance', component: InsuranceComponent},
      {path: 'reports', component: ReportsComponent},
      {path: 'settings', component: SettingsComponent},
    ]
  }
];
