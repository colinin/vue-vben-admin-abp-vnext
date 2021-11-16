import oidc from 'oidc-client';
import { useGlobSetting } from '/@/hooks/setting';
const glob = useGlobSetting();
const location = window.location;
console.log(glob, location);
// 预留oidc接口
// 用于可能的SSO
// yarn add oidc-client
export const mgr = new oidc.UserManager({
  authority: glob.authority,
  client_id: glob.clientId,
  client_secret: glob.clientSecret,
  scope: glob.scopes,
  response_type: 'id_token token',
  redirect_uri: `${location.protocol}//${location.host}/signin-callback`,
  post_logout_redirect_uri: `${location.protocol}//${location.host}/signout-callback`,
});
