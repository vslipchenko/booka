import {ChangeDetectionStrategy, Component} from '@angular/core';
import {AccountData} from '~app/typings/account.types';
import {FormArray, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {
  FACEBOOK_USERNAME_REGEXP,
  FIRST_NAME_MAX_LENGTH,
  INSTAGRAM_USERNAME_REGEXP,
  LAST_NAME_MAX_LENGTH,
  MIDDLE_NAME_MAX_LENGTH,
  NAME_REGEXP,
  PAID_ACCOUNT_DESCRIPTION_MAX_LENGTH,
  PHONE_NUMBER_REGEXP,
  TELEGRAM_USERNAME_REGEXP,
  TWITTER_USERNAME_REGEXP,
  WEBSITE_MAX_LENGTH,
} from '~app/constants/validation';
import {INDIVIDUAL_PROFILE_IMAGE_PLACEHOLDER} from '~app/constants/images';
import {Destroyable} from '~app/typings/component.interfaces';
import {finalize, Subject, takeUntil} from 'rxjs';
import {Store} from '@ngxs/store';
import {ClientAccountData} from '~app/typings/account.interfaces';
import {cloneDeep} from 'lodash-es';
import {ProfileSelectors} from '~app/modules/profile/store/profile.selectors';
import {SelectItem} from '~app/typings/select.interfaces';
import {Gender} from '~app/typings/user.enums';
import {SnackbarService} from '~app/shared/services/snackbar/snackbar.service';
import {EditAccountData, SetLoading} from '~app/modules/profile/store/profile.actions';
import {AccountTariffs} from '~app/typings/account.enums';
import {imageSizeValidator, urlValidator} from '~app/shared/utilities/validators';

@Component({
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileSettingsComponent implements Destroyable {
  public readonly destroy$ = new Subject<void>();
  public readonly imagePlaceholder = INDIVIDUAL_PROFILE_IMAGE_PLACEHOLDER;
  public readonly genderItems: Array<SelectItem> = [
    {title: 'Мужской', value: Gender.Male},
    {title: 'Женский', value: Gender.Female},
    {title: 'Другой', value: Gender.Other},
  ];

  private readonly profileSettingsForm: FormGroup;

  public constructor(private readonly store: Store, private readonly snackbarService: SnackbarService) {
    this.profileSettingsForm = this.profileSettingsFormGroup(this.store.selectSnapshot(ProfileSelectors.accountData));
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public save(): void {
    this.profileSettingsForm.markAllAsTouched();
    this.gender.updateValueAndValidity();

    if (!(this.profileSettingsForm.valid && this.profileSettingsForm.dirty)) return;

    this.store.dispatch(new SetLoading(true));

    this.store
      .dispatch(new EditAccountData(this.accountData))
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => this.store.dispatch(new SetLoading(false))),
      )
      .subscribe(
        () => this.profileSettingsForm.markAsPristine(),
        () => this.snackbarService.open('Что-то пошло не так. Пожалуйста, повторите попытку позже.', 'OK'),
      );
  }

  public addPhoneNumber(): void {
    this.phoneNumbers.push(this.phoneNumber());
  }

  public profileSettingsFormGroup(data: AccountData): FormGroup {
    const phoneNumbers = [
      new FormControl(data.phone_number_1, [Validators.required, Validators.pattern(PHONE_NUMBER_REGEXP)]),
    ];

    if (data.phone_number_2) phoneNumbers.push(this.phoneNumber(data.phone_number_2));
    if (data.phone_number_3) phoneNumbers.push(this.phoneNumber(data.phone_number_3));

    return new FormGroup({
      thumbnail: new FormControl(data.thumbnail, imageSizeValidator),
      first_name: new FormControl(data.first_name, [
        Validators.required,
        Validators.pattern(NAME_REGEXP),
        Validators.maxLength(FIRST_NAME_MAX_LENGTH),
      ]),
      middle_name: new FormControl(data.middle_name, [
        Validators.required,
        Validators.pattern(NAME_REGEXP),
        Validators.maxLength(MIDDLE_NAME_MAX_LENGTH),
      ]),
      last_name: new FormControl(data.last_name, [
        Validators.required,
        Validators.pattern(NAME_REGEXP),
        Validators.maxLength(LAST_NAME_MAX_LENGTH),
      ]),
      gender: new FormControl(data.gender, Validators.min(AccountTariffs.Client)),
      birth_date: new FormControl(data.birth_date && new Date(Number(data.birth_date)), Validators.required),
      description: new FormControl(data.description, Validators.maxLength(PAID_ACCOUNT_DESCRIPTION_MAX_LENGTH)),
      phoneNumbers: new FormArray(phoneNumbers),
      whatsapp_number: new FormControl(data.whatsapp_number, Validators.pattern(PHONE_NUMBER_REGEXP)),
      viber_number: new FormControl(data.viber_number, Validators.pattern(PHONE_NUMBER_REGEXP)),
      telegram_username: new FormControl(data.telegram_username, Validators.pattern(TELEGRAM_USERNAME_REGEXP)),
      website: new FormControl(data.website, [Validators.maxLength(WEBSITE_MAX_LENGTH), urlValidator]),
      instagram_username: new FormControl(data.instagram_username, Validators.pattern(INSTAGRAM_USERNAME_REGEXP)),
      facebook_username: new FormControl(data.facebook_username, Validators.pattern(FACEBOOK_USERNAME_REGEXP)),
      twitter_username: new FormControl(data.twitter_username, Validators.pattern(TWITTER_USERNAME_REGEXP)),
    });
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

  public descriptionErrorMessage(errors: ValidationErrors | null): string | void {
    if (!errors) return;

    if ('maxlength' in errors) return `Максимум ${PAID_ACCOUNT_DESCRIPTION_MAX_LENGTH} знаков`;
  }

  public patternErrorMessage(errors: ValidationErrors | null): string | void {
    if (!errors) return;

    if ('pattern' in errors) return 'Неверный формат';
  }

  public websiteErrorMessage(errors: ValidationErrors | null): string | void {
    if (!errors) return;

    if ('url' in errors) return 'Неверный формат. Пример: https://example.com';

    if ('maxlength' in errors)
      return `Максимум ${WEBSITE_MAX_LENGTH} знаков. Пожалуйста, воспользуйтесь сокращателем ссылок`;
  }

  public phoneNumberErrorMessage(errors: ValidationErrors | null): string | void {
    if (!errors) return;

    if ('pattern' in errors) return 'Неверный формат. Пример: +380123456789';

    return this.errorMessage(errors);
  }

  public phoneNumber(value?: string): FormControl {
    return new FormControl(value, Validators.pattern(PHONE_NUMBER_REGEXP));
  }

  public get maxDate(): Date {
    const date = new Date();
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }

  public get thumbnail(): FormControl {
    return this.profileSettingsForm.controls['thumbnail'] as FormControl;
  }

  public get firstName(): FormControl {
    return this.profileSettingsForm.controls['first_name'] as FormControl;
  }

  public get middleName(): FormControl {
    return this.profileSettingsForm.controls['middle_name'] as FormControl;
  }

  public get lastName(): FormControl {
    return this.profileSettingsForm.controls['last_name'] as FormControl;
  }

  public get gender(): FormControl {
    return this.profileSettingsForm.controls['gender'] as FormControl;
  }

  public get birthDate(): FormControl {
    return this.profileSettingsForm.controls['birth_date'] as FormControl;
  }

  public get description(): FormControl {
    return this.profileSettingsForm.controls['description'] as FormControl;
  }

  public get phoneNumbers(): FormArray {
    return this.profileSettingsForm.controls['phoneNumbers'] as FormArray;
  }

  public get whatsappNumber(): FormControl {
    return this.profileSettingsForm.controls['whatsapp_number'] as FormControl;
  }

  public get viberNumber(): FormControl {
    return this.profileSettingsForm.controls['viber_number'] as FormControl;
  }

  public get telegramUsername(): FormControl {
    return this.profileSettingsForm.controls['telegram_username'] as FormControl;
  }

  public get website(): FormControl {
    return this.profileSettingsForm.controls['website'] as FormControl;
  }

  public get instagramUsername(): FormControl {
    return this.profileSettingsForm.controls['instagram_username'] as FormControl;
  }

  public get facebookUsername(): FormControl {
    return this.profileSettingsForm.controls['facebook_username'] as FormControl;
  }

  public get twitterUsername(): FormControl {
    return this.profileSettingsForm.controls['twitter_username'] as FormControl;
  }

  public get phoneNumbersControls(): Array<FormControl> {
    return this.phoneNumbers.controls as Array<FormControl>;
  }

  private get accountData(): ClientAccountData {
    const accountData = cloneDeep(this.profileSettingsForm.value);

    accountData.phoneNumbers.forEach((phoneNumber: string, index: number) => {
      accountData[`phone_number_${index + 1}`] = phoneNumber;
    });

    delete accountData.thumbnail;
    delete accountData.phoneNumbers;

    return accountData;
  }
}
