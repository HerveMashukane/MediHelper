import { DynamicFormConfig } from '../../../shared/components/dynamic-form/form-field.model';

const DEPARTMENTS = [
  'Pediatry',
  'Cardiology',
  'Dermatology',
  'Neurology',
  'Surgery',
  'Oncology',
].map((d) => ({ label: d, value: d }));

export const PATIENT_FORM_CONFIG: DynamicFormConfig = {
  title: 'Patient Registration',
  submitLabel: 'Add Patient',
  editSubmitLabel: 'Save Changes',
  fields: [
    { field: 'fullName', type: 'text', label: 'Full Name', placeholder: 'e.g. Herve Imani', validators: ['required'] },
    { field: 'preferedName', type: 'text', label: 'Preferred Name', placeholder: 'e.g. Imani', validators: ['required'] },
    {
      field: 'department',
      type: 'select',
      label: 'Department',
      validators: ['required'],
      options: DEPARTMENTS,
      placeholder: 'Choose department',
    },
    { field: 'age', type: 'number', label: 'Age', placeholder: 'e.g. 35', validators: ['required'], min: 0 },
    { field: 'email', type: 'email', label: 'Email', placeholder: 'patient@example.com', validators: ['required', 'email'] },
    { field: 'phone', type: 'tel', label: 'Phone', placeholder: '+243...', validators: ['required'] },
    { field: 'image', type: 'file', label: 'Profile Picture' },
    { field: 'bloodGroup', type: 'text', label: 'Blood Group', placeholder: 'e.g. A+', validators: ['required'] },
  ],
};
