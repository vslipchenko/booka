import nodemailer from 'nodemailer';
import {environment} from '../environments';

export const mailer = nodemailer.createTransport({
  service: environment.MAIL_SERVICE,
  auth: {
    user: environment.MAIL_USERNAME,
    pass: environment.MAIL_PASSWORD,
  },
});
