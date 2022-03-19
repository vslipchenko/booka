import {Table} from '../../typings/data';

export const ClientAccountsTable: Table = {
  name: 'client_accounts',
  query: `
    CREATE TABLE IF NOT EXISTS client_accounts (
      id BIGSERIAL PRIMARY KEY,
      first_name VARCHAR (50),
      last_name VARCHAR (50),
      middle_name VARCHAR (50),
      user_id BIGINT UNIQUE,
        FOREIGN KEY(user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
    );
  `,
};
