import {AbstractControl, FormControl, ValidationErrors} from '@angular/forms';

export const urlValidator = (control: FormControl | AbstractControl): ValidationErrors | null => {
  if (!control.value) return null;

  try {
    new URL(control.value);
    return null;
  } catch {
    return {url: true};
  }
};
