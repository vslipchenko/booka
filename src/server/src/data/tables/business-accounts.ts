import {Table} from '../../typings/data';

export const BusinessAccountsTable: Table = {
  name: 'business_accounts',
  query: `
    CREATE TABLE IF NOT EXISTS business_accounts (
      id BIGSERIAL PRIMARY KEY,
      thumbnail VARCHAR (300),
      paid_at TIMESTAMP WITH TIME ZONE,
      user_id BIGINT UNIQUE,
        FOREIGN KEY(user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
    );
  `,
};
