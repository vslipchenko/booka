import Joi from 'joi';
import {PROFILE_THUMBNAIL_ORIGIN_REGEXP} from '../../../constants/validation';

export const thumbnailLinkValidator = Joi.string().pattern(PROFILE_THUMBNAIL_ORIGIN_REGEXP).optional();

export const accountDataValidator = Joi.object({

});
