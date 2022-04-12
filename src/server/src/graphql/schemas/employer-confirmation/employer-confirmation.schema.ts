import {
  employerConfirmationMutationResolvers,
  employerConfirmationMutationTypeDefinitions,
} from './employer-confirmation.mutations';
import {employerConfirmationTypes} from './employer-confirmation.types';

export const employerConfirmationTypeDefinitions = [
  employerConfirmationTypes,
  employerConfirmationMutationTypeDefinitions,
];

export const employerConfirmationResolvers = [employerConfirmationMutationResolvers];
