<script lang="ts" setup>
  import { onMounted } from 'vue';
  import { mgr } from '/@/utils/auth/oidc';
  import { Persistent } from '/@/utils/cache/persistent';
  import { useUserStoreWithOut } from '/@/store/modules/user';

  const userStore = useUserStoreWithOut();

  onMounted(() => {
    mgr
      .signinRedirectCallback()
      .then((user) => {
        if (user.profile.tenantid) {
          Persistent.setTenant({
            id: user.profile.tenantid,
            name: '',
          });
        }
        userStore.oidcLogin(user);
        // go(PageEnum.BASE_HOME);
      })
      .catch((error) => {
        if (error.error === 'access_denied') {
          userStore.logout(true);
        }
      });
  });
</script>
