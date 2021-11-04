<template>
  <SettingForm
    :has-change-setting="hasChangeSetting"
    :setting-groups="group"
    @change="handleChangeSetting"
  />
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { useAbpStoreWithOut } from '/@/store/modules/abp';

  import SettingForm from './SettingForm.vue';
  import { SettingGroup } from '/@/api/settings/model/settingModel';
  import {
    getCurrentTenantSettings,
    getGlobalSettings,
    setGlobalSettings,
    setCurrentTenantSettings,
  } from '/@/api/settings/settings';

  export default defineComponent({
    components: {
      SettingForm,
    },
    setup() {
      const group = ref<SettingGroup[]>();
      const abpStore = useAbpStoreWithOut();
      const providerName = ref('G');
      const providerKey = ref<string | undefined>('');
      const hasChangeSetting = ref(false);
      const { t } = useI18n();
      const { createMessage } = useMessage();
      const { success } = createMessage;

      return {
        activeKey: ref('1'),
        abpStore,
        group,
        providerName,
        providerKey,
        hasChangeSetting,
        success,
        t,
      };
    },
    mounted() {
      if (this.abpStore.getApplication.currentTenant.isAvailable) {
        this.providerName = 'T';
        this.providerKey = this.abpStore.getApplication.currentTenant.id;
        getCurrentTenantSettings().then((res) => {
          this.group = res.items;
        });
      } else {
        this.providerName = 'G';
        this.providerKey = '';
        getGlobalSettings().then((res) => {
          this.group = res.items;
        });
      }
    },
    methods: {
      handleChangeSetting(settings) {
        this.hasChangeSetting = true;
        if (this.abpStore.getApplication.currentTenant.isAvailable) {
          setCurrentTenantSettings(settings)
            .then(() => {
              this.success(this.t('AbpSettingManagement.SuccessfullySaved'));
            })
            .finally(() => {
              this.hasChangeSetting = false;
            });
        } else {
          setGlobalSettings(settings)
            .then(() => {
              this.success(this.t('AbpSettingManagement.SuccessfullySaved'));
            })
            .finally(() => {
              this.hasChangeSetting = false;
            });
        }
      },
    },
  });
</script>
