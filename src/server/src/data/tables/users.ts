import {Table} from '../../typings/data';

export const UsersTable: Table = {
  name: 'users',
  // access_key is used in order to bring diversity to tokens being used;
  query: `
    CREATE TABLE IF NOT EXISTS users (
      id BIGSERIAL PRIMARY KEY,
      tariff SMALLINT,
      access_key CHAR (24),
      confirmation_key CHAR (36),
      email VARCHAR (254) UNIQUE,
      password CHAR (60),
      language SMALLINT,
      paid_at TIMESTAMP WITH TIME ZONE,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );
  `,
};

// phone_number VARCHAR (15),
// first_name VARCHAR (50),
// last_name VARCHAR (50),
// birt_date DATE,
// gender SMALLINT
