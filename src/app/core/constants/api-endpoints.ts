/**
 * API route contracts — mirror future NestJS controllers.
 * Base URL will come from environment when backend is connected.
 */
export const API_BASE = '/api/v1';

export const API_ENDPOINTS = {
  patients: `${API_BASE}/patients`,
  doctors: `${API_BASE}/doctors`,
  appointments: `${API_BASE}/appointments`,
  medicalServices: `${API_BASE}/medical-services`,
  pharmacy: `${API_BASE}/pharmacy`,
  laboratory: `${API_BASE}/laboratory`,
  radiology: `${API_BASE}/radiology`,
  billing: `${API_BASE}/billing`,
  insurance: `${API_BASE}/insurance`,
  reports: `${API_BASE}/reports`,
  settings: `${API_BASE}/settings`,
  auth: `${API_BASE}/auth`,
} as const;
