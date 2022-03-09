# Notes

- Add captcha to critical public parts of the app
- Implement "mail us" dialog
- Update missing text contents

Profile:
For client:
Has public profile

        Entry screen - My bookings, starting from most recent to latest

        Menu should contain:
            Favorites (includes entrepreneurs & business)
            Search (allows to search for entrepreneurs & business)
            Profile with possibility to edit information
            Settings (concerns account)
            Inbox (email like messaging between client & service provider) - Notifications / Messages ???
            (not critical) History (contains all the previous bookings)

        Bot menu:
            Home (Главная (профиль))
            Search
            Inbox
            Favorites
            Profile
            Extra tri-dot menu (Settings, History)

    For entrepreneurs / business:
        Both have public profile

        Entry screen - List of booked services starting from most recent to latest

        Menu:
            (not critical) Clients (contains list of service consumers both active and in past)
            Search (only for entrepreneurs)
            Favorites (only for entrepreneurs)
            Staff members (only for business)
            Statistic
            Inbox
            Profile with possibility to edit information
            Settings (concerns account; contains payment)
            History

        Bot menu:
            Home (Главная (профиль))
            Search for entrepreneurs / Staff members for business
            Inbox
            Favorites
            Profile
            Settings (Statistic, Settings, History, Payment)

Users
id

Accounts
id
user_id FOREIGN KEY(id) REFERENCES users(id)
account_type SMALLINT
symbolic_date (birth date for cliens & entrepreneurs, means establishment date for business)
image_url (https://api.imgbb.com/)
contact info:
phone number(-s) (multiple)

client/entrepreneur specific columns:
first_name
middle_name
last_name
gender

entrepreneur/business specific columns:
website
bio (short description up to 500 chars)
payed_at
contact info:
city (multiple)
street address (multiple)

business specific columns:
company_name
