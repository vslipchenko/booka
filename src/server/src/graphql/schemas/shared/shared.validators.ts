import Joi from 'joi';
import {EMAIL_REGEXP} from '../../../constants/regexp';
import {getStringEnumValues} from '../../../utilities/enum';
import {Locale} from '../../../typings/i18n.enums';

export const emailValidator = Joi.string().regex(EMAIL_REGEXP);
export const localeValidator = Joi.string().valid(...getStringEnumValues(Locale));
