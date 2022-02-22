import {QueryConfig} from 'pg';

// export interface Model {
//   create?: (...args: any) => Promise<unknown>;
// }

export interface Table {
  name: string;
  query: string;
}

export type QueryBuilder = (...args: any) => QueryConfig;
