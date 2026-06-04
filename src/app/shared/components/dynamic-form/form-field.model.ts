export type FormFieldType =
  | 'text'
  | 'email'
  | 'tel'
  | 'number'
  | 'date'
  | 'time'
  | 'textarea'
  | 'select'
  | 'file';

export type FormValidatorName = 'required' | 'email' | 'min';

export interface FormFieldOption {
  label: string;
  value: string;
}

export interface FormFieldConfig {
  field: string;
  type: FormFieldType;
  label: string;
  placeholder?: string;
  validators?: FormValidatorName[];
  options?: FormFieldOption[];
  colSpan?: 1 | 2;
  min?: number;
  readonly?: boolean;
}

export interface DynamicFormConfig {
  title: string;
  submitLabel?: string;
  editSubmitLabel?: string;
  fields: FormFieldConfig[];
}
