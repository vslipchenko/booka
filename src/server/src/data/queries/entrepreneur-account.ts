import {QueryConfig} from 'pg';

export const EntrepreneurAccountData = (userId: string): QueryConfig => ({
  text: `
    SELECT first_name, middle_name, last_name, paid_at
    FROM entrepreneur_accounts
    WHERE user_id = $1
  `,
  values: [userId],
});

export const EntrepreneurAccountUpdateThumbnail = ({
  thumbnail,
  userId,
}: {
  thumbnail: string;
  userId: string;
}): QueryConfig => ({
  text: `
    UPDATE entrepreneur_accounts
    SET thumbnail = $1
    WHERE user_id = $2
  `,
  values: [thumbnail, userId],
});
