<template>
  <div class="content">
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button
          v-if="hasPermission('ApiGateway.Route.Create')"
          type="primary"
          @click="handleAddNew"
          >{{ t('ApiGateway.Route:AddNew') }}</a-button
        >
      </template>
      <template #methods="{ record }">
        <Tag
          style="margin-right: 10px; margin-bottom: 5px"
          v-for="method in record.upstreamHttpMethod"
          :key="method"
          :color="HttpMethods[method]"
        >
          {{ method }}
        </Tag>
      </template>
      <template #hosts="{ record }">
        <Tag
          style="margin-bottom: 5px"
          v-for="host in record.downstreamHostAndPorts"
          :key="host"
          color="blue"
        >
          {{ `${host.host}:${host.port}` }}
        </Tag>
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              auth: 'ApiGateway.Route.Update',
              label: t('AbpUi.Edit'),
              icon: 'ant-design:edit-outlined',
              onClick: handleEdit.bind(null, record),
            },
            {
              auth: 'ApiGateway.Route.Delete',
              color: 'error',
              label: t('AbpUi.Delete'),
              icon: 'ant-design:delete-outlined',
              onClick: handleDelete.bind(null, record),
            },
          ]"
        />
      </template>
    </BasicTable>
    <RouteModal @register="registerModal" @change="reloadTable" />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { usePermission } from '/@/hooks/web/usePermission';
  import { Modal, Tag } from 'ant-design-vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import RouteModal from './RouteModal.vue';
  import { useModal } from '/@/components/Modal';
  import { deleteById, getById, getList } from '/@/api/api-gateway/route';
  import { HttpMethods } from '/@/api/api-gateway/model/basicModel';
  import { getDataColumns } from './TableData';
  import { getSearchFormSchemas } from './ModalData';
  // import { formatPagedRequest } from '/@/utils/http/abp/helper';
  export default defineComponent({
    name: 'RouteTable',
    components: { BasicTable, RouteModal, Tag, TableAction },
    setup() {
      const { t } = useI18n();

      const { hasPermission } = usePermission();
      const [registerModal, { openModal }] = useModal();
      const [registerTable, { reload: reloadTable }] = useTable({
        rowKey: 'reRouteId',
        title: t('ApiGateway.Routes'),
        columns: getDataColumns(),
        api: getList,
        // beforeFetch: formatPagedRequest,
        pagination: true,
        striped: false,
        useSearchForm: true,
        showTableSetting: true,
        bordered: true,
        showIndexColumn: false,
        canResize: false,
        immediate: false,
        rowSelection: { type: 'checkbox' },
        formConfig: getSearchFormSchemas(),
        actionColumn: {
          width: 160,
          title: t('table.action'),
          dataIndex: 'action',
          slots: { customRender: 'action' },
        },
      });

      return {
        t,
        registerTable,
        reloadTable,
        registerModal,
        openModal,
        hasPermission,
        HttpMethods,
      };
    },
    methods: {
      handleAddNew() {
        this.openModal(true, {}, true);
      },
      handleEdit(record) {
        getById(record.reRouteId).then((route) => {
          this.openModal(true, route, true);
        });
      },
      handleDelete(record) {
        Modal.warning({
          title: this.t('AbpUi.AreYouSure'),
          content: this.t('AbpUi.ItemWillBeDeletedMessageWithFormat', [
            record.reRouteName,
          ] as Recordable),
          okCancel: true,
          onOk: () => {
            deleteById(record.reRouteId).then(() => {
              this.reloadTable();
            });
          },
        });
      },
    },
  });
</script>
