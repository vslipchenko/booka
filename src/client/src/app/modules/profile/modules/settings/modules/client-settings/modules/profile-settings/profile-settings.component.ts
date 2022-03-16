import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormArray, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {Store} from '@ngxs/store';
import {ProfileSelectors} from '~app/modules/profile/store/profile.selectors';
import {filter, Subject, take, takeUntil} from 'rxjs';
import {Destroyable} from '~app/typings/component.interfaces';
import {AccountTariffs} from '~app/typings/account.enums';
import {SelectItem} from '~app/typings/select.interfaces';
import {Gender} from '~app/typings/user.enums';
import {
  FIRST_NAME_MAX_LENGTH,
  LAST_NAME_MAX_LENGTH,
  MIDDLE_NAME_MAX_LENGTH,
  NAME_REGEXP,
  PHONE_NUMBER_REGEXP,
  TELEGRAM_USERNAME_REGEXP,
  WHATS_APP_NUMBER_REGEXP,
} from '~app/constants/regexp';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileSettingsComponent implements Destroyable {
  public readonly destroy$ = new Subject<void>();
  public readonly accountTariff$ = this.store.select(ProfileSelectors.accountTariff).pipe(
    filter((tariff) => tariff !== AccountTariffs.None),
    take(1),
  );
  public readonly genderItems: Array<SelectItem> = [
    {title: 'Мужчина', value: Gender.Male},
    {title: 'Женщина', value: Gender.Female},
    {title: 'Другой', value: Gender.Other},
  ];

  private profileSettingsForm = new FormGroup({});

  public constructor(private readonly store: Store) {
    this.accountTariff$.pipe(takeUntil(this.destroy$)).subscribe((tariff) => {
      if (tariff === AccountTariffs.Client) {
        this.profileSettingsForm = this.clientProfileSettingsFormGroup;
        return;
      }

      if (tariff === AccountTariffs.Entrepreneur) {
        this.profileSettingsForm = this.entrepreneurProfileSettingsFormGroup;
        return;
      }

      // Business
      this.profileSettingsForm = this.businessProfileSettingsFormGroup;
    });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public addPhoneNumber(): void {
    this.phoneNumbers.push(new FormControl(null, Validators.pattern(PHONE_NUMBER_REGEXP)));
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

  public isClientTariff(tariff: AccountTariffs): boolean {
    return tariff === AccountTariffs.Client;
  }

  public isEntrepreneurTariff(tariff: AccountTariffs): boolean {
    return tariff === AccountTariffs.Entrepreneur;
  }

  public isBusinessTariff(tariff: AccountTariffs): boolean {
    return tariff === AccountTariffs.Business;
  }

  public get clientProfileSettingsFormGroup(): FormGroup {
    return new FormGroup({
      firstName: new FormControl(null, [
        Validators.required,
        Validators.pattern(NAME_REGEXP),
        Validators.maxLength(FIRST_NAME_MAX_LENGTH),
      ]),
      middleName: new FormControl(null, [
        Validators.pattern(NAME_REGEXP),
        Validators.maxLength(MIDDLE_NAME_MAX_LENGTH),
      ]),
      lastName: new FormControl(null, [Validators.pattern(NAME_REGEXP), Validators.maxLength(LAST_NAME_MAX_LENGTH)]),
      gender: new FormControl(null, Validators.required),
      birthDate: new FormControl(null, Validators.required),
      telegram: new FormControl(null, Validators.pattern(TELEGRAM_USERNAME_REGEXP)),
      whatsApp: new FormControl(null, Validators.pattern(WHATS_APP_NUMBER_REGEXP)),
      description: new FormControl(null, Validators.maxLength(500)),
      phoneNumbers: new FormArray([
        new FormControl(null, [Validators.required, Validators.pattern(PHONE_NUMBER_REGEXP)]),
      ]),
    });
  }

  public get entrepreneurProfileSettingsFormGroup(): FormGroup {
    return new FormGroup({
      firstName: new FormControl(null, Validators.required),
      middleName: new FormControl(null),
      lastName: new FormControl(null),
    });
  }

  public get businessProfileSettingsFormGroup(): FormGroup {
    return new FormGroup({});
  }

  public get maxDate(): Date {
    const date = new Date();
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
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

  public get telegram(): FormControl {
    return this.profileSettingsForm.controls['telegram'] as FormControl;
  }

  public get whatsApp(): FormControl {
    return this.profileSettingsForm.controls['whatsApp'] as FormControl;
  }

  public get phoneNumbers(): FormArray {
    return this.profileSettingsForm.controls['phoneNumbers'] as FormArray;
  }

  public get phoneNumbersControls(): Array<FormControl> {
    return this.phoneNumbers.controls as Array<FormControl>;
  }
}
