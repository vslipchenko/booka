import {QueryConfig} from 'pg';

export const queryBookedServicesByUserId = (userId: string): QueryConfig => ({
  // TODO
  text: ``,
  values: [userId],
});
