import {QueryConfig} from 'pg';

export const ClientAccountVitals = (userId: string): QueryConfig => ({
  text: `
    SELECT first_name, middle_name, last_name
    FROM client_accounts
    WHERE user_id = $1
  `,
  values: [userId],
});
