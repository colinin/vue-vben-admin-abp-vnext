<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    :title="userTitle"
    @ok="handleSubmit"
    :width="800"
    :min-height="400"
  >
    <TabForm
      ref="formElRef"
      :colon="true"
      :schemas="userSchemas"
      :label-width="180"
      :show-action-button-group="false"
      :action-col-options="{
        span: 24,
      }"
    />
  </BasicModal>
</template>

<script lang="ts">
  import { defineComponent, ref, unref } from 'vue';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { TabForm, FormActionType } from '/@/components/Form';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { useUserForm } from '../hooks/useUserForm';

  export default defineComponent({
    name: 'UserModal',
    components: { BasicModal, TabForm },
    emits: ['register', 'change'],
    setup() {
      const { t } = useI18n();
      const userIdRef = ref<Nullable<string>>(null);
      const formElRef = ref<Nullable<FormActionType>>(null);
      const { handleSaveUser, userSchemas, userTitle, warpAssignableRoles } = useUserForm({
        userIdRef,
        formElRef,
      });
      const [registerModal, { closeModal }] = useModalInner(async (val) => {
        userIdRef.value = val.id ?? null;
        await warpAssignableRoles();
      });

      return {
        t,
        formElRef,
        userSchemas,
        userTitle,
        handleSaveUser,
        registerModal,
        closeModal,
      };
    },
    methods: {
      handleSubmit() {
        const formEl = unref(this.formElRef);
        formEl?.validate().then(() => {
          this.handleSaveUser(formEl.getFieldsValue()).then(() => {
            this.$emit('change');
            this.closeModal();
          });
        });
      },
    },
  });
</script>
