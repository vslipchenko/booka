import {AbstractControl, FormControl, ValidationErrors} from '@angular/forms';
import {PROFILE_IMAGE_SIZE_MB} from '~app/constants/images';

export const urlValidator = (control: FormControl | AbstractControl): ValidationErrors | null => {
  if (!control.value) return null;

  try {
    new URL(control.value);
    return null;
  } catch {
    return {url: true};
  }
};

export const imageSizeValidator = (control: FormControl | AbstractControl): ValidationErrors | null => {
  if (!(control.value instanceof File)) return null;
  // Where 1024 ** 2 is amount of bytes compared to 1mb
  if (control.value.size / 1024 ** 2 > PROFILE_IMAGE_SIZE_MB) return {size: true};

  return null;
}
