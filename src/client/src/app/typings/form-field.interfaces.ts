import {MatFormFieldAppearance} from '@angular/material/form-field/form-field';
import {ThemePalette} from '@angular/material/core';
import {AbstractControl, FormControl, ValidationErrors} from '@angular/forms';

export interface FormField {
  control: FormControl | AbstractControl;
  errorMessage?: (errors: ValidationErrors | null) => string | void;
  label: string;
  appearance: MatFormFieldAppearance;
  color: ThemePalette;
  extendClass: string;
  // ...
  // required: boolean;
  // disabled: boolean;
  // floatLabel: FloatLabelType;
  // hint: TemplateRef<unknown>;
}
