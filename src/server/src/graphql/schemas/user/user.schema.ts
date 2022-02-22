import {userTypes} from './user.types';
import {userQueryResolvers, userQueryTypeDefinitions} from './user.queries';

export const userTypeDefinitions = [userTypes, userQueryTypeDefinitions];

export const userResolvers = [userQueryResolvers];
