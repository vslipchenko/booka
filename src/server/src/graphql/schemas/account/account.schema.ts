import {accountTypes} from './account.types';
import {accountQueryResolvers, accountQueryTypeDefinitions} from './account.queries';
import {accountMutationResolvers} from './account.mutations';

export const accountTypeDefinitions = [accountTypes, accountQueryTypeDefinitions];

export const accountResolvers = [accountQueryResolvers, accountMutationResolvers];
