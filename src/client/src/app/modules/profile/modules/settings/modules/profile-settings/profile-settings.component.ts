import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Store} from '@ngxs/store';
import {ProfileSelectors} from '~app/modules/profile/store/profile.selectors';
import {skip, Subject, take, takeUntil} from 'rxjs';
import {Destroyable} from '~app/typings/component.interfaces';
import {AccountTariffs} from '~app/typings/account.enums';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileSettingsComponent implements Destroyable {
  public readonly destroy$ = new Subject<void>();
  public readonly accountTariff$ = this.store.select(ProfileSelectors.accountTariff).pipe(skip(1), take(1));

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
      firstName: new FormControl(null, Validators.required),
      middleName: new FormControl(null),
      lastName: new FormControl(null),
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

  public get firstName(): FormControl {
    return this.profileSettingsForm.controls['firstName'] as FormControl;
  }

  public get middleName(): FormControl {
    return this.profileSettingsForm.controls['middleName'] as FormControl;
  }

  public get lastName(): FormControl {
    return this.profileSettingsForm.controls['lastName'] as FormControl;
  }
}
