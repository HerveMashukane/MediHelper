import { UserRole, ROLES } from '../../core/constants/roles';

export interface NavItem {
  label: string;
  route: string;
  icon: string;
  section?: string;
}

const adminNav: NavItem[] = [
  { label: 'Dashboard', route: '/admin/dashboard', icon: 'fa-gauge', section: 'Overview' },
  { label: 'Patients', route: '/admin/patients', icon: 'fa-user-injured', section: 'Clinical' },
  { label: 'Doctors', route: '/admin/doctors', icon: 'fa-user-doctor', section: 'Clinical' },
  { label: 'Appointments', route: '/admin/appointments', icon: 'fa-calendar-check', section: 'Clinical' },
  { label: 'Medical Services', route: '/admin/medical-services', icon: 'fa-stethoscope', section: 'Clinical' },
  { label: 'Pharmacy', route: '/admin/pharmacy', icon: 'fa-pills', section: 'Medical Units' },
  { label: 'Laboratory', route: '/admin/laboratory', icon: 'fa-flask', section: 'Medical Units' },
  { label: 'Radiology', route: '/admin/radiology', icon: 'fa-x-ray', section: 'Medical Units' },
  { label: 'Billing', route: '/admin/billing', icon: 'fa-file-invoice-dollar', section: 'Administration' },
  { label: 'Insurance', route: '/admin/insurance', icon: 'fa-shield-heart', section: 'Administration' },
  { label: 'Reports', route: '/admin/reports', icon: 'fa-chart-line', section: 'Administration' },
  { label: 'Settings', route: '/admin/settings', icon: 'fa-gear', section: 'System' },
];

const doctorNav: NavItem[] = [
  { label: 'Dashboard', route: '/doctor/dashboard', icon: 'fa-gauge', section: 'Overview' },
  { label: 'My Patients', route: '/doctor/patients', icon: 'fa-user-injured', section: 'Clinical' },
  { label: 'Appointments', route: '/doctor/appointments', icon: 'fa-calendar-check', section: 'Clinical' },
  { label: 'Medical Services', route: '/doctor/medical-services', icon: 'fa-stethoscope', section: 'Clinical' },
];

const patientNav: NavItem[] = [
  { label: 'Dashboard', route: '/patient/dashboard', icon: 'fa-gauge', section: 'Overview' },
  { label: 'My Records', route: '/patient/records', icon: 'fa-folder-open', section: 'Health' },
  { label: 'Appointments', route: '/patient/appointments', icon: 'fa-calendar-check', section: 'Health' },
];

const receptionistNav: NavItem[] = [
  { label: 'Dashboard', route: '/receptionist/dashboard', icon: 'fa-gauge', section: 'Overview' },
  { label: 'Register Patient', route: '/receptionist/patients', icon: 'fa-user-plus', section: 'Front Desk' },
  { label: 'Appointments', route: '/receptionist/appointments', icon: 'fa-calendar-check', section: 'Front Desk' },
  { label: 'Doctors', route: '/receptionist/doctors', icon: 'fa-user-doctor', section: 'Front Desk' },
];

const staffNav: NavItem[] = [
  { label: 'Dashboard', route: '/staff/dashboard', icon: 'fa-gauge', section: 'Overview' },
  { label: 'Pharmacy', route: '/staff/pharmacy', icon: 'fa-pills', section: 'Units' },
  { label: 'Laboratory', route: '/staff/laboratory', icon: 'fa-flask', section: 'Units' },
  { label: 'Radiology', route: '/staff/radiology', icon: 'fa-x-ray', section: 'Units' },
];

export const NAVIGATION_BY_ROLE: Record<UserRole, NavItem[]> = {
  [ROLES.ADMIN]: adminNav,
  [ROLES.DOCTOR]: doctorNav,
  [ROLES.PATIENT]: patientNav,
  [ROLES.RECEPTIONIST]: receptionistNav,
  [ROLES.STAFF]: staffNav,
};

export function getNavSections(role: UserRole): { section: string; items: NavItem[] }[] {
  const items = NAVIGATION_BY_ROLE[role] ?? [];
  const map = new Map<string, NavItem[]>();
  for (const item of items) {
    const section = item.section ?? 'Menu';
    if (!map.has(section)) map.set(section, []);
    map.get(section)!.push(item);
  }
  return Array.from(map.entries()).map(([section, navItems]) => ({ section, items: navItems }));
}
