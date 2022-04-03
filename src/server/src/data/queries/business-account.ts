import {QueryConfig} from 'pg';
import {BusinessAccountData} from '../../typings/account.interfaces';

export const queryBusinessAccountData = (userId: string): QueryConfig => ({
  text: `
    SELECT thumbnail, 
        name,
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
  {
    name,
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
  }: BusinessAccountData,
  userId: string,
): QueryConfig => ({
  text: `
    UPDATE business_accounts
    SET name = $1,
        business_category = $2,
        description = $3, 
        phone_number_1 = $4, 
        phone_number_2 = $5, 
        phone_number_3 = $6, 
        viber_number = $7, 
        whatsapp_number = $8, 
        telegram_username = $9,
        website = $10,
        instagram_username = $11,
        facebook_username = $12,
        twitter_username = $13,
        offsite_work = $14,
        region = $15,
        city = $16,
        google_maps = $17
    WHERE user_id = $18
  `,
  values: [
    name,
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
