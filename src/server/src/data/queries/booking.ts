import {QueryConfig} from 'pg';

export const BookedServicesByUserId = (userId: string): QueryConfig => ({
  // TODO
  text: ``,
  values: [userId],
});
