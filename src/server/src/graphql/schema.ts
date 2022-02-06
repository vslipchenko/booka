import {makeExecutableSchema} from '@graphql-tools/schema';
import {merge} from 'lodash';
import {gql} from 'apollo-server-core';

// TODO just a placeholder, could be dropped
const rootTypeDefs = gql`
  type Query {
    _: ID
  }

  type Mutation {
    _: ID
  }
`;

export const schema = makeExecutableSchema({
  typeDefs: [rootTypeDefs],
  resolvers: merge({}),
});
