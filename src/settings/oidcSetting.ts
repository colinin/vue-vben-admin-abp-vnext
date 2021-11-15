import type { OidcConfig } from '/#/config';

const setting: OidcConfig = {
  authority: 'http://10.21.15.28:44385',
  client_id: 'vue-vben-admin',
  //client_secret: '1q2w3e*',
  response_type: 'id_token token',
  scope: 'openid profile email address offline_access lingyun-abp-application',
  redirect_uri: 'http://10.24.0.2:3100/signin-callback',
  post_logout_redirect_uri: 'http://10.24.0.2:3100/signout-callback',
};

export default setting;
