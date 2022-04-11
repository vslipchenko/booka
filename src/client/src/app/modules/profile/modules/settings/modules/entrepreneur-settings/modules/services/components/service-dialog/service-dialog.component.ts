import {ChangeDetectionStrategy, Component} from '@angular/core';
import {HOUR_ITEMS, MINUTE_STEP_ITEMS} from '~app/constants/date';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-service-dialog',
  templateUrl: './service-dialog.component.html',
  styleUrls: ['./service-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServiceDialogComponent {
  public readonly hourItems = HOUR_ITEMS;
  public readonly minuteStepItems = MINUTE_STEP_ITEMS;
  public readonly form = this.serviceDialogFormGroup;

  public get name(): FormControl {
    return this.form.controls['name'] as FormControl;
  }

  public get description(): FormControl {
    return this.form.controls['description'] as FormControl;
  }

  public get clientCount(): FormControl {
    return this.form.controls['clientCount'] as FormControl;
  }

  public get hours(): FormControl {
    return this.form.controls['hours'] as FormControl;
  }

  public get minutes(): FormControl {
    return this.form.controls['minutes'] as FormControl;
  }

  public get priceType(): FormControl {
    return this.form.controls['priceType'] as FormControl;
  }

  public get price(): FormControl {
    return this.form.controls['price'] as FormControl;
  }

  public get prepay(): FormControl {
    return this.form.controls['prepay'] as FormControl;
  }

  private get serviceDialogFormGroup(): FormGroup {
    return new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl(''),
      clientCount: new FormControl(1, [Validators.min(1), Validators.max(30000)]),
      hours: new FormControl(''),
      minutes: new FormControl(''),
      priceType: new FormControl(''),
      price_1: new FormControl(''),
      price_2: new FormControl(''),
      prepay: new FormControl(''),
    });
  }
}
