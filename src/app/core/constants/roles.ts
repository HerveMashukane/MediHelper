/** System roles (align with NestJS guards & Prisma Role enum) */
export const ROLES = {
  ADMIN: 'admin',
  DOCTOR: 'doctor',
  PATIENT: 'patient',
  RECEPTIONIST: 'receptionist',
  STAFF: 'staff',
} as const;

export type UserRole = (typeof ROLES)[keyof typeof ROLES];

export const STAFF_UNITS = ['pharmacy', 'laboratory', 'radiology'] as const;
export type StaffUnit = (typeof STAFF_UNITS)[number];

export const ROLE_LABELS: Record<UserRole, string> = {
  [ROLES.ADMIN]: 'Admin',
  [ROLES.DOCTOR]: 'Doctor',
  [ROLES.PATIENT]: 'Patient',
  [ROLES.RECEPTIONIST]: 'Receptionist',
  [ROLES.STAFF]: 'Medical Staff',
};
