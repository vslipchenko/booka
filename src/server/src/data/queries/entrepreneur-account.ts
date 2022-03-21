import {QueryConfig} from 'pg';
import {EntrepreneurAccountData} from '../../typings/account.interfaces';

export const queryEntrepreneurAccountData = (userId: string): QueryConfig => ({
  text: `
    SELECT paid_at, thumbnail, first_name, middle_name, last_name, gender, birth_date, description, phone_number_1, phone_number_2, phone_number_3, whatsapp_number, telegram_username
    FROM entrepreneur_accounts
    WHERE user_id = $1
  `,
  values: [userId],
});

export const queryEntrepreneurAccountUpdateThumbnail = ({
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

export const queryEntrepreneurAccountEditData = (
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  {description, phone_number_1, phone_number_2, phone_number_3, paid_at}: EntrepreneurAccountData,
  userId: string,
): QueryConfig => ({
  text: `
    UPDATE entrepreneur_accounts
    SET paid_at = $1
    WHERE user_id = $2
  `,
  values: [paid_at, userId],
});
