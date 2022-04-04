import {GraphQLScalarType} from 'graphql';
import {ISO_DATE_REGEXP} from '../../constants/validation';
import {gql} from 'apollo-server-core';

export const dateTypeDefinition = gql`
  scalar Date
`;
// graphql-iso-date: https://github.com/excitement-engineer/graphql-iso-date/blob/master/src/dateTime/index.js
export const dateScalar = new GraphQLScalarType({
  name: 'Date',
  description: 'Date custom scalar type',
  // Convert outgoing value to ISO date string
  serialize(value: any): string {
    if (ISO_DATE_REGEXP.test(value)) return value; // If date in iso format already return as is

    if (value instanceof Date) return value.toISOString(); // Postgres timestamp column value is of type Date already; convert to ISO

    return new Date(value).toISOString(); // Convert outgoing Date to integer for JSON
  },
  // Parse incoming value
  parseValue(value: any): string {
    if (ISO_DATE_REGEXP.test(value)) return value;

    return new Date(value).toISOString();
  },
});

export const dateResolver = {
  Date: dateScalar,
};
