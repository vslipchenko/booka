import {QueryConfig} from 'pg';
import {ClientAccountData} from '../../typings/account.interfaces';

export const queryClientAccountData = (userId: string): QueryConfig => ({
  text: `
    SELECT thumbnail, 
        first_name, 
        middle_name, 
        last_name, 
        gender, 
        birth_date, 
        description, 
        phone_number_1, 
        phone_number_2, 
        phone_number_3, 
        viber_number, 
        whatsapp_number, 
        telegram_username
    FROM client_accounts
    WHERE user_id = $1
  `,
  values: [userId],
});

export const queryClientAccountUpdateThumbnail = ({
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

export const queryClientAccountEditData = (
  {
    first_name,
    last_name,
    middle_name,
    gender,
    birth_date,
    description,
    phone_number_1,
    phone_number_2,
    phone_number_3,
    viber_number,
    whatsapp_number,
    telegram_username,
  }: ClientAccountData,
  userId: string,
): QueryConfig => ({
  text: `
    UPDATE client_accounts
    SET first_name = $1, 
        last_name = $2, 
        middle_name = $3, 
        gender = $4, 
        birth_date = $5, 
        description = $6, 
        phone_number_1 = $7, 
        phone_number_2 = $8, 
        phone_number_3 = $9, 
        viber_number = $10, 
        whatsapp_number = $11, 
        telegram_username = $12
    WHERE user_id = $13
  `,
  values: [
    first_name,
    last_name,
    middle_name,
    gender,
    birth_date,
    description,
    phone_number_1,
    phone_number_2,
    phone_number_3,
    viber_number,
    whatsapp_number,
    telegram_username,
    userId,
  ],
});
