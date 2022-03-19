import {Table} from '../../typings/data';

export const EntrepreneurAccountsTable: Table = {
  name: 'entrepreneur_accounts',
  query: `
    CREATE TABLE IF NOT EXISTS entrepreneur_accounts (
      id BIGSERIAL PRIMARY KEY,
      thumbnail VARCHAR (300),
      first_name VARCHAR (50),
      last_name VARCHAR (50),
      middle_name VARCHAR (50),
      paid_at TIMESTAMP WITH TIME ZONE,
      user_id BIGINT UNIQUE,
        FOREIGN KEY(user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
    );
  `,
};
