const isDevEnv = Boolean(process.env.TS_NODE_DEV); // As ts-node-dev is probably is not going to be used in prod

export const environment: {
  // name: 'development' | 'production';
  // isDevEnv: boolean;
  DOMAIN: string;
  PORT: number;
  DB_NAME: string;
  DB_USERNAME: string;
  DB_PASSWORD: string;
  DB_HOSTNAME: string;
  DB_PORT: number;
  UUID_BASE: string;
  MAIL_SERVICE: string;
  MAIL_USERNAME: string;
  MAIL_PASSWORD: string;
  // eslint-disable-next-line @typescript-eslint/no-var-requires
} = require(`./${isDevEnv ? 'development' : 'production'}.ts`);
