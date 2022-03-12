import Joi from 'joi';
import {getNumericEnumValues} from '../../../utilities/enum';
import {UUID_REGEXP} from '../../../constants/regexp';
import {emailValidator, localeValidator, passwordValidator} from '../shared/shared.validators';
import {AccountTypes} from '../../../typings/account.enums';

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
