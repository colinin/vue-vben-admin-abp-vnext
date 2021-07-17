<template>
  <BasicModalForm
    @register="registerModal"
    :save-changes="handleSaveChanges"
    :form-items="formItems"
    :title="formTitle"
  />
</template>

<script lang="ts">
  import { defineComponent, computed, ref, unref } from 'vue';

  import { useModal } from '/@/components/Modal';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { BasicModalForm } from '/@/components/ModalForm';
  import { getModalFormSchemas } from './ModalData';
  import { RouteGroup } from '/@/api/api-gateway/model/groupModel';
  export default defineComponent({
    name: 'GroupModal',
    components: { BasicModalForm },
    setup() {
      const { t } = useI18n();
      const formModel = ref<Nullable<RouteGroup>>(null);
      const formItems = getModalFormSchemas();
      const formTitle = computed(() => {
        const model = unref(formModel);
        if (model && model.id) {
          return t('ApiGateway.Group:EditByName', [model.name] as Recordable);
        }
        return t('ApiGateway.Group:AddNew');
      });
      const [registerModal, { openModal }] = useModal();

      return {
        formItems,
        formTitle,
        registerModal,
        openModal,
      };
    },
    methods: {
      handleSaveChanges(val) {
        console.log(val);
      },
    },
  });
</script>
