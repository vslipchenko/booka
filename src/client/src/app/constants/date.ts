import {SelectItem} from '~app/typings/select.interfaces';
import {Hour, MinuteStep} from '~app/typings/date.enums';

export const PAID_PLAN_DAY_DURATION = 28; // 4 weeks
// export const TRIAL_PERIOD_DAY_DURATION = 7;
export const HOUR_ITEMS: Array<SelectItem> = [
  {
    title: Hour.Zero.toString(),
    value: Hour.Zero,
  },
  {
    title: Hour.One.toString(),
    value: Hour.One,
  },
  {
    title: Hour.Two.toString(),
    value: Hour.Two,
  },
  {
    title: Hour.Three.toString(),
    value: Hour.Three,
  },
  {
    title: Hour.Four.toString(),
    value: Hour.Four,
  },
  {
    title: Hour.Five.toString(),
    value: Hour.Five,
  },
  {
    title: Hour.Six.toString(),
    value: Hour.Six,
  },
  {
    title: Hour.Seven.toString(),
    value: Hour.Seven,
  },
  {
    title: Hour.Eight.toString(),
    value: Hour.Eight,
  },
  {
    title: Hour.Nine.toString(),
    value: Hour.Nine,
  },
  {
    title: Hour.Ten.toString(),
    value: Hour.Ten,
  },
  {
    title: Hour.Eleven.toString(),
    value: Hour.Eleven,
  },
  {
    title: Hour.Twelve.toString(),
    value: Hour.Twelve,
  },
  {
    title: Hour.Thirteen.toString(),
    value: Hour.Thirteen,
  },
  {
    title: Hour.Fourteen.toString(),
    value: Hour.Fourteen,
  },
  {
    title: Hour.Fifteen.toString(),
    value: Hour.Fifteen,
  },
  {
    title: Hour.Sixteen.toString(),
    value: Hour.Sixteen,
  },
  {
    title: Hour.Seventeen.toString(),
    value: Hour.Seventeen,
  },
  {
    title: Hour.Eighteen.toString(),
    value: Hour.Eighteen,
  },
  {
    title: Hour.Nineteen.toString(),
    value: Hour.Nineteen,
  },
  {
    title: Hour.Twenty.toString(),
    value: Hour.Twenty,
  },
  {
    title: Hour.TwentyOne.toString(),
    value: Hour.TwentyOne,
  },
  {
    title: Hour.TwentyTwo.toString(),
    value: Hour.TwentyTwo,
  },
  {
    title: Hour.TwentyThree.toString(),
    value: Hour.TwentyThree,
  },
  {
    title: Hour.TwentyFour.toString(),
    value: Hour.TwentyFour,
  },
];

export const MINUTE_STEP_ITEMS: Array<SelectItem> = [
  {
    title: MinuteStep.Zero.toString(),
    value: MinuteStep.Zero,
  },
  {
    title: MinuteStep.Ten.toString(),
    value: MinuteStep.Ten,
  },
  {
    title: MinuteStep.Twenty.toString(),
    value: MinuteStep.Twenty,
  },
  {
    title: MinuteStep.Thirty.toString(),
    value: MinuteStep.Thirty,
  },
  {
    title: MinuteStep.Forty.toString(),
    value: MinuteStep.Forty,
  },
  {
    title: MinuteStep.Fifty.toString(),
    value: MinuteStep.Fifty,
  },
];
