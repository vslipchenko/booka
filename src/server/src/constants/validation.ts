// See https://github.com/angular/angular/blob/master/packages/forms/src/validators.ts
export const EMAIL_REGEXP =
  /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

export const PASSWORD_MIN_LENGTH = 8;
export const PASSWORD_MAX_LENGTH = 50;
// At least 1 letter & 1 number; includes all special characters
export const PASSWORD_REGEXP = RegExp(
  '^(?=.*[0-9])(?=.*[A-Za-z])[0-9A-Za-z!"#$%&\'()\\[\\]*+,./\\\\:;<=>?@^_`{|}~-]*$',
);

// See https://github.com/uuidjs/uuid/blob/main/src/regex.js
export const UUID_REGEXP =
  /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;

export const PROFILE_THUMBNAIL_ORIGIN_REGEXP = /^https:\/\/i\.ibb\.co\//;
export const FIRST_NAME_MAX_LENGTH = 50;
export const LAST_NAME_MAX_LENGTH = 50;
export const MIDDLE_NAME_MAX_LENGTH = 50;
export const CLIENT_DESCRIPTION_MAX_LENGTH = 250;
export const ENTREPRENEUR_DESCRIPTION_MAX_LENGTH = 500;

export const NAME_REGEXP = /^[A-Za-zА-Яа-яҐЁЄІЇіёєїґ']*$/; // En, Ru, Uk, apostrophe
export const PHONE_NUMBER_REGEXP = /^[0-9]{9}$/;
export const TELEGRAM_USERNAME_REGEXP = /^[a-zA-Z0-9_]{5,32}$/;

export const FACEBOOK_USERNAME_REGEXP = /^(?=.{5,50}$)[a-zA-Z0-9]+((\.)?[a-zA-Z0-9])+$/;
export const TWITTER_USERNAME_REGEXP = /^[a-zA-Z0-9_]{5,15}$/;
export const INSTAGRAM_USERNAME_REGEXP = /^(?![0-9]*$)(?!.*\.\.)(?!.*\.$)[^\W][\w.]{3,30}$/;
export const WEBSITE_MAX_LENGTH = 500;
