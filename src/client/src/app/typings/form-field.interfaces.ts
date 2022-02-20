import {MatFormFieldAppearance} from '@angular/material/form-field/form-field';
import {ThemePalette} from '@angular/material/core';
import {FormControl} from '@angular/forms';

export interface FormField {
  control: FormControl;
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
