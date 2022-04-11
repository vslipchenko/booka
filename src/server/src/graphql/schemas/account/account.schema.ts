import {accountTypes} from './account.types';
import {accountQueryResolvers, accountQueryTypeDefinitions} from './account.queries';
import {accountMutationResolvers, accountMutationTypeDefinitions} from './account.mutations';

export const accountTypeDefinitions = [accountTypes, accountQueryTypeDefinitions, accountMutationTypeDefinitions];

export const accountResolvers = [accountQueryResolvers, accountMutationResolvers];
