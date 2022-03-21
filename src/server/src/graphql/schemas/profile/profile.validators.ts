import Joi from 'joi';
import {
  CLIENT_DESCRIPTION_MAX_LENGTH,
  ENTREPRENEUR_DESCRIPTION_MAX_LENGTH,
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
const descriptionValidator = Joi.string().allow(null);

const baseAccountDataValidatorSchema = {
  phone_number_1: phoneNumberValidator,
  phone_number_2: phoneNumberValidator.allow(null),
  phone_number_3: phoneNumberValidator.allow(null),
};

const clientAccountDataValidatorSchema = {
  ...baseAccountDataValidatorSchema,
  first_name: Joi.string().pattern(NAME_REGEXP).max(FIRST_NAME_MAX_LENGTH).required(),
  middle_name: Joi.string().pattern(NAME_REGEXP).max(MIDDLE_NAME_MAX_LENGTH),
  last_name: Joi.string().pattern(NAME_REGEXP).max(LAST_NAME_MAX_LENGTH),
  gender: Joi.number()
    .valid(...getNumericEnumValues(Gender))
    .required(),
  birth_date: Joi.date().max(new Date(date.getFullYear(), date.getMonth(), date.getDate())).required(),
  whatsapp_number: Joi.string().pattern(WHATSAPP_NUMBER_REGEXP).allow(null),
  telegram_username: Joi.string().pattern(TELEGRAM_USERNAME_REGEXP).allow(null),
};

export const clientAccountDataValidator = Joi.object({
  ...baseAccountDataValidatorSchema,
  ...clientAccountDataValidatorSchema,
  middle_name: clientAccountDataValidatorSchema.middle_name.allow(null),
  last_name: clientAccountDataValidatorSchema.last_name.allow(null),
  description: descriptionValidator.max(CLIENT_DESCRIPTION_MAX_LENGTH),
});

export const entrepreneurAccountDataValidator = Joi.object({
  ...baseAccountDataValidatorSchema,
  ...clientAccountDataValidatorSchema,
  middle_name: clientAccountDataValidatorSchema.middle_name.required(),
  last_name: clientAccountDataValidatorSchema.last_name.required(),
  description: descriptionValidator.max(ENTREPRENEUR_DESCRIPTION_MAX_LENGTH),
});

export const businessAccountDataValidator = Joi.object({
  ...baseAccountDataValidatorSchema,
});
