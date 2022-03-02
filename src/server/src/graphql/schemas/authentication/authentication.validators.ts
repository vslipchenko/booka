import Joi from 'joi';
import {emailValidator, passwordValidator} from '../shared/shared.validators';

export const signInValidator = Joi.object({
  email: emailValidator,
  password: passwordValidator,
});
