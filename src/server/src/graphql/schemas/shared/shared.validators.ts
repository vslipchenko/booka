import Joi from 'joi';
import {EMAIL_REGEXP} from '../../../constants/regexp';

export const emailValidator = Joi.string().regex(EMAIL_REGEXP);
