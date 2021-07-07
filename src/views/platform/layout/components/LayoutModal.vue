<template>
  <BasicModalForm
    @register="register"
    :form-items="formItems"
    :save-changes="handleSaveChanges"
    :title="title"
  />
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';

  import { useI18n } from '/@/hooks/web/useI18n';
  import { useModalInner } from '/@/components/Modal';
  import { BasicModalForm } from '/@/components/ModalForm';
  import { getModalFormSchemas } from './ModalData';
  import { Layout } from '/@/api/platform/model/layoutModel';
  import { create, update } from '/@/api/platform/layout';

  export default defineComponent({
    name: 'LayoutModal',
    components: {
      BasicModalForm,
    },
    emits: ['change', 'register'],
    setup() {
      const { t } = useI18n();
      const layout = ref<Layout>({} as Layout);
      const formItems = getModalFormSchemas(layout.value);
      const [register, { closeModal }] = useModalInner((dataVal) => {
        layout.value = dataVal;
      });

      return {
        t,
        layout,
        register,
        closeModal,
        formItems,
      };
    },
    computed: {
      title: function () {
        if (this.layout.id) {
          return '编辑';
        }
        return '新增';
      },
    },
    methods: {
      handleSaveChanges(data) {
        const api =
          data.id === undefined
            ? create({
                dataId: data.dataId,
                framework: data.framework,
                name: data.name,
                displayName: data.displayName,
                description: data.description,
                redirect: data.redirect,
                path: data.path,
              })
            : update(data.id, {
                name: data.name,
                displayName: data.displayName,
                description: data.description,
                redirect: data.redirect,
                path: data.path,
              });
        return api.then(() => {
          this.$emit('change');
        });
      },
    },
  });
</script>
