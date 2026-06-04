import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { LoginPageComponent } from './core/auth/login-page/login-page.component';

// Admin
import { AdminDashboardComponent } from './features/admin/dashboard/admin-dashboard.component';
import { PatientsComponent } from './AdminPages/patients/patients.component';
import { DoctorsComponent } from './AdminPages/doctors/doctors.component';
import { AppointmentsComponent } from './AdminPages/appointments/appointments.component';
import { MedicalServicesComponent } from './features/clinical/medical-services/medical-services.component';
import { PharmacyComponent } from './AdminPages/pharmacy/pharmacy.component';
import { LaboratoryComponent } from './AdminPages/laboratory/laboratory.component';
import { RadiologyComponent } from './AdminPages/radiology/radiology.component';
import { BillingComponent } from './AdminPages/billing/billing.component';
import { InsuranceComponent } from './AdminPages/insurance/insurance.component';
import { ReportsComponent } from './AdminPages/reports/reports.component';
import { SettingsComponent } from './AdminPages/settings/settings.component';

// Role dashboards
import { DoctorDashboardComponent } from './features/doctor/dashboard/doctor-dashboard.component';
import { PatientDashboardComponent } from './features/patient/dashboard/patient-dashboard.component';
import { ReceptionDashboardComponent } from './features/receptionist/dashboard/reception-dashboard.component';
import { StaffDashboardComponent } from './features/staff/dashboard/staff-dashboard.component';
import { PatientRecordsComponent } from './features/patient/records/patient-records.component';

/** Shared clinical pages reused across roles */
const clinicalPages = {
  patients: PatientsComponent,
  doctors: DoctorsComponent,
  appointments: AppointmentsComponent,
  medicalServices: MedicalServicesComponent,
  pharmacy: PharmacyComponent,
  laboratory: LaboratoryComponent,
  radiology: RadiologyComponent,
};

const adminChildren: Routes = [
  { path: 'dashboard', component: AdminDashboardComponent },
  { path: 'patients', component: clinicalPages.patients },
  { path: 'doctors', component: clinicalPages.doctors },
  { path: 'appointments', component: clinicalPages.appointments },
  { path: 'medical-services', component: clinicalPages.medicalServices },
  { path: 'pharmacy', component: clinicalPages.pharmacy },
  { path: 'laboratory', component: clinicalPages.laboratory },
  { path: 'radiology', component: clinicalPages.radiology },
  { path: 'billing', component: BillingComponent },
  { path: 'insurance', component: InsuranceComponent },
  { path: 'reports', component: ReportsComponent },
  { path: 'settings', component: SettingsComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
];

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginPageComponent },

  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'admin', children: adminChildren },

      {
        path: 'doctor',
        children: [
          { path: 'dashboard', component: DoctorDashboardComponent },
          { path: 'patients', component: clinicalPages.patients },
          { path: 'appointments', component: clinicalPages.appointments },
          { path: 'medical-services', component: clinicalPages.medicalServices },
          { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
        ],
      },

      {
        path: 'patient',
        children: [
          { path: 'dashboard', component: PatientDashboardComponent },
          { path: 'records', component: PatientRecordsComponent },
          { path: 'appointments', component: clinicalPages.appointments },
          { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
        ],
      },

      {
        path: 'receptionist',
        children: [
          { path: 'dashboard', component: ReceptionDashboardComponent },
          { path: 'patients', component: clinicalPages.patients },
          { path: 'appointments', component: clinicalPages.appointments },
          { path: 'doctors', component: clinicalPages.doctors },
          { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
        ],
      },

      {
        path: 'staff',
        children: [
          { path: 'dashboard', component: StaffDashboardComponent },
          { path: 'pharmacy', component: clinicalPages.pharmacy },
          { path: 'laboratory', component: clinicalPages.laboratory },
          { path: 'radiology', component: clinicalPages.radiology },
          { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
        ],
      },

      // Legacy routes → admin (backward compatible)
      { path: 'adminDashboard', redirectTo: '/admin/dashboard', pathMatch: 'full' },
      { path: 'patients', redirectTo: '/admin/patients', pathMatch: 'full' },
      { path: 'doctors', redirectTo: '/admin/doctors', pathMatch: 'full' },
      { path: 'appointments', redirectTo: '/admin/appointments', pathMatch: 'full' },
      { path: 'pharmacy', redirectTo: '/admin/pharmacy', pathMatch: 'full' },
      { path: 'laboratory', redirectTo: '/admin/laboratory', pathMatch: 'full' },
      { path: 'radiology', redirectTo: '/admin/radiology', pathMatch: 'full' },
      { path: 'billing', redirectTo: '/admin/billing', pathMatch: 'full' },
      { path: 'insurance', redirectTo: '/admin/insurance', pathMatch: 'full' },
      { path: 'reports', redirectTo: '/admin/reports', pathMatch: 'full' },
      { path: 'settings', redirectTo: '/admin/settings', pathMatch: 'full' },
    ],
  },
];
