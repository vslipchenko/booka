import Joi from 'joi';
import {
  CLIENT_DESCRIPTION_MAX_LENGTH,
  PAID_ACCOUNT_DESCRIPTION_MAX_LENGTH,
  FACEBOOK_USERNAME_REGEXP,
  FIRST_NAME_MAX_LENGTH,
  INSTAGRAM_USERNAME_REGEXP,
  LAST_NAME_MAX_LENGTH,
  MIDDLE_NAME_MAX_LENGTH,
  NAME_REGEXP,
  PHONE_NUMBER_REGEXP,
  PROFILE_THUMBNAIL_ORIGIN_REGEXP,
  TELEGRAM_USERNAME_REGEXP,
  TWITTER_USERNAME_REGEXP,
  WEBSITE_MAX_LENGTH,
  BUSINESS_NAME_MAX_LENGTH,
  GOOGLE_MAPS_LINK_REGEXP,
} from '../../../constants/validation';
import {getNumericEnumValues} from '../../../utilities/enum';
import {Gender} from '../../../typings/user.enums';
import {urlValidator} from '../../../utilities/validators';
import {BusinessCategory} from '../../../typings/business-category.enums';
import {City, Region} from '../../../typings/toponymy.enums';

const date = new Date();
export const thumbnailLinkValidator = Joi.string().pattern(PROFILE_THUMBNAIL_ORIGIN_REGEXP);
const phoneNumberValidator = Joi.string().pattern(PHONE_NUMBER_REGEXP);
const descriptionValidator = Joi.string().allow(null).allow('');

const baseAccountDataValidatorSchema = {
  phone_number_1: phoneNumberValidator,
  phone_number_2: phoneNumberValidator.allow(null),
  phone_number_3: phoneNumberValidator.allow(null),
  viber_number: Joi.string().pattern(PHONE_NUMBER_REGEXP).allow(null),
  whatsapp_number: Joi.string().pattern(PHONE_NUMBER_REGEXP).allow(null),
  telegram_username: Joi.string().pattern(TELEGRAM_USERNAME_REGEXP).allow(null).allow(''),
};

const paidAccountDataValidatorSchema = {
  business_category: Joi.number()
    .valid(...getNumericEnumValues(BusinessCategory))
    .required(),
  description: descriptionValidator.max(PAID_ACCOUNT_DESCRIPTION_MAX_LENGTH),
  website: Joi.string().max(WEBSITE_MAX_LENGTH).custom(urlValidator).allow(null).allow(''),
  instagram_username: Joi.string().pattern(INSTAGRAM_USERNAME_REGEXP).allow(null).allow(''),
  facebook_username: Joi.string().pattern(FACEBOOK_USERNAME_REGEXP).allow(null).allow(''),
  twitter_username: Joi.string().pattern(TWITTER_USERNAME_REGEXP).allow(null).allow(''),
  offsite_work: Joi.boolean().allow(null),
  region: Joi.number()
    .valid(...getNumericEnumValues(Region))
    .allow(null),
  city: Joi.number()
    .valid(...getNumericEnumValues(City))
    .allow(null),
  google_maps: Joi.string().pattern(GOOGLE_MAPS_LINK_REGEXP).allow(null).allow(''),
};

const clientAccountDataValidatorSchema = {
  ...baseAccountDataValidatorSchema,
  first_name: Joi.string().pattern(NAME_REGEXP).max(FIRST_NAME_MAX_LENGTH).required(),
  middle_name: Joi.string().pattern(NAME_REGEXP).max(MIDDLE_NAME_MAX_LENGTH).allow(null).allow(''),
  last_name: Joi.string().pattern(NAME_REGEXP).max(LAST_NAME_MAX_LENGTH),
  gender: Joi.number()
    .valid(...getNumericEnumValues(Gender))
    .required(),
  birth_date: Joi.date().max(new Date(date.getFullYear(), date.getMonth(), date.getDate())).required(),
};

export const clientAccountDataValidator = Joi.object({
  ...baseAccountDataValidatorSchema,
  ...clientAccountDataValidatorSchema,
  last_name: clientAccountDataValidatorSchema.last_name.allow(null).allow(''),
  description: descriptionValidator.max(CLIENT_DESCRIPTION_MAX_LENGTH),
});

export const entrepreneurAccountDataValidator = Joi.object({
  ...baseAccountDataValidatorSchema,
  ...clientAccountDataValidatorSchema,
  ...paidAccountDataValidatorSchema,
  last_name: clientAccountDataValidatorSchema.last_name.required(),
});

export const businessAccountDataValidator = Joi.object({
  ...baseAccountDataValidatorSchema,
  ...paidAccountDataValidatorSchema,
  name: Joi.string().max(BUSINESS_NAME_MAX_LENGTH).required(),
});
