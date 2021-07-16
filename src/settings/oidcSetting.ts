import type { OidcConfig } from '/#/config';

const setting: OidcConfig = {
  automaticSilentRenew: true,
  authority: 'http://127.0.0.1:44385/',
  client_id: 'vue-vben-admin',
  client_secret: '1q2w3e*',
  response_type: 'token id_token',
  scope: 'openid profile email address offline_access lingyun-abp-application',
  redirect_uri: 'http://127.0.0.1:3100/#/signin-oidc/',
  post_logout_redirect_uri: 'http://127.0.0.1:3100/#/signout-callback-oidc/',
};

export default setting;
