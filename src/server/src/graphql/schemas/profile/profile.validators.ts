import Joi, {SchemaMap} from 'joi';
import {
  FIRST_NAME_MAX_LENGTH,
  LAST_NAME_MAX_LENGTH,
  MIDDLE_NAME_MAX_LENGTH,
  NAME_REGEXP,
  PHONE_NUMBER_REGEXP,
  PROFILE_THUMBNAIL_ORIGIN_REGEXP,
  TELEGRAM_USERNAME_REGEXP,
  WHATSAPP_NUMBER_REGEXP,
} from '../../../constants/validation';
import {getNumericEnumValues} from '../../../utilities/enum';
import {Gender} from '../../../typings/user.enums';

const date = new Date();
export const thumbnailLinkValidator = Joi.string().pattern(PROFILE_THUMBNAIL_ORIGIN_REGEXP);
const phoneNumberValidator = Joi.string().pattern(PHONE_NUMBER_REGEXP);
const baseAccountDataValidatorSchema: SchemaMap = {
  thumbnail: thumbnailLinkValidator,
  phone_number_1: phoneNumberValidator.required(),
  phone_number_2: phoneNumberValidator,
  phone_number_3: phoneNumberValidator,
};

export const clientAccountDataValidator = Joi.object({
  ...baseAccountDataValidatorSchema,
  first_name: Joi.string().pattern(NAME_REGEXP).max(FIRST_NAME_MAX_LENGTH).required(),
  middle_name: Joi.string().pattern(NAME_REGEXP).max(MIDDLE_NAME_MAX_LENGTH),
  last_name: Joi.string().pattern(NAME_REGEXP).max(LAST_NAME_MAX_LENGTH),
  gender: Joi.number()
    .valid(...getNumericEnumValues(Gender))
    .required(),
  birth_date: Joi.date().max(new Date(date.getFullYear(), date.getMonth(), date.getDate())).required(),
  whatsapp_number: Joi.string().pattern(WHATSAPP_NUMBER_REGEXP),
  telegram_username: Joi.string().pattern(TELEGRAM_USERNAME_REGEXP),
});

export const entrepreneurAccountDataValidator = Joi.object({
  ...baseAccountDataValidatorSchema,
});

export const businessAccountDataValidator = Joi.object({
  ...baseAccountDataValidatorSchema,
});
