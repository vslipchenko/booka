import {Table} from '../../typings/data';

export const BusinessAccountsTable: Table = {
  name: 'business_accounts',
  query: `
    CREATE TABLE IF NOT EXISTS business_accounts (
      id BIGSERIAL PRIMARY KEY,
      user_id BIGINT UNIQUE,
      thumbnail VARCHAR (300),
      name VARCHAR (80),
      business_category SMALLINT,
      description VARCHAR (500),
      phone_number_1 CHAR (9),
      phone_number_2 CHAR (9),
      phone_number_3 CHAR (9),
      viber_number CHAR (9),
      whatsapp_number CHAR (9),
      telegram_username VARCHAR (32),
      instagram_username VARCHAR (30),
      facebook_username VARCHAR (50),
      twitter_username VARCHAR (15),
      website VARCHAR (500),
      offsite_work BOOLEAN,
      region SMALLINT,
      city SMALLINT,
      google_maps VARCHAR (50),
        FOREIGN KEY(user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
    );
  `,
};
