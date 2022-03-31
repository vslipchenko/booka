import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormArray, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {BUSINESS_PROFILE_IMAGE_PLACEHOLDER} from '~app/constants/images';
import {Store} from '@ngxs/store';
import {SnackbarService} from '~app/shared/services/snackbar/snackbar.service';
import {ProfileSelectors} from '~app/modules/profile/store/profile.selectors';
import {Destroyable} from '~app/typings/component.interfaces';
import {Subject} from 'rxjs';
import {AccountData} from '~app/typings/account.types';
import {
  BUSINESS_NAME_MAX_LENGTH,
  FACEBOOK_USERNAME_REGEXP,
  GOOGLE_MAPS_LINK_REGEXP,
  INSTAGRAM_USERNAME_REGEXP,
  PAID_ACCOUNT_DESCRIPTION_MAX_LENGTH,
  PHONE_NUMBER_REGEXP,
  TELEGRAM_USERNAME_REGEXP,
  TWITTER_USERNAME_REGEXP,
  WEBSITE_MAX_LENGTH,
} from '~app/constants/validation';
import {imageSizeValidator, urlValidator} from '~app/shared/utilities/validators';
import {TranslocoService} from '@ngneat/transloco';
import {Language} from '~app/typings/i18n.types';
import {BusinessCategory} from '~app/typings/business-category.enums';

@Component({
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileSettingsComponent implements Destroyable {
  public readonly destroy$ = new Subject<void>();
  public readonly imagePlaceholder = BUSINESS_PROFILE_IMAGE_PLACEHOLDER;

  private readonly profileSettingsForm: FormGroup;

  public constructor(
    private readonly store: Store,
    private readonly snackbarService: SnackbarService,
    private readonly translocoService: TranslocoService,
  ) {
    this.profileSettingsForm = this.profileSettingsFormGroup(this.store.selectSnapshot(ProfileSelectors.accountData));
  }

  public get thumbnail(): FormControl {
    return this.profileSettingsForm.controls['thumbnail'] as FormControl;
  }

  public get name(): FormControl {
    return this.profileSettingsForm.controls['name'] as FormControl;
  }

  public get businessCategory(): FormControl {
    return this.profileSettingsForm.controls['business_category'] as FormControl;
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

  public get offsiteWork(): FormControl {
    return this.profileSettingsForm.controls['offsite_work'] as FormControl;
  }

  public get region(): FormControl {
    return this.profileSettingsForm.controls['region'] as FormControl;
  }

  public get city(): FormControl {
    return this.profileSettingsForm.controls['city'] as FormControl;
  }

  public get googleMaps(): FormControl {
    return this.profileSettingsForm.controls['google_maps'] as FormControl;
  }

  public get phoneNumbersControls(): Array<FormControl> {
    return this.phoneNumbers.controls as Array<FormControl>;
  }

  public get activeLanguage(): Language {
    return this.translocoService.getActiveLang() as Language;
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public save(): void {
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
      name: new FormControl(data.name, [Validators.required, Validators.maxLength(BUSINESS_NAME_MAX_LENGTH)]),
      business_category: new FormControl(data.business_category, Validators.min(BusinessCategory.Other)),
      description: new FormControl(data.description, Validators.maxLength(PAID_ACCOUNT_DESCRIPTION_MAX_LENGTH)),
      phoneNumbers: new FormArray(phoneNumbers),
      whatsapp_number: new FormControl(data.whatsapp_number, Validators.pattern(PHONE_NUMBER_REGEXP)),
      viber_number: new FormControl(data.viber_number, Validators.pattern(PHONE_NUMBER_REGEXP)),
      telegram_username: new FormControl(data.telegram_username, Validators.pattern(TELEGRAM_USERNAME_REGEXP)),
      website: new FormControl(data.website, [Validators.maxLength(WEBSITE_MAX_LENGTH), urlValidator]),
      instagram_username: new FormControl(data.instagram_username, Validators.pattern(INSTAGRAM_USERNAME_REGEXP)),
      facebook_username: new FormControl(data.facebook_username, Validators.pattern(FACEBOOK_USERNAME_REGEXP)),
      twitter_username: new FormControl(data.twitter_username, Validators.pattern(TWITTER_USERNAME_REGEXP)),
      offsite_work: new FormControl(data.offsite_work),
      region: new FormControl(data.region),
      city: new FormControl(data.city),
      google_maps: new FormControl(data.google_maps, Validators.pattern(GOOGLE_MAPS_LINK_REGEXP)),
    });
  }

  public phoneNumber(value?: string): FormControl {
    return new FormControl(value, Validators.pattern(PHONE_NUMBER_REGEXP));
  }

  public errorMessage(errors: ValidationErrors | null): string | void {
    if (!errors) return;

    return 'Обязательное поле';
  }

  public nameErrorMessage(errors: ValidationErrors | null): string | void {
    if (!errors) return;

    if ('maxlength' in errors) return `Максимум ${BUSINESS_NAME_MAX_LENGTH} знаков`;

    return this.errorMessage(errors);
  }

  public phoneNumberErrorMessage(errors: ValidationErrors | null): string | void {
    if (!errors) return;

    if ('pattern' in errors) return 'Неверный формат. Пример: +380123456789';

    return this.errorMessage(errors);
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
}
