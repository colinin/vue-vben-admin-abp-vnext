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
      :colon="true"
      :schemas="getFormSchemas"
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
  import { message } from 'ant-design-vue';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { TabForm, FormActionType } from '/@/components/Form';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { useRouteFormContext } from '../hooks/useRouteFormContext';
  import { Route } from '/@/api/api-gateway/model/routeModel';

  export default defineComponent({
    name: 'RouteModal',
    components: { BasicModal, TabForm },
    emits: ['change', 'register'],
    setup() {
      const { t } = useI18n();
      const formModel = ref<Nullable<Route>>(null);
      const formElRef = ref<Nullable<FormActionType>>(null);

      const { getFormTitle, getFormSchemas, handleFormSubmit } = useRouteFormContext({
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
        closeModal,
        handleBusyModal,
        getFormTitle,
        getFormSchemas,
        handleFormSubmit,
      };
    },
    methods: {
      handleSubmit() {
        const formEl = unref(this.formElRef);
        formEl
          ?.validate()
          .then(() => {
            this.handleBusyModal(true);
            this.handleFormSubmit(formEl?.getFieldsValue())
              .then(() => {
                this.closeModal();
                this.$emit('change');
              })
              .finally(() => {
                this.handleBusyModal(false);
              });
          })
          .catch(() => {
            message.warning(this.t('AbpUi.YouMustEnterAllMustItemsBeforeSubmit'));
          });
      },
    },
  });
</script>
