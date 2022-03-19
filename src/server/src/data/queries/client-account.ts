import {QueryConfig} from 'pg';

export const ClientAccountVitals = (userId: string): QueryConfig => ({
  text: `
    SELECT tariff, first_name, middle_name, last_name, paid_at
    FROM accounts
    WHERE user_id = $1
  `,
  values: [userId],
});
