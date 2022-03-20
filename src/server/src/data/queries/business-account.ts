import {QueryConfig} from 'pg';
import {BusinessAccountData} from '../../typings/account.interfaces';

export const queryBusinessAccountData = (userId: string): QueryConfig => ({
  text: `
    SELECT paid_at
    FROM business_accounts
    WHERE user_id = $1
  `,
  values: [userId],
});

export const queryBusinessAccountUpdateThumbnail = ({
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

export const queryBusinessAccountEditData = (
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  {description, phone_number_1, phone_number_2, phone_number_3, paid_at}: BusinessAccountData,
  userId: string,
): QueryConfig => ({
  text: `
    UPDATE business_accounts
    SET paid_at = $1
    WHERE user_id = $2
  `,
  values: [paid_at, userId],
});
