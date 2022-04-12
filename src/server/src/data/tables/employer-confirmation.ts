import {Table} from '../../typings/data';

export const EmployerConfirmationTable: Table = {
  name: 'employer_confirmation',
  query: `
    CREATE TABLE IF NOT EXISTS employer_confirmation (
      business_id BIGINT,
      entrepreneur_id BIGINT,
      confirmation_key CHAR(36) UNIQUE,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        FOREIGN KEY(business_id)
        REFERENCES users(id)
        ON DELETE CASCADE,
        FOREIGN KEY(entrepreneur_id) 
        REFERENCES users(id) 
        ON DELETE CASCADE
    );
  `,
};
