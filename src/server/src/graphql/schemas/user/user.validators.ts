import Joi from 'joi';
import {getEnumValues} from '../../../utilities/enum';
import {AccountTypes} from '../../../typings/user.enums';
import {PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH, PASSWORD_REGEXP} from '../../../constants/regexp';
import {emailValidator} from '../shared/shared.validators';
import {Locale} from '../../../typings/i18n.enums';

export const createUserValidator = Joi.object({
  accountType: Joi.number().valid(...getEnumValues(AccountTypes)),
  email: emailValidator,
  password: Joi.string().min(PASSWORD_MIN_LENGTH).max(PASSWORD_MAX_LENGTH).regex(PASSWORD_REGEXP),
  locale: Joi.string().valid(...getEnumValues(Locale)),
});
