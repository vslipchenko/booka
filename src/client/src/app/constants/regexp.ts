export const PASSWORD_MIN_LENGTH = 8;
export const PASSWORD_MAX_LENGTH = 50;
// At least 1 letter & 1 number; includes all special characters
export const PASSWORD_REGEXP = RegExp(
  '^(?=.*[0-9])(?=.*[A-Za-z])[0-9A-Za-z!"#$%&\'()\\[\\]*+,./\\\\:;<=>?@^_`{|}~-]*$',
);
