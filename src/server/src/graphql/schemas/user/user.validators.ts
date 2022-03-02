import Joi from 'joi';
import {getNumericEnumValues} from '../../../utilities/enum';
import {AccountTypes} from '../../../typings/user.enums';
import {PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH, PASSWORD_REGEXP, UUID_REGEXP} from '../../../constants/regexp';
import {emailValidator, localeValidator} from '../shared/shared.validators';

export const createUserValidator = Joi.object({
  accountType: Joi.number().valid(...getNumericEnumValues(AccountTypes)),
  email: emailValidator,
  password: Joi.string().min(PASSWORD_MIN_LENGTH).max(PASSWORD_MAX_LENGTH).regex(PASSWORD_REGEXP),
  locale: localeValidator,
});

export const confirmationKeyValidator = Joi.string().pattern(UUID_REGEXP);

export const recoverPasswordValidator = Joi.object({
  email: emailValidator,
  locale: localeValidator,
});
