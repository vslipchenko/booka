import {Sequelize} from 'sequelize';
import {environment} from '../environments';

const {DB_NAME, DB_USERNAME, DB_PASSWORD, DB_HOSTNAME, DB_PORT} = environment.variables;

const sequelize = new Sequelize({
  database: DB_NAME,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  host: DB_HOSTNAME,
  port: DB_PORT,
  dialect: 'postgres',
});

export const db = {
  sequelize,
  Sequelize,
};
