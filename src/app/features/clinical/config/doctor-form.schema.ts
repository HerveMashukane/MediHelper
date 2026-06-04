import { DynamicFormConfig } from '../../../shared/components/dynamic-form/form-field.model';

const SPECIALITIES = [
  'Generalist',
  'Cardiologist',
  'Dermatologist',
  'Neurologist',
  'Surgeon',
  'Oncologist',
].map((s) => ({ label: s, value: s }));

export const DOCTOR_FORM_CONFIG: DynamicFormConfig = {
  title: "Doctor Registration",
  submitLabel: 'Add Doctor',
  editSubmitLabel: 'Save Changes',
  fields: [
    { field: 'fullName', type: 'text', label: 'Full Name', validators: ['required'] },
    { field: 'preferedName', type: 'text', label: 'Preferred Name', validators: ['required'] },
    {
      field: 'speciality',
      type: 'select',
      label: 'Speciality',
      validators: ['required'],
      options: SPECIALITIES,
    },
    { field: 'hospital', type: 'text', label: 'Hospital', validators: ['required'] },
    { field: 'email', type: 'email', label: 'Email', validators: ['required', 'email'] },
    { field: 'phone', type: 'tel', label: 'Phone', validators: ['required'] },
    { field: 'image', type: 'file', label: 'Profile Picture' },
  ],
};
