<template>
  <InputSearch
    readonly
    :placeholder="t('AbpUiMultiTenancy.SwitchTenantHint')"
    size="large"
    autoComplete="off"
    @search="handleSwitchTenant"
    v-model:value="formModelRef.tenantName"
  >
    <template #enterButton>
      <Button> ({{ t('AbpUiMultiTenancy.Switch') }}) </Button>
    </template>
  </InputSearch>
  <BasicModal
    v-bind="$attrs"
    :minHeight="80"
    :closable="false"
    :maskClosable="false"
    :canFullscreen="false"
    :showCancelBtn="false"
    @register="register"
    :title="t('AbpUiMultiTenancy.SwitchTenant')"
    @ok="switchTenant"
  >
    <Form layout="vertical" :model="formModelRef">
      <FormItem :label="t('AbpUiMultiTenancy.SwitchTenantHint')">
        <Input :allowClear="true" v-model:value="formModelRef.tenantName" />
      </FormItem>
    </Form>
  </BasicModal>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { Button, Form, Input } from 'ant-design-vue';
  import { BasicModal, useModal } from '/@/components/Modal';
  import { Persistent } from '/@/utils/cache/persistent';

  import { findTenantByName } from '/@/api/multi-tenancy/tenants';

  import { useMessage } from '/@/hooks/web/useMessage';
  import { useI18n } from '/@/hooks/web/useI18n';

  import { useAbpStoreWidthOut } from '/@/store/modules/abp';

  export default defineComponent({
    name: 'MultiTenancyBox',
    components: {
      BasicModal,
      Button,
      Form,
      FormItem: Form.Item,
      Input,
      InputSearch: Input.Search,
    },
    setup() {
      const { t } = useI18n();
      const { createMessage } = useMessage();
      const [register, { openModal, closeModal }] = useModal();
      const formModelRef = ref({ tenantName: '' });

      return {
        formModelRef,
        register,
        openModal,
        closeModal,
        t,
        createMessage,
      };
    },
    methods: {
      handleSwitchTenant() {
        this.openModal(true, {}, true);
      },
      async switchTenant() {
        Persistent.setTenant('');
        if (this.formModelRef.tenantName) {
          const result = await findTenantByName(this.formModelRef.tenantName);
          Persistent.setTenant(result.tenantId);
          if (!result.success) {
            this.createMessage.warn(
              this.t('AbpUiMultiTenancy.GivenTenantIsNotAvailable', [this.formModelRef.tenantName])
            );
          }
        }
        const abpStore = useAbpStoreWidthOut();
        await abpStore.initlizeAbpApplication();
        this.closeModal();
      },
    },
  });
</script>
