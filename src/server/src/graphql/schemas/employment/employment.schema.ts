import {employmentMutationResolvers, employmentMutationTypeDefinitions} from './employment.mutations';
import {employmentTypes} from './employment.types';

export const employmentTypeDefinitions = [employmentTypes, employmentMutationTypeDefinitions];

export const employmentResolvers = [employmentMutationResolvers];
