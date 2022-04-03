import {makeExecutableSchema} from '@graphql-tools/schema';
import {merge} from 'lodash';
import {userResolvers, userTypeDefinitions} from './schemas/user/user.schema';
import {sharedTypeDefinitions} from './schemas/shared/shared.schema';
import {authenticationResolvers, authenticationTypeDefinitions} from './schemas/authentication/authentication.schema';
import {bookingResolvers, bookingTypeDefinitions} from './schemas/booking/booking.schema';
import {accountResolvers, accountTypeDefinitions} from './schemas/account/account.schema';
import {profileResolvers, profileTypeDefinitions} from './schemas/profile/profile.schema';
import {dateResolver, dateTypeDefinition} from './scalars/date';

export const schema = makeExecutableSchema({
  typeDefs: [
    dateTypeDefinition,
    sharedTypeDefinitions,
    userTypeDefinitions,
    authenticationTypeDefinitions,
    bookingTypeDefinitions,
    accountTypeDefinitions,
    profileTypeDefinitions,
  ],
  resolvers: merge(
    {},
    dateResolver,
    ...userResolvers,
    ...authenticationResolvers,
    ...bookingResolvers,
    ...accountResolvers,
    ...profileResolvers,
  ),
});
