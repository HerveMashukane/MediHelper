import { DynamicFormConfig } from '../../../shared/components/dynamic-form/form-field.model';

export const MEDICAL_SERVICE_FORM_CONFIG: DynamicFormConfig = {
  title: 'Medical Service',
  submitLabel: 'Add Service',
  editSubmitLabel: 'Save Changes',
  fields: [
    { field: 'name', type: 'text', label: 'Service Name', validators: ['required'] },
    { field: 'department', type: 'text', label: 'Department', validators: ['required'] },
    { field: 'description', type: 'textarea', label: 'Description', colSpan: 2 },
    { field: 'price', type: 'number', label: 'Price', validators: ['required'], min: 0 },
    { field: 'durationMinutes', type: 'number', label: 'Duration (minutes)', validators: ['required'], min: 5 },
  ],
};
