import {environment} from '../environments';
import {Translations} from '../typings/i18n.types';

export const EMAIL_FROM = `"Booka" <${environment.MAIL_USERNAME}>`;
export const EMAIL_CONFIRMATION_SUBJECT: Translations = {
  ru: 'Регистрация аккаунта',
  uk: 'Реєстрація акаунту',
};
export const EMAIL_CONFIRMATION_HTML: Translations = {
  ru: 'Для активации аккаунта, пожалуйста, перейдите по <a href="//localhost:4200/#/confirmation?key={{confirmationKey}}">ссылке</a>',
  uk: 'Для активації акаунту, будь ласка, перейдіть за <a href="//localhost:4200/#/confirmation?key={{confirmationKey}}">посиланням</a>',
};
