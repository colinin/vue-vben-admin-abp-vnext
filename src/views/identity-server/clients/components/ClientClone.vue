<template>
  <BasicModal
    v-bind="$attrs"
    :width="600"
    :height="300"
    :min-height="300"
    @register="registerModal"
    @ok="handleSubmit"
    :title="t('AbpIdentityServer.Client:Clone')"
  >
    <BasicForm ref="formElRef" @register="registerForm" />
  </BasicModal>
</template>

<script lang="ts">
  import { defineComponent, ref, unref } from 'vue';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { message } from 'ant-design-vue';
  import { BasicForm, useForm, FormActionType, FormSchema } from '/@/components/Form';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { clone } from '/@/api/identity-server/clients';

  export default defineComponent({
    name: 'ClientClone',
    components: { BasicForm, BasicModal },
    emits: ['change', 'register'],
    setup(_, { emit }) {
      const { t } = useI18n();
      const clientIdRef = ref('');
      const formElRef = ref<Nullable<FormActionType>>(null);
      const formSchemas: FormSchema[] = [
        {
          field: 'clientId',
          component: 'Input',
          label: t('AbpIdentityServer.Client:Id'),
          colProps: { span: 24 },
          required: true,
        },
        {
          field: 'clientName',
          component: 'Input',
          label: t('AbpIdentityServer.Name'),
          colProps: { span: 24 },
          required: true,
        },
        {
          field: 'description',
          component: 'InputTextArea',
          label: t('AbpIdentityServer.Description'),
          colProps: { span: 24 },
        },
        {
          field: 'copyAllowedGrantType',
          component: 'Checkbox',
          label: t('AbpIdentityServer.Clone:CopyAllowedGrantType'),
          labelWidth: 180,
          colProps: { span: 24 },
          defaultValue: true,
          renderComponentContent: t('AbpIdentityServer.Clone:CopyAllowedGrantType'),
        },
        {
          field: 'copyRedirectUri',
          component: 'Checkbox',
          label: t('AbpIdentityServer.Clone:CopyRedirectUri'),
          labelWidth: 180,
          colProps: { span: 24 },
          defaultValue: true,
          renderComponentContent: t('AbpIdentityServer.Clone:CopyRedirectUri'),
        },
        {
          field: 'copyAllowedScope',
          component: 'Checkbox',
          defaultValue: true,
          label: t('AbpIdentityServer.Clone:CopyAllowedScope'),
          labelWidth: 180,
          colProps: { span: 24 },
          renderComponentContent: t('AbpIdentityServer.Clone:CopyAllowedScope'),
        },
        {
          field: 'copyClaim',
          component: 'Checkbox',
          label: t('AbpIdentityServer.Clone:CopyClaim'),
          labelWidth: 180,
          colProps: { span: 24 },
          defaultValue: true,
          renderComponentContent: t('AbpIdentityServer.Clone:CopyClaim'),
        },
        {
          field: 'copySecret',
          component: 'Checkbox',
          label: t('AbpIdentityServer.Clone:CopySecret'),
          labelWidth: 180,
          colProps: { span: 24 },
          defaultValue: true,
          renderComponentContent: t('AbpIdentityServer.Clone:CopySecret'),
        },
        {
          field: 'copyAllowedCorsOrigin',
          component: 'Checkbox',
          label: t('AbpIdentityServer.Clone:CopyAllowedCorsOrigin'),
          labelWidth: 180,
          colProps: { span: 24 },
          defaultValue: true,
          renderComponentContent: t('AbpIdentityServer.Clone:CopyAllowedCorsOrigin'),
        },
        {
          field: 'copyPostLogoutRedirectUri',
          component: 'Checkbox',
          label: t('AbpIdentityServer.Clone:CopyPostLogoutRedirectUri'),
          labelWidth: 180,
          colProps: { span: 24 },
          defaultValue: true,
          renderComponentContent: t('AbpIdentityServer.Clone:CopyPostLogoutRedirectUri'),
        },
        {
          field: 'copyProperties',
          component: 'Checkbox',
          label: t('AbpIdentityServer.Clone:CopyProperties'),
          labelWidth: 180,
          colProps: { span: 24 },
          defaultValue: true,
          renderComponentContent: t('AbpIdentityServer.Clone:CopyProperties'),
        },
        {
          field: 'copyIdentityProviderRestriction',
          component: 'Checkbox',
          defaultValue: true,
          label: t('AbpIdentityServer.Clone:CopyIdentityProviderRestriction'),
          labelWidth: 180,
          colProps: { span: 24 },
          renderComponentContent: t('AbpIdentityServer.Clone:CopyIdentityProviderRestriction'),
        },
      ];
      const [registerForm] = useForm({
        labelWidth: 120,
        schemas: formSchemas,
        showActionButtonGroup: false,
      });
      const [registerModal, { closeModal, changeOkLoading }] = useModalInner((data) => {
        clientIdRef.value = data.id;
      });

      function handleSubmit() {
        const formEl = unref(formElRef);
        formEl?.validate().then((input) => {
          changeOkLoading(true);
          clone(unref(clientIdRef), input)
            .then(() => {
              message.success(t('AbpIdentityServer.Successful'));
              emit('change');
              closeModal();
            })
            .finally(() => {
              changeOkLoading(false);
            });
        });
      }

      return {
        t,
        formElRef,
        registerModal,
        registerForm,
        handleSubmit,
      };
    },
  });
</script>
