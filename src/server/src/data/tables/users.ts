import {Table} from '../../typings/data';

export const UsersTable: Table = {
  name: 'users',
  query: `
    CREATE TABLE IF NOT EXISTS users (
      id BIGSERIAL PRIMARY KEY,
      account_type SMALLINT,
      email VARCHAR (320) UNIQUE,
      password VARCHAR (60),
      phone_number VARCHAR (15),
      first_name VARCHAR (50),
      last_name VARCHAR (50),
      birt_date DATE,
      gender SMALLINT
    );
  `,
};
