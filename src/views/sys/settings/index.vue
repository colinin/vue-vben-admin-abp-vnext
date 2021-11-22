<template>
  <SettingForm
    :has-change-setting="hasChangeSetting"
    :setting-groups="group"
    @change="handleChangeSetting"
  />
</template>
<script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  import { useLocalization } from '/@/hooks/abp/useLocalization';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { useAbpStoreWithOut } from '/@/store/modules/abp';

  import { SettingForm } from '/@/components/SettingManagement';
  import { SettingGroup } from '/@/api/settings/model/settingModel';
  import {
    getCurrentTenantSettings,
    getGlobalSettings,
    setGlobalSettings,
    setCurrentTenantSettings,
  } from '/@/api/settings/settings';

  export default defineComponent({
    components: { SettingForm },
    setup() {
      const group = ref<SettingGroup[]>();
      const abpStore = useAbpStoreWithOut();
      const providerName = ref('G');
      const providerKey = ref<string | undefined>('');
      const hasChangeSetting = ref(false);
      const { createMessage } = useMessage();
      const { success } = createMessage;
      const { L } = useLocalization('AbpSettingManagement');

      onMounted(() => {
        if (abpStore.getApplication.currentTenant.isAvailable) {
          providerName.value = 'T';
          providerKey.value = abpStore.getApplication.currentTenant.id;
          getCurrentTenantSettings().then((res) => {
            group.value = res.items;
          });
        } else {
          providerName.value = 'G';
          providerKey.value = '';
          getGlobalSettings().then((res) => {
            group.value = res.items;
          });
        }
      });

      function handleChangeSetting(settings) {
        hasChangeSetting.value = true;
        if (abpStore.getApplication.currentTenant.isAvailable) {
          setCurrentTenantSettings(settings)
            .then(() => {
              success(L('SuccessfullySaved'));
            })
            .finally(() => {
              hasChangeSetting.value = false;
            });
        } else {
          setGlobalSettings(settings)
            .then(() => {
              success(L('SuccessfullySaved'));
            })
            .finally(() => {
              hasChangeSetting.value = false;
            });
        }
      }

      return {
        group,
        hasChangeSetting,
        handleChangeSetting,
      };
    },
  });
</script>
