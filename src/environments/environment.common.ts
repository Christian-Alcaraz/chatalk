export const commonEnv: any = {
  GOOGLE_OAUTH: {
    ROOT_URL: 'https://accounts.google.com/o/oauth2/v2/auth',
    CLIENT_ID:
      '658502364601-2unmep2f67kabl0rqqid9a20up11r4oc.apps.googleusercontent.com',
    SCOPES: [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',
      'openid',
    ],
    REDIRECT_URL: 'http://localhost:3000/api/v1/oauth/google',
  },
};
