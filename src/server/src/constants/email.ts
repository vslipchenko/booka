import {environment} from '../environments';
import {Translations} from '../typings/i18n.types';

export const EMAIL_FROM = `"Booka" <${environment.MAIL_USERNAME}>`;
export const EMAIL_CONFIRMATION_SUBJECT: Translations = {
  ru: 'Регистрация аккаунта',
  uk: 'Реєстрація акаунту',
};
export const EMAIL_CONFIRMATION_HTML: Translations = {
  ru: 'Для активации аккаунта, пожалуйста, перейдите по <a href="{{appOrigin}}/#/confirmation?key={{confirmationKey}}">ссылке</a>.',
  uk: 'Для активації акаунту, будь ласка, перейдіть за <a href="{{appOrigin}}/#/confirmation?key={{confirmationKey}}">посиланням</a>.',
};

export const PASSWORD_RECOVERY_SUBJECT: Translations = {
  ru: 'Восстановление пароля',
  uk: 'Відновлення паролю',
};
export const PASSWORD_RECOVERY_HTML: Translations = {
  ru: 'Для восстановления пароля, пожалуйста, перейдите по <a href="{{appOrigin}}/#/reset?key={{resetKey}}">ссылке</a> (действительна в течение 30 минут). Если вы не совершали никаких действий по восстановлению пароля, проигнорируйте данное сообщение.',
  uk: 'Для відновлення паролю, будь ласка, перейдіть за <a href="{{appOrigin}}/#/reset?key={{resetKey}}">посиланням</a> (дійсна протягом 30 хвилин). Якщо ви не робили жодних дій стосовно відновлення пароля, проігноруйте це повідомлення.',
};

export const EMPLOYER_CONFIRMATION_SUBJECT: Translations = {
  ru: 'Подтверждение места работы',
  uk: 'Підтвердження місця роботи',
};
export const EMPLOYER_CONFIRMATION_HTML: Translations = {
  ru: 'Для подтверждения места работы, пожалуйста, перейдите по <a href="{{appOrigin}}/#/profile/employer/confirmation?key={{confirmationKey}}">ссылке</a>.',
  uk: 'Для підтвердження місця роботи, будь ласка, перейдіть за <a href="{{appOrigin}}/#/profile/employer/confirmation?key={{confirmationKey}}">посиланням</a>.',
};
