import {Table} from '../../typings/data';

export const ClientAccountsTable: Table = {
  name: 'client_accounts',
  query: `
    CREATE TABLE IF NOT EXISTS client_accounts (
      id BIGSERIAL PRIMARY KEY,
      thumbnail VARCHAR (300),
      first_name VARCHAR (50),
      last_name VARCHAR (50),
      middle_name VARCHAR (50),
      gender SMALLINT,
      birth_date TIMESTAMP WITH TIME ZONE,
      description VARCHAR (250),
      phone_number_1 CHAR (9),
      phone_number_2 CHAR (9),
      phone_number_3 CHAR (9),
      whatsapp_number VARCHAR (15),
      telegram_username VARCHAR (32),
      user_id BIGINT UNIQUE,
        FOREIGN KEY(user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
    );
  `,
};
