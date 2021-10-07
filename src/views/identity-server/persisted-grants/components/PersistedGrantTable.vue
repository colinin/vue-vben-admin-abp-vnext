<template>
  <div>
    <BasicTable @register="registerTable">
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              color: 'success',
              icon: 'ant-design:search-outlined',
              label: '明细',
              onClick: handleShow.bind(null, record),
            },
            {
              auth: 'AbpIdentityServer.Grants.Delete',
              color: 'error',
              icon: 'ant-design:delete-outlined',
              label: t('AbpIdentityServer.Grants:Delete'),
              onClick: handleDelete.bind(null, record),
            },
          ]"
        />
      </template>
    </BasicTable>
    <PersistedGrantModal @register="registerModal" />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { Modal } from 'ant-design-vue';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { BasicTable, TableAction, useTable } from '/@/components/Table';
  import { useModal } from '/@/components/Modal';
  import { getDataColumns } from './TableData';
  import { getSearchFormSchemas } from './ModalData';
  import { deleteById, getList } from '/@/api/identity-server/persistedGrants';
  import { formatPagedRequest } from '/@/utils/http/abp/helper';
  import PersistedGrantModal from './PersistedGrantModal.vue';

  export default defineComponent({
    name: 'PersistedGrantTable',
    components: { BasicTable, TableAction, PersistedGrantModal },
    setup() {
      const { t } = useI18n();
      const [registerModal, { openModal }] = useModal();
      const [registerTable, { reload }] = useTable({
        rowKey: 'id',
        title: t('AbpIdentityServer.DisplayName:PersistedGrants'),
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
          width: 160,
          title: t('table.action'),
          dataIndex: 'action',
          slots: { customRender: 'action' },
        },
      });

      function handleShow(record) {
        openModal(true, record);
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
        handleDelete,
        handleShow,
      };
    },
  });
</script>
