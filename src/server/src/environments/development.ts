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
  ACCESS_TOKEN_EXPIRES_IN: '5m',
  REFRESH_TOKEN_EXPIRES_IN: '30d',
  ACCESS_TOKEN_SECRET: 'B!MSG&Tw)E[ajqt#V[HBG4q?8W+p7(PA&ZhG4eyD{[$a%X)n(TT=ut;)vc(`8Zc$', // 64 chars / 512 bits
  REFRESH_TOKEN_SECRET: '9b*8]#d7k#9Zs/#m[tu$W;ke3+wA2Y]aPY=9B`rJ', // 40 chars + 24 chars of access key = 64 / 512 bits; per https://stackoverflow.com/a/30520284
  RECOVERY_SECRET: 'mW?42,!5w4b:H85n&6+^)schuuGh>RphgW_L2L@L@k;dm5"kZU3c).^"?Sd"$kXp',
  RECOVERY_KEY_EXPIRES_IN: '30m',
};
