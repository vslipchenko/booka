import {accountTypes} from './account.types';
import {accountQueryResolvers, accountQueryTypeDefinitions} from './account.queries';

export const accountTypeDefinitions = [accountTypes, accountQueryTypeDefinitions];

export const accountResolvers = [accountQueryResolvers];
