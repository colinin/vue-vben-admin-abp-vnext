<template>
  <div>
    <BasicTitle class="title">{{ title }}</BasicTitle>
    <BasicForm @register="registerForm" @submit="handleSubmit" />
    <BasicTable @register="registerTable">
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              color: 'error',
              icon: 'ant-design:delete-outlined',
              label: t('AbpIdentityServer.Delete'),
              onClick: handleDelete.bind(null, record),
            },
          ]"
        />
      </template>
    </BasicTable>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, watch } from 'vue';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { BasicTitle } from '/@/components/Basic';
  import { BasicForm, FormSchema, useForm } from '/@/components/Form';
  import { BasicTable, BasicColumn, TableAction, useTable } from '/@/components/Table';

  export default defineComponent({
    name: 'DynamicForm',
    components: { BasicForm, BasicTitle, BasicTable, TableAction },
    props: {
      schemas: {
        type: [Array] as PropType<FormSchema[]>,
        required: true,
        default: () => [],
      },
      labelWidth: {
        type: Number,
      },
      columns: {
        type: [Array] as PropType<BasicColumn[]>,
        required: true,
        default: () => [],
      },
      dataSource: {
        type: [Array] as PropType<Recordable[]>,
        required: true,
        default: () => [],
      },
      rowKey: {
        type: String,
        default: () => 'id',
      },
      showHeader: {
        type: Boolean,
        default: () => false,
      },
      title: {
        type: String,
        default: () => '',
      },
      tableTitle: {
        type: String,
        default: () => '',
      },
    },
    emits: ['new', 'delete'],
    setup(props, { emit }) {
      const { t } = useI18n();
      const modelRef = ref({});
      const [registerForm, { resetFields }] = useForm({
        model: modelRef,
        labelWidth: props.labelWidth,
        schemas: props.schemas,
        showResetButton: false,
        submitButtonOptions: {
          text: t('AbpIdentityServer.AddNew'),
          // icon: 'ant-design:plus-outlined',
        },
      });
      const [registerTable, { setTableData }] = useTable({
        rowKey: props.rowKey,
        showHeader: props.showHeader,
        title: props.tableTitle,
        columns: props.columns,
        dataSource: props.dataSource,
        pagination: false,
        striped: false,
        useSearchForm: false,
        showTableSetting: false,
        showIndexColumn: false,
        bordered: false,
        actionColumn: {
          width: 200,
          title: t('table.action'),
          dataIndex: 'action',
          slots: { customRender: 'action' },
        },
      });

      watch(
        () => props.dataSource,
        (data) => {
          setTableData(data);
        },
        {
          deep: true,
        }
      );

      function handleSubmit(input) {
        emit('new', input);
        resetFields();
      }

      function handleDelete(record) {
        emit('delete', record);
      }

      return {
        t,
        registerForm,
        registerTable,
        handleSubmit,
        handleDelete,
      };
    },
  });
</script>

<style lang="less" scoped>
  .title {
    margin-bottom: 20px;
  }
</style>
