import {Model, Table} from '../../typings/data';
import {db} from '../index';

const table = 'users';

export const UsersTable: Table = {
  name: table,
  query: `
    CREATE TABLE IF NOT EXISTS ${table} (
      id SERIAL PRIMARY KEY,
      email VARCHAR (320),
      password VARCHAR (50),
      phone_number VARCHAR (15),
      first_name VARCHAR (50),
      last_name VARCHAR (50),
      birt_date DATE,
      gender SMALLINT
    );
  `,
};

export const User: Model = {
  create: ({email, password, phoneNumber, firstName, lastName, birthDate, gender}: any) => {
    const query = {
      text: `
        INSERT INTO ${table}(
          email,
          password,
          phone_number,
          first_name,
          last_name,
          birth_date,
          gender
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7)
      `,
      values: [email, password, phoneNumber, firstName, lastName, birthDate, gender],
    };

    return db.query(query);
  },
};
