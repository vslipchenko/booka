import {makeExecutableSchema} from '@graphql-tools/schema';
import {merge} from 'lodash';
import {userResolvers, userTypeDefinitions} from './schemas/user/user.schema';
import {sharedTypeDefinitions} from './schemas/shared/shared.schema';
import {authenticationResolvers, authenticationTypeDefinitions} from './schemas/authentication/authentication.schema';
import {bookingResolvers, bookingTypeDefinitions} from './schemas/booking/booking.schema';
import {accountResolvers, accountTypeDefinitions} from './schemas/account/account.schema';

export const schema = makeExecutableSchema({
  typeDefs: [
    sharedTypeDefinitions,
    userTypeDefinitions,
    authenticationTypeDefinitions,
    bookingTypeDefinitions,
    accountTypeDefinitions,
  ],
  resolvers: merge({}, ...userResolvers, ...authenticationResolvers, ...bookingResolvers, ...accountResolvers),
});
