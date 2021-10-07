<template>
  <div>
    <BasicTable @register="registerTable">
      <template #enabled="{ record }">
        <Switch :checked="record.enabled" disabled />
      </template>
      <template #discovery="{ record }">
        <Switch :checked="record.showInDiscoveryDocument" disabled />
      </template>
      <template #toolbar>
        <Button type="primary" @click="handleAddNew">{{
          t('AbpIdentityServer.Resource:New')
        }}</Button>
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              auth: 'AbpIdentityServer.ApiResources.Update',
              icon: 'ant-design:edit-outlined',
              label: t('AbpIdentityServer.Resource:Edit'),
              onClick: handleEdit.bind(null, record),
            },
            {
              auth: 'AbpIdentityServer.ApiResources.Delete',
              color: 'error',
              icon: 'ant-design:delete-outlined',
              label: t('AbpIdentityServer.Resource:Delete'),
              onClick: handleDelete.bind(null, record),
            },
          ]"
        />
      </template>
    </BasicTable>
    <ApiResourceModal @register="registerModal" @change="handleChange" />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { Button, Modal, Switch } from 'ant-design-vue';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { BasicTable, TableAction, useTable } from '/@/components/Table';
  import { useModal } from '/@/components/Modal';
  import { getDataColumns } from '../datas/TableData';
  import { getSearchFormSchemas } from '../datas/ModalData';
  import { deleteById, getList } from '/@/api/identity-server/apiResources';
  import { formatPagedRequest } from '/@/utils/http/abp/helper';
  import ApiResourceModal from './ApiResourceModal.vue';

  export default defineComponent({
    name: 'ApiResourceTable',
    components: { ApiResourceModal, BasicTable, Button, Switch, TableAction },
    setup() {
      const { t } = useI18n();
      const [registerModal, { openModal, closeModal }] = useModal();
      const [registerTable, { reload }] = useTable({
        rowKey: 'id',
        title: t('AbpIdentityServer.Resource:Api'),
        columns: getDataColumns(),
        api: getList,
        beforeFetch: formatPagedRequest,
        pagination: true,
        striped: false,
        useSearchForm: true,
        showTableSetting: true,
        bordered: true,
        showIndexColumn: false,
        canResize: true,
        immediate: true,
        canColDrag: true,
        formConfig: getSearchFormSchemas(),
        actionColumn: {
          width: 200,
          title: t('table.action'),
          dataIndex: 'action',
          slots: { customRender: 'action' },
        },
      });

      function handleAddNew() {
        openModal(true, {});
      }

      function handleEdit(record) {
        openModal(true, record);
      }

      function handleChange() {
        closeModal();
        reload();
      }

      function handleDelete(record) {
        Modal.warning({
          title: t('AbpUi.AreYouSure'),
          content: t('AbpUi.ItemWillBeDeletedMessage'),
          okCancel: true,
          onOk: () => {
            deleteById(record.id).then(() => {
              reload();
            });
          },
        });
      }

      return {
        t,
        registerModal,
        registerTable,
        handleAddNew,
        handleDelete,
        handleEdit,
        handleChange,
      };
    },
  });
</script>
