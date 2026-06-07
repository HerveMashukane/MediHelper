import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DynamicFormConfig, FormFieldConfig, FormValidatorName } from './form-field.model';
import { AppButtonComponent } from '../app-button/app-button.component';

@Component({
  selector: 'app-dynamic-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AppButtonComponent],
  templateUrl: './dynamic-form.component.html',
})
export class DynamicFormComponent implements OnChanges {
  @Input({ required: true }) config!: DynamicFormConfig;
  @Input() initialValue: Record<string, unknown> | null = null;
  @Input() isEdit = false;

  @Output() submitted = new EventEmitter<Record<string, unknown>>();
  @Output() cancelled = new EventEmitter<void>();
  @Output() fileSelected = new EventEmitter<{ field: string; file: File }>();

  form!: FormGroup;
  validationError = '';

  constructor(private fb: FormBuilder) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['config'] || changes['initialValue']) {
      this.buildForm();
    }
  }

  private buildForm(): void {
    const group: Record<string, unknown> = {};
    for (const field of this.config.fields) {
      const validators = this.mapValidators(field.validators ?? []);
      const initial =
        this.initialValue?.[field.field] ??
        (field.type === 'select' ? '' : '');
      group[field.field] = [
        { value: initial, disabled: field.readonly ?? false },
        validators,
      ];
    }
    this.form = this.fb.group(group);
  }

  private mapValidators(names: FormValidatorName[]) {
    const list = [];
    if (names.includes('required')) list.push(Validators.required);
    if (names.includes('email')) list.push(Validators.email);
    return list;
  }

  onSubmit(): void {
    this.validationError = '';
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.validationError = 'Please complete all required fields.';
      return;
    }
    this.submitted.emit(this.form.getRawValue());
  }

  onCancel(): void {
    this.cancelled.emit();
  }

  onFileChange(field: FormFieldConfig, event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) {
      this.fileSelected.emit({ field: field.field, file });
    }
  }

  fieldColClass(field: FormFieldConfig): string {
    return field.colSpan === 2 ? 'md:col-span-2' : '';
  }

  submitLabel(): string {
    if (this.isEdit) {
      return this.config.editSubmitLabel ?? 'Save Changes';
    }
    return this.config.submitLabel ?? 'Submit';
  }

  isInvalid(fieldName: string): boolean {
    const c = this.form.get(fieldName);
    return !!(c && c.invalid && c.touched);
  }
}
