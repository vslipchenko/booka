import {QueryConfig} from 'pg';
import {EntrepreneurAccountData} from '../../typings/account.interfaces';

export const queryEntrepreneurAccountData = (userId: string): QueryConfig => ({
  text: `
    SELECT thumbnail, 
        first_name, 
        middle_name, 
        last_name, 
        gender, 
        birth_date, 
        business_category,
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
        offsite_work,
        region,
        city,
        google_maps
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
    business_category,
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
    offsite_work,
    region,
    city,
    google_maps,
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
        business_category = $6,
        description = $7, 
        phone_number_1 = $8, 
        phone_number_2 = $9, 
        phone_number_3 = $10, 
        viber_number = $11, 
        whatsapp_number = $12, 
        telegram_username = $13,
        website = $14,
        instagram_username = $15,
        facebook_username = $16,
        twitter_username = $17,
        offsite_work = $18,
        region = $19,
        city = $20,
        google_maps = $21
    WHERE user_id = $22
  `,
  values: [
    first_name,
    last_name,
    middle_name,
    gender,
    birth_date,
    business_category,
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
    offsite_work,
    region,
    city,
    google_maps,
    userId,
  ],
});
