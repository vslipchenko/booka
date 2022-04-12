import {Table} from '../../typings/data';

export const EmploymentTable: Table = {
  name: 'employment', // TODO: rename to employer_confirmation
  query: `
    CREATE TABLE IF NOT EXISTS employment (
      business_id BIGINT,
      entrepreneur_id BIGINT,
      confirmation_key CHAR(36) UNIQUE,
        FOREIGN KEY(business_id)
        REFERENCES users(id)
        ON DELETE CASCADE,
        FOREIGN KEY(entrepreneur_id) 
        REFERENCES users(id) 
        ON DELETE CASCADE
    );
  `,
};
