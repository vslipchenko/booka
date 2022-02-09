import {Table} from '../../typings/data';

export const UsersTable: Table = {
  name: 'users',
  query: `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      email VARCHAR (320) UNIQUE,
      password VARCHAR (50),
      phone_number VARCHAR (15),
      first_name VARCHAR (50),
      last_name VARCHAR (50),
      birt_date DATE,
      gender SMALLINT
    );
  `,
};
