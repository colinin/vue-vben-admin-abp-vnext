<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    :title="getFormTitle"
    @ok="handleSubmit"
    :width="800"
    :min-height="400"
  >
    <TabForm
      ref="formElRef"
      :schemas="getFormSchemas"
      :label-width="120"
      :show-action-button-group="false"
      :base-col-props="{
        span: 24,
      }"
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
  import { useGlobalFormContext } from '../hooks/useGlobalFormContext';
  import { GlobalConfiguration } from '/@/api/api-gateway/model/globalModel';

  export default defineComponent({
    name: '',
    components: { BasicModal, TabForm },
    emits: ['change', 'register'],
    setup() {
      const { t } = useI18n();
      const formModel = ref<Nullable<GlobalConfiguration>>(null);
      const formElRef = ref<Nullable<FormActionType>>(null);

      const { getFormTitle, getFormSchemas, handleFormSubmit } = useGlobalFormContext({
        formModel,
        formElRef,
      });
      const [registerModal, { setModalProps, closeModal }] = useModalInner((val) => {
        formModel.value = val;
      });
      function handleBusyModal(busy: boolean) {
        setModalProps({
          loading: busy,
          confirmLoading: busy,
          showCancelBtn: !busy,
          closable: !busy,
        });
      }

      return {
        t,
        formModel,
        formElRef,
        registerModal,
        handleBusyModal,
        closeModal,
        getFormTitle,
        getFormSchemas,
        handleFormSubmit,
      };
    },
    methods: {
      handleSubmit() {
        this.handleBusyModal(true);
        const formEl = unref(this.formElRef);
        const model = formEl?.getFieldsValue();
        this.handleFormSubmit(model)
          .then(() => {
            this.$emit('change');
            this.closeModal();
          })
          .finally(() => {
            this.handleBusyModal(false);
          });
      },
    },
  });
</script>
