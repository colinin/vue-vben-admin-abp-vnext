<template>
  <BasicModal
    @register="registerModal"
    :title="t('AbpOssManagement.Objects:CreateFolder')"
    :width="466"
    :min-height="66"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>

<script lang="ts">
  import { defineComponent, ref, unref } from 'vue';
  import { message } from 'ant-design-vue';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form';
  import { getFolderModalSchemas } from '../datas/ModalData';
  import { createObject } from '/@/api/oss-management/oss';

  export default defineComponent({
    name: 'OssFolderModal',
    components: { BasicModal, BasicForm },
    emits: ['register', 'change'],
    setup(_, { emit }) {
      const { t } = useI18n();
      const bucket = ref('');
      const path = ref('');
      const [registerForm, { validate, resetFields }] = useForm({
        labelWidth: 120,
        schemas: getFolderModalSchemas(),
        showActionButtonGroup: false,
        actionColOptions: {
          span: 24,
        },
      });
      const [registerModal, { closeModal }] = useModalInner((data) => {
        resetFields();
        path.value = data.path;
        bucket.value = data.bucket;
      });

      function handleSubmit() {
        validate().then((input) => {
          const name = input.name.endsWith('/') ? input.name : input.name + '/';
          createObject({
            bucket: unref(bucket),
            path: unref(path),
            object: name,
            overwrite: false,
          }).then(() => {
            message.success(t('AbpUi.Successful'));
            closeModal();
            emit('change', name);
          });
        });
      }

      return {
        t,
        registerForm,
        registerModal,
        handleSubmit,
      };
    },
  });
</script>
