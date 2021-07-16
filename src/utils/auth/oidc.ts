import oidcSetting from '/@/settings/oidcSetting';
import oidc from 'oidc-client';
// 预留oidc接口
// 用于可能的SSO
// yarn add oidc-client
export const mgr = new oidc.UserManager(oidcSetting);

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
