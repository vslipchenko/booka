import Joi from 'joi';
import {getNumericEnumValues} from '../../../utilities/enum';
import {UUID_REGEXP} from '../../../constants/validation';
import {emailValidator, localeValidator, passwordValidator} from '../shared/shared.validators';
import {AccountTariffs} from '../../../typings/account.enums';

export const createUserValidator = Joi.object({
  tariff: Joi.number().valid(...getNumericEnumValues(AccountTariffs)),
  email: emailValidator,
  password: passwordValidator,
  locale: localeValidator,
});

export const confirmationKeyValidator = Joi.string().pattern(UUID_REGEXP);

export const recoverPasswordValidator = Joi.object({
  email: emailValidator,
  locale: localeValidator,
});
