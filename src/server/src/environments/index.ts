const isDevEnv = process.env.TS_NODE_DEV; // As ts-node-dev is probably is not going to be used in prod

export const envConfigImport = import(`./${isDevEnv ? 'dev' : 'prod'}.env.json`);
