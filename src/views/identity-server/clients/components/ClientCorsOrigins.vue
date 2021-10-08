<template>
  <DynamicForm
    :title="t('AbpIdentityServer.Client:AllowedCorsOrigins')"
    :schemas="schemas"
    :columns="columns"
    :data-source="modelRef.allowedCorsOrigins"
    rowKey="origin"
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
    name: 'ClientCorsOrigins',
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
          field: 'origin',
          component: 'Input',
          label: 'Url',
          colProps: { span: 24 },
          required: true,
        },
      ];
      const columns: BasicColumn[] = [
        {
          dataIndex: 'origin',
          align: 'left',
          width: 'auto',
          sorter: true,
        },
      ];
      const { handleCorsOriginsChange } = useUrl({ modelRef: toRefs(props).modelRef });

      function handleAddNew(record) {
        handleCorsOriginsChange('add', record.origin);
      }

      function handleDelete(record) {
        handleCorsOriginsChange('delete', record.origin);
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
