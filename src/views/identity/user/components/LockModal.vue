<template>
  <BasicModalForm
    @register="registerModal"
    :save-changes="handleSaveChanges"
    :form-items="formSchemas"
    :title="t('AbpIdentity.Lockout')"
  />
</template>

<script lang="ts">
  import { defineComponent, ref, unref } from 'vue';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { BasicModalForm } from '/@/components/ModalForm';
  import { useModalInner } from '/@/components/Modal';

  import { useLock } from '../hooks/useLock';

  export default defineComponent({
    name: 'LockModal',
    components: { BasicModalForm },
    emits: ['change', 'register'],
    setup(_props, { emit }) {
      const { t } = useI18n();
      const userIdRef = ref('');
      const { formSchemas, handleLock } = useLock({ emit });
      const [registerModal, { closeModal }] = useModalInner((val) => {
        userIdRef.value = val.userId;
      });

      function handleSaveChanges(input) {
        return handleLock(unref(userIdRef), input).then(() => {
          closeModal();
        });
      }

      return {
        t,
        formSchemas,
        handleLock,
        handleSaveChanges,
        registerModal,
      };
    },
  });
</script>
