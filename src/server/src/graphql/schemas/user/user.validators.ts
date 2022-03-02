import Joi from 'joi';
import {getNumericEnumValues} from '../../../utilities/enum';
import {AccountTypes} from '../../../typings/user.enums';
import {UUID_REGEXP} from '../../../constants/regexp';
import {emailValidator, localeValidator, passwordValidator} from '../shared/shared.validators';

export const createUserValidator = Joi.object({
  accountType: Joi.number().valid(...getNumericEnumValues(AccountTypes)),
  email: emailValidator,
  password: passwordValidator,
  locale: localeValidator,
});

export const confirmationKeyValidator = Joi.string().pattern(UUID_REGEXP);

export const recoverPasswordValidator = Joi.object({
  email: emailValidator,
  locale: localeValidator,
});
