import {profileMutationResolvers, profileMutationTypeDefinitions} from './profile.mutations';
import {profileInputs} from './profile.inputs';

export const profileTypeDefinitions = [profileMutationTypeDefinitions, profileInputs];

export const profileResolvers = [profileMutationResolvers];
