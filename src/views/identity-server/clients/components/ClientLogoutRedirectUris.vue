<template>
  <DynamicForm
    :title="t('AbpIdentityServer.Client:PostLogoutRedirectUris')"
    :schemas="schemas"
    :columns="columns"
    :data-source="modelRef.postLogoutRedirectUris"
    rowKey="postLogoutRedirectUri"
    @new="handleAddNew"
    @delete="handleDelete"
  />
</template>

<script lang="ts">
  import { defineComponent, toRefs } from 'vue';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { FormSchema } from '/@/components/Form';
  import { BasicColumn } from '/@/components/Table';
  import { Client } from '/@/api/identity-server/model/clientsModel';
  import DynamicForm from './DynamicForm.vue';
  import { useUrl } from '../hooks/useUrl';

  export default defineComponent({
    name: 'ClientLogoutRedirectUris',
    components: { DynamicForm },
    props: {
      modelRef: {
        type: Object as PropType<Client>,
        required: true,
      },
    },
    setup(props) {
      const { t } = useI18n();
      const schemas: FormSchema[] = [
        {
          field: 'postLogoutRedirectUri',
          component: 'Input',
          label: 'Url',
          colProps: { span: 24 },
          required: true,
        },
      ];
      const columns: BasicColumn[] = [
        {
          dataIndex: 'postLogoutRedirectUri',
          align: 'left',
          width: 'auto',
          sorter: true,
        },
      ];
      const { handleLogoutRedirectUris } = useUrl({ modelRef: toRefs(props).modelRef });

      function handleAddNew(record) {
        handleLogoutRedirectUris('add', record.postLogoutRedirectUri);
      }

      function handleDelete(record) {
        handleLogoutRedirectUris('delete', record.postLogoutRedirectUri);
      }

      return {
        t,
        schemas,
        columns,
        handleAddNew,
        handleDelete,
      };
    },
  });
</script>
