import {QueryConfig} from 'pg';
import {EntrepreneurAccountData} from '../../typings/account.interfaces';

export const queryEntrepreneurAccountData = (userId: string): QueryConfig => ({
  text: `
    SELECT paid_at, 
        thumbnail, 
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
        telegram_username, 
        website, 
        instagram_username, 
        facebook_username, 
        twitter_username
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
    website,
    instagram_username,
    facebook_username,
    twitter_username,
  }: EntrepreneurAccountData,
  userId: string,
): QueryConfig => ({
  text: `
    UPDATE entrepreneur_accounts
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
        telegram_username = $12,
        website = $13,
        instagram_username = $14,
        facebook_username = $15,
        twitter_username = $16
    WHERE user_id = $17
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
    website,
    instagram_username,
    facebook_username,
    twitter_username,
    userId,
  ],
});
