<template>
  <BasicTable @register="registerTable">
    <template #allow="{ record }">
      <Switch :checked="record.allowBeNull" disabled />
    </template>
    <template #action="{ record }">
      <TableAction
        :actions="[
          {
            auth: 'Platform.DataDictionary.Update',
            label: t('AbpUi.Edit'),
            icon: 'ant-design:edit-outlined',
            onClick: handleEdit.bind(null, record),
          },
          {
            auth: 'Platform.DataDictionary.ManageItems',
            color: 'error',
            label: t('AbpUi.Delete'),
            icon: 'ant-design:delete-outlined',
            onClick: handleDelete.bind(null, record),
          },
        ]"
      />
    </template>
    <template #toolbar>
      <a-button type="primary" @click="handleAppendItem">{{
        t('AppPlatform.Data:AppendItem')
      }}</a-button>
    </template>
  </BasicTable>
  <DataItemModal @register="registerModal" :data-id="getDataId" @change="handleItemChange" />
</template>

<script lang="ts">
  import { defineComponent, ref, createVNode } from 'vue';

  import { getDataColumns } from './TableData';
  import DataItemModal from './DataItemModal.vue';
  import { Modal, Switch } from 'ant-design-vue';
  import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { useModal } from '/@/components/Modal';

  import { useI18n } from '/@/hooks/web/useI18n';

  import { DataItem } from '/@/api/platform/model/dataItemModel';
  import { get, removeItem } from '/@/api/platform/dataDic';

  const props = {
    dataId: { type: String, retuired: true },
  } as const;

  export default defineComponent({
    name: 'DataItemTable',
    components: {
      BasicTable,
      TableAction,
      DataItemModal,
      Switch,
    },
    props,
    emits: ['reload'],
    setup() {
      const { t } = useI18n();
      const dataItems = ref<DataItem[]>([]);
      const [registerTable] = useTable({
        rowKey: 'id',
        title: t('AppPlatform.Data:Items'),
        columns: getDataColumns(),
        dataSource: dataItems,
        bordered: true,
        canResize: true,
        showTableSetting: true,
        rowSelection: { type: 'checkbox' },
        actionColumn: {
          width: 160,
          title: t('table.action'),
          dataIndex: 'action',
          slots: { customRender: 'action' },
        },
      });
      const [registerModal, { openModal }] = useModal();
      const getDataId = ref('');

      return {
        t,
        registerTable,
        dataItems,
        registerModal,
        openModal,
        getDataId,
      };
    },
    watch: {
      dataId(newVal) {
        this.getDataId = newVal;
        if (newVal) {
          this.handleGetItems(newVal);
        }
      },
    },
    methods: {
      handleGetItems(dataId: string) {
        get(dataId).then((res) => {
          this.dataItems = res.items;
        });
      },
      handleAppendItem() {
        this.openModal(true, {} as DataItem, true);
      },
      handleEdit(record: Recordable) {
        // 克隆对象过去,解决清除表单值后再次编辑为空值
        this.openModal(true, Object.assign({}, record), true);
      },
      handleDelete(record: Recordable) {
        Modal.confirm({
          title: this.t('AbpUi.AreYouSure'),
          icon: createVNode(ExclamationCircleOutlined),
          content: createVNode(
            'div',
            { style: 'color:red;' },
            this.t('AbpUi.ItemWillBeDeletedMessageWithFormat', [record.displayName] as Recordable),
          ),
          onOk: () => {
            removeItem(this.dataId!, record.name).then(() => {
              this.$emit('reload');
              this.handleItemChange(this.dataId!);
            });
          },
        });
      },
      handleItemChange(dataId: string) {
        this.handleGetItems(dataId);
      },
    },
  });
</script>
