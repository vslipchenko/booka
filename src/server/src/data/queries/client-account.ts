import {QueryConfig} from 'pg';

export const ClientAccountData = (userId: string): QueryConfig => ({
  text: `
    SELECT first_name, middle_name, last_name
    FROM client_accounts
    WHERE user_id = $1
  `,
  values: [userId],
});

export const ClientAccountUpdateThumbnail = ({
  thumbnail,
  userId,
}: {
  thumbnail: string;
  userId: string;
}): QueryConfig => ({
  text: `
    UPDATE client_accounts
    SET thumbnail = $1
    WHERE user_id = $2
  `,
  values: [thumbnail, userId],
});
