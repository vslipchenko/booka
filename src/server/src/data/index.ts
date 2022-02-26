import {Pool, QueryConfig, QueryResult} from 'pg';
import {environment} from '../environments';
import {UsersTable} from './tables/users';

// PostgreSQL v14

const {DB_NAME, DB_USERNAME, DB_PASSWORD, DB_HOSTNAME, DB_PORT} = environment;

const pool = new Pool({
  user: DB_USERNAME,
  host: DB_HOSTNAME,
  database: DB_NAME,
  password: DB_PASSWORD,
  port: DB_PORT,
});

export const db = {
  query: (query: string | QueryConfig, params?: Array<any>): Promise<QueryResult<any>> => pool.query(query, params),
  close: (): Promise<void> => pool.end(),
  sync: function (): Promise<void> {
    const tables = [
      UsersTable,
      // ... Append other tables to sync
    ];
    // Sync tables
    return new Promise((resolve, reject) => {
      tables.forEach(async (table, index) => {
        try {
          await this.query(table.query);
          console.log(`Table "${table.name}" synced successfully`);

          const isLast = index === tables.length - 1;
          if (isLast) resolve();
        } catch (error) {
          console.error(`Error happened during creation of "${table.name}": `, error);
          reject();
        }
      });
    });
  },
};
