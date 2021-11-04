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
    @register="registerModal"
    :title="t('AbpUiMultiTenancy.SwitchTenant')"
    @ok="switchToTenant"
  >
    <Form layout="vertical" :model="formModelRef">
      <FormItem :label="t('AbpUiMultiTenancy.SwitchTenantHint')">
        <BInput :allowClear="true" v-model:value="formModelRef.tenantName" />
      </FormItem>
    </Form>
  </BasicModal>
</template>

<script lang="ts">
  import { defineComponent, ref, unref, onMounted } from 'vue';
  import { Button, Form, Input } from 'ant-design-vue';
  import { Input as BInput } from '/@/components/Input';
  import { BasicModal, useModal } from '/@/components/Modal';
  import { Persistent } from '/@/utils/cache/persistent';

  import { findTenantByName, findTenantById } from '/@/api/multi-tenancy/tenants';

  import { useMessage } from '/@/hooks/web/useMessage';
  import { useI18n } from '/@/hooks/web/useI18n';

  import { useAbpStoreWithOut } from '/@/store/modules/abp';

  export default defineComponent({
    name: 'MultiTenancyBox',
    components: {
      BasicModal,
      Button,
      Form,
      FormItem: Form.Item,
      BInput,
      InputSearch: Input.Search,
    },
    setup() {
      const { t } = useI18n();
      const { createMessage } = useMessage();
      const [registerModal, { openModal, closeModal }] = useModal();
      const formModelRef = ref({ tenantName: '' });

      onMounted(() => {
        const tenantId = Persistent.getTenant();
        if (tenantId) {
          findTenantById(tenantId).then((res) => {
            formModelRef.value.tenantName = res.name;
          });
        }
      });

      function handleSwitchTenant() {
        openModal(true, {}, true);
      }

      async function switchToTenant() {
        Persistent.setTenant('');
        const formModel = unref(formModelRef);
        if (formModel.tenantName) {
          const result = await findTenantByName(formModel.tenantName);
          Persistent.setTenant(result.tenantId);
          if (!result.success) {
            createMessage.warn(
              t('AbpUiMultiTenancy.GivenTenantIsNotAvailable', [formModel.tenantName]),
            );
          }
        }
        const abpStore = useAbpStoreWithOut();
        await abpStore.initlizeAbpApplication();
        closeModal();
      }

      return {
        t,
        formModelRef,
        registerModal,
        switchToTenant,
        handleSwitchTenant,
      };
    },
  });
</script>
