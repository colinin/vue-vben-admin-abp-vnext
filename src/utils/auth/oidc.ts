import oidcSetting from '/@/settings/oidcSetting';
import oidc from 'oidc-client';
// 预留oidc接口
// 用于可能的SSO
// yarn add oidc-client
export const mgr = new oidc.UserManager({
  authority: oidcSetting.authority,
  client_id: oidcSetting.client_id,
  client_secret: oidcSetting.client_secret,
  response_type: oidcSetting.response_type,
  response_mode: 'fragment',
  scope: oidcSetting.scope,
  automaticSilentRenew: oidcSetting.automaticSilentRenew,
  accessTokenExpiringNotificationTime: oidcSetting.accessTokenExpiringNotificationTime,
  revokeAccessTokenOnSignout: oidcSetting.revokeAccessTokenOnSignout,
  redirect_uri: oidcSetting.redirect_uri,
  silent_redirect_uri: oidcSetting.silent_redirect_uri,
  post_logout_redirect_uri: oidcSetting.post_logout_redirect_uri,
});

mgr.events.addUserLoaded(function (user) {
  console.log('New User Loaded：');
  console.log(user);
});

mgr.events.addAccessTokenExpiring(function () {
  console.log('AccessToken Expiring：');
});

mgr.events.addAccessTokenExpired(function () {
  console.log('AccessToken Expired：');
  console.log('Session expired. Going out!');
  mgr
    .signoutRedirect()
    .then((resp) => {
      console.log('signed out', resp);
    })
    .catch((err) => {
      console.log(err);
    });
});

mgr.events.addSilentRenewError(function () {
  console.log('Silent Renew Error：');
});

mgr.events.addUserSignedOut(function () {
  console.log('UserSignedOut：');
  console.log('Going out!');
});
