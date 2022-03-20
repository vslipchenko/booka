import {QueryConfig} from 'pg';

export const BusinessAccountData = (userId: string): QueryConfig => ({
  text: `
    SELECT paid_at
    FROM business_accounts
    WHERE user_id = $1
  `,
  values: [userId],
});

export const BusinessAccountUpdateThumbnail = ({
  thumbnail,
  userId,
}: {
  thumbnail: string;
  userId: string;
}): QueryConfig => ({
  text: `
    UPDATE business_accounts
    SET thumbnail = $1
    WHERE user_id = $2
  `,
  values: [thumbnail, userId],
});
