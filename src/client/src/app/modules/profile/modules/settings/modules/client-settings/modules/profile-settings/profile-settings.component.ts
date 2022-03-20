import {ChangeDetectionStrategy, Component} from '@angular/core';
import {AbstractControl, FormArray, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {Subject} from 'rxjs';
import {Destroyable} from '~app/typings/component.interfaces';
import {SelectItem} from '~app/typings/select.interfaces';
import {Gender} from '~app/typings/user.enums';
import {
  FIRST_NAME_MAX_LENGTH,
  LAST_NAME_MAX_LENGTH,
  MIDDLE_NAME_MAX_LENGTH,
  NAME_REGEXP,
  PHONE_NUMBER_REGEXP,
  TELEGRAM_USERNAME_REGEXP,
  WHATSAPP_NUMBER_REGEXP,
} from '~app/constants/validation';
import {PROFILE_IMAGE_SIZE_MB} from '~app/constants/images';
import {Store} from '@ngxs/store';
import {ProfileSelectors} from '~app/modules/profile/store/profile.selectors';
import {AccountData} from '~app/typings/account.types';

@Component({
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileSettingsComponent implements Destroyable {
  // @Select(ProfileSelectors.accountData)
  // public readonly accountData$!: Observable<AccountData>;

  public readonly destroy$ = new Subject<void>();
  public readonly genderItems: Array<SelectItem> = [
    {title: 'Мужской', value: Gender.Male},
    {title: 'Женский', value: Gender.Female},
    {title: 'Другой', value: Gender.Other},
  ];

  private readonly profileSettingsForm: FormGroup;

  public constructor(private readonly store: Store) {
    this.profileSettingsForm = this.profileSettingsFormGroup(this.store.selectSnapshot(ProfileSelectors.accountData));
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public addPhoneNumber(): void {
    this.phoneNumbers.push(this.blankPhoneNumber);
  }

  public save(): void {
    this.profileSettingsForm.markAllAsTouched();
    this.gender.updateValueAndValidity();

    if (!this.profileSettingsForm.valid) return;
  }

  public errorMessage(errors: ValidationErrors | null): string | void {
    if (!errors) return;

    return 'Обязательное поле';
  }

  public nameErrorMessage(errors: ValidationErrors | null): string | void {
    if (!errors) return;

    if ('maxlength' in errors) return `Максимум ${FIRST_NAME_MAX_LENGTH} знаков`;

    if ('pattern' in errors)
      return 'Неверный формат. Разрешены символы российского, украинского и английского алфавита';

    return this.errorMessage(errors);
  }

  public telegramErrorMessage(errors: ValidationErrors | null): string | void {
    if (!errors) return;

    if ('pattern' in errors) return 'Неверный формат';
  }

  public whatsAppErrorMessage(errors: ValidationErrors | null): string | void {
    if (!errors) return;

    if ('pattern' in errors) return 'Неверный формат. Пример номера: 380123456789';
  }

  public phoneNumberErrorMessage(errors: ValidationErrors | null): string | void {
    if (!errors) return;

    if ('pattern' in errors) return 'Неверный формат. Пример номера: +380123456789';

    return this.errorMessage(errors);
  }

  public profileSettingsFormGroup(data: AccountData): FormGroup {
    const phoneNumbers = [
      new FormControl(data.phone_number_1, [Validators.required, Validators.pattern(PHONE_NUMBER_REGEXP)]),
    ];

    if (data.phone_number_2) phoneNumbers.push(this.blankPhoneNumber);
    if (data.phone_number_3) phoneNumbers.push(this.blankPhoneNumber);

    return new FormGroup({
      thumbnail: new FormControl(data.thumbnail, this.imageSizeValidator.bind(this)),
      firstName: new FormControl(data.first_name, [
        Validators.required,
        Validators.pattern(NAME_REGEXP),
        Validators.maxLength(FIRST_NAME_MAX_LENGTH),
      ]),
      middleName: new FormControl(data.middle_name, [
        Validators.pattern(NAME_REGEXP),
        Validators.maxLength(MIDDLE_NAME_MAX_LENGTH),
      ]),
      lastName: new FormControl(data.last_name, [
        Validators.pattern(NAME_REGEXP),
        Validators.maxLength(LAST_NAME_MAX_LENGTH),
      ]),
      gender: new FormControl(data.gender, Validators.required),
      birthDate: new FormControl(data.birth_date, Validators.required),
      telegramUsername: new FormControl(data.telegram_username, Validators.pattern(TELEGRAM_USERNAME_REGEXP)),
      whatsappNumber: new FormControl(data.whatsapp_number, Validators.pattern(WHATSAPP_NUMBER_REGEXP)),
      description: new FormControl(data.description, Validators.maxLength(500)),
      phoneNumbers: new FormArray(phoneNumbers),
    });
  }

  public imageSizeValidator(control: FormControl | AbstractControl): ValidationErrors | null {
    if (!(control.value instanceof File)) return null;
    // Where 1024 ** 2 is amount of bytes compared to 1mb
    if (control.value.size / 1024 ** 2 > PROFILE_IMAGE_SIZE_MB) return {size: true};

    return null;
  }

  public get maxDate(): Date {
    const date = new Date();
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }

  public get thumbnail(): FormControl {
    return this.profileSettingsForm.controls['thumbnail'] as FormControl;
  }

  public get firstName(): FormControl {
    return this.profileSettingsForm.controls['firstName'] as FormControl;
  }

  public get middleName(): FormControl {
    return this.profileSettingsForm.controls['middleName'] as FormControl;
  }

  public get lastName(): FormControl {
    return this.profileSettingsForm.controls['lastName'] as FormControl;
  }

  public get gender(): FormControl {
    return this.profileSettingsForm.controls['gender'] as FormControl;
  }

  public get birthDate(): FormControl {
    return this.profileSettingsForm.controls['birthDate'] as FormControl;
  }

  public get description(): FormControl {
    return this.profileSettingsForm.controls['description'] as FormControl;
  }

  public get telegramUsername(): FormControl {
    return this.profileSettingsForm.controls['telegramUsername'] as FormControl;
  }

  public get whatsappNumber(): FormControl {
    return this.profileSettingsForm.controls['whatsappNumber'] as FormControl;
  }

  public get phoneNumbers(): FormArray {
    return this.profileSettingsForm.controls['phoneNumbers'] as FormArray;
  }

  public get phoneNumbersControls(): Array<FormControl> {
    return this.phoneNumbers.controls as Array<FormControl>;
  }

  public get blankPhoneNumber(): FormControl {
    return new FormControl(null, Validators.pattern(PHONE_NUMBER_REGEXP));
  }
}
