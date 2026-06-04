import { DynamicFormConfig } from '../../../shared/components/dynamic-form/form-field.model';

const STATUSES = ['Upcoming', 'Pending', 'Active', 'Completed', 'Canceled'].map((s) => ({
  label: s,
  value: s,
}));

export const APPOINTMENT_FORM_CONFIG: DynamicFormConfig = {
  title: 'Book Appointment',
  submitLabel: 'Book Appointment',
  editSubmitLabel: 'Save Changes',
  fields: [
    { field: 'patientName', type: 'text', label: 'Patient Name', validators: ['required'] },
    { field: 'doctorName', type: 'text', label: 'Doctor Name', validators: ['required'] },
    { field: 'date', type: 'date', label: 'Date', validators: ['required'] },
    { field: 'time', type: 'time', label: 'Time', validators: ['required'], readonly: true },
    { field: 'status', type: 'select', label: 'Status', options: STATUSES, validators: ['required'] },
    { field: 'type', type: 'text', label: 'Appointment Type', placeholder: 'Consultation, checkup...' },
    { field: 'notes', type: 'textarea', label: 'Notes (optional)', colSpan: 2 },
  ],
};
