<template>
  <div>
    <BasicTable @register="registerTable">
      <template #request="{ record }">
        <Tag :color="httpStatusCodeColor(record.httpStatusCode)">{{ record.httpStatusCode }}</Tag>
        <Tag style="margin-left: 5px" :color="httpMethodColor(record.httpMethod)">{{
          record.httpMethod
        }}</Tag>
        <span style="margin-left: 5px">{{ record.url }}</span>
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              auth: 'AbpAuditing.AuditLog',
              color: 'success',
              label: t('AbpAuditLogging.ShowLogDialog'),
              icon: 'ant-design:search-outlined',
              onClick: handleShow.bind(null, record),
            },
            {
              auth: 'AbpAuditing.AuditLog.Delete',
              color: 'error',
              label: t('AbpUi.Delete'),
              icon: 'ant-design:delete-outlined',
              onClick: handleDelete.bind(null, record),
            },
          ]"
        />
      </template>
    </BasicTable>
    <AuditLogModal @register="registerModal" />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { Modal, Tag } from 'ant-design-vue';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { BasicTable, TableAction, useTable } from '/@/components/Table';
  import { getDataColumns } from './TableData';
  import { getSearchFormSchemas } from './ModalData';
  import { useModal } from '/@/components/Modal';
  import AuditLogModal from './AuditLogModal.vue';
  import { useAuditLog } from '../hooks/useAuditLog';
  import { deleteById, getList } from '/@/api/auditing/auditLog';
  import { formatPagedRequest } from '/@/utils/http/abp/helper';

  export default defineComponent({
    name: 'AuditLogTable',
    components: { AuditLogModal, BasicTable, Tag, TableAction },
    setup() {
      const { t } = useI18n();
      const [registerTable, { reload }] = useTable({
        rowKey: 'id',
        title: t('AbpAuditLogging.AuditLog'),
        columns: getDataColumns(),
        api: getList,
        beforeFetch: formatPagedRequest,
        pagination: true,
        striped: false,
        useSearchForm: true,
        showTableSetting: true,
        bordered: true,
        showIndexColumn: false,
        canResize: false,
        immediate: true,
        formConfig: getSearchFormSchemas(),
        scroll: { x: true },
        actionColumn: {
          width: 180,
          title: t('table.action'),
          dataIndex: 'action',
          slots: { customRender: 'action' },
        },
      });
      const [registerModal, { openModal }] = useModal();
      const { httpMethodColor, httpStatusCodeColor } = useAuditLog();

      function handleShow(record) {
        openModal(true, record, true);
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
        httpMethodColor,
        httpStatusCodeColor,
        registerTable,
        registerModal,
        handleShow,
        handleDelete,
      };
    },
  });
</script>
