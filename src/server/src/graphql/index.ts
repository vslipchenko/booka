import {makeExecutableSchema} from '@graphql-tools/schema';
import {merge} from 'lodash';
// import {gql} from 'apollo-server-core';
import {userResolvers, userTypeDefinitions} from './schemas/user/user.schema';
import {sharedTypeDefinitions} from './schemas/shared/shared.schema';

// TODO just a placeholder, could be dropped
// const rootTypeDefs = gql`
//   type Query {
//     id: ID
//   }
//
//   type Mutation {
//     id: ID
//   }
// `;

export const schema = makeExecutableSchema({
  typeDefs: [sharedTypeDefinitions, userTypeDefinitions],
  resolvers: merge({}, ...userResolvers),
});
