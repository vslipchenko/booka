import {Table} from '../../typings/data';

export const AccountsTable: Table = {
  name: 'accounts',
  // access_key is used in order to bring diversity to tokens being used;
  query: `
    CREATE TABLE IF NOT EXISTS accounts (
      id BIGSERIAL PRIMARY KEY,
      account_type SMALLINT,
      user_id BIGINT UNIQUE,
        FOREIGN KEY(user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
    );
  `,
};
