export = {
  APP_ORIGIN: 'http://localhost:4200',
  PORT: 4000,
  DB_NAME: 'booka',
  DB_USERNAME: 'postgres',
  DB_PASSWORD: 'root',
  DB_HOSTNAME: '127.0.0.1',
  DB_PORT: 5432,
  UUID_BASE: 'f8ec71ca-d0f1-4767-833e-79e2d4b469f9',
  MAIL_SERVICE: 'gmail',
  MAIL_USERNAME: 'mail.booka.ua@gmail.com',
  MAIL_PASSWORD: 'RmdUKaxew5',
  // https://cloud.google.com/iot/docs/how-tos/credentials/keys#generating_an_elliptic_curve_keys
  RECOVERY_SECRET: `-----BEGIN EC PRIVATE KEY-----\nMHcCAQEEIPKgLlAWUcq9j+T6us94dIbSFUaT7ZmWX4RAyMCLIOODoAoGCCqGSM49\nAwEHoUQDQgAEX11zG4en+hNZpxjR5wbCF+lQZ1AFUE/AxoAl6orJ3/1L8E1O1/BB\nswGjWWWEBzw8rPSHNfSDueliWtkD3WgV5Q==\n-----END EC PRIVATE KEY-----`,
  RECOVERY_KEY_EXPIRES_IN: '30m',
};
