import { commonEnv } from './environment.common';

const GOOGLE_OAUTH = {
  REDIRECT_URL: '{production.link}/v1/oauth/google/success',
};

const env = {
  ENVIRONMENT_NAME: 'production',
  PRODUCTION: true,
  API_URL: 'http://localhost:3000/v1',
};

export const environment = {
  ...commonEnv,
  ...env,
  GOOGLE_OAUTH: {
    ...commonEnv.GOOGLE_OAUTH,
    ...GOOGLE_OAUTH,
  },
};
