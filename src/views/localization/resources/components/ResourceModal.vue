<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    @ok="handleSubmit"
    :title="formTitle"
    :width="660"
    :min-height="300"
  >
    <BasicForm ref="formElRef" @register="registerForm" :model="modelRef" />
  </BasicModal>
</template>

<script lang="ts">
  import { computed, defineComponent, ref, unref, watch } from 'vue';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { message } from 'ant-design-vue';
  import { BasicForm, FormActionType, useForm } from '/@/components/Form';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { Resource } from '/@/api/localization/model/resourcesModel';
  import { get, create, update } from '/@/api/localization/resources';
  import { getModalFormSchemas } from './ModalData';
  export default defineComponent({
    name: 'ResourceModal',
    components: { BasicForm, BasicModal },
    emits: ['change', 'register'],
    setup(_props, { emit }) {
      const { t } = useI18n();
      const idRef = ref('');
      const modelRef = ref<Nullable<Resource>>(null);
      const formElRef = ref<Nullable<FormActionType>>(null);
      const [registerForm, { resetFields }] = useForm({
        colon: true,
        labelWidth: 120,
        schemas: getModalFormSchemas(),
        showActionButtonGroup: false,
        actionColOptions: {
          span: 24,
        },
      });
      const [registerModal, { closeModal, changeOkLoading }] = useModalInner((val) => {
        idRef.value = val.id;
        resetFields();
      });
      const formTitle = computed(() => {
        if (unref(modelRef)?.displayName) {
          return t('LocalizationManagement.EditByName', [
            unref(modelRef)?.displayName,
          ] as Recordable);
        }
        return t('LocalizationManagement.Resource:AddNew');
      });

      watch(
        () => unref(idRef),
        (id) => {
          if (id) {
            get(id).then((res) => {
              modelRef.value = res;
            });
          } else {
            modelRef.value = null;
          }
        }
      );

      function handleSubmit() {
        const formEl = unref(formElRef);
        formEl?.validate().then((input) => {
          changeOkLoading(true);
          const api = unref(idRef) ? update(unref(idRef), input) : create(input);
          api
            .then(() => {
              emit('change');
              message.success(t('AbpUi.Successful'));
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
        modelRef,
        formTitle,
        registerForm,
        registerModal,
        handleSubmit,
      };
    },
  });
</script>
