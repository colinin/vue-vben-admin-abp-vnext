<template>
  <BasicModal
    v-bind="$attrs"
    @register="register"
    :title="t('ApiGateway.AggregateRoute:ManageRouteConfig')"
    :width="800"
    :showCancelBtn="false"
    :showOkBtn="false"
  >
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button
          v-if="hasPermission('ApiGateway.AggregateRoute.ManageRouteConfig')"
          type="primary"
          @click="handleAddNew"
          >{{ t('ApiGateway.AggregateRoute:ManageRouteConfig') }}</a-button
        >
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              auth: 'ApiGateway.AggregateRoute.ManageRouteConfig',
              label: t('AbpUi.Edit'),
              icon: 'ant-design:edit-outlined',
              onClick: handleEdit.bind(null, record),
            },
            {
              auth: 'ApiGateway.AggregateRoute.ManageRouteConfig',
              color: 'error',
              label: t('AbpUi.Delete'),
              icon: 'ant-design:delete-outlined',
              onClick: handleDelete.bind(null, record),
            },
          ]"
        />
      </template>
    </BasicTable>
    <BasicModalForm
      @register="registerModal"
      :save-changes="handleSaveChanges"
      :form-items="formItems"
      :title="formTitle"
    />
  </BasicModal>
</template>

<script lang="ts">
  import { defineComponent, watch, ref, unref } from 'vue';
  import { cloneDeep } from 'lodash-es';
  import { BasicModal, useModal, useModalInner } from '/@/components/Modal';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { usePermission } from '/@/hooks/web/usePermission';
  import { BasicModalForm } from '/@/components/ModalForm';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { getConfigModalFormSchemas } from './ModalData';
  import { getConfigDataColumns } from './TableData';
  import {
    AggregateRouteConfig,
    CreateAggregateRouteConfig,
  } from '/@/api/api-gateway/model/aggregateModel';
  import { createConfig, deleteConfig, getById } from '/@/api/api-gateway/aggregate';
  export default defineComponent({
    name: 'AggregateRouteConfigModal',
    components: { BasicModal, BasicModalForm, BasicTable, TableAction },
    props: {
      routeId: { type: String, required: true },
    },
    emits: ['register'],
    setup(props) {
      const { t } = useI18n();
      const { hasPermission } = usePermission();
      const dataSource = ref<AggregateRouteConfig[]>([]);
      const formItems = getConfigModalFormSchemas();
      const formTitle = t('ApiGateway.AggregateRoute:ManageRouteConfig');
      const [register] = useModalInner();
      const [registerModal, { openModal }] = useModal();
      const [registerTable, { reload: reloadTable }] = useTable({
        rowKey: 'reRouteId',
        title: t('ApiGateway.AggregateRoute:ManageRouteConfig'),
        columns: getConfigDataColumns(),
        dataSource: dataSource,
        // beforeFetch: formatPagedRequest,
        pagination: false,
        striped: false,
        useSearchForm: false,
        showTableSetting: true,
        bordered: true,
        showIndexColumn: false,
        canResize: false,
        immediate: true,
        rowSelection: { type: 'checkbox' },
        actionColumn: {
          width: 160,
          title: t('table.action'),
          dataIndex: 'action',
          slots: { customRender: 'action' },
        },
      });

      watch(
        () => unref(props.routeId),
        (id) => {
          if (id) {
            getById(id).then((res) => {
              dataSource.value = res.reRouteKeysConfig;
            });
          }
        },
      );

      return {
        t,
        register,
        hasPermission,
        formItems,
        formTitle,
        registerModal,
        openModal,
        registerTable,
        reloadTable,
      };
    },
    methods: {
      handleAddNew() {
        this.openModal(
          true,
          {
            routeId: this.$props.routeId,
          },
          true,
        );
      },
      handleEdit(record) {
        this.openModal(true, record, true);
      },
      handleDelete(record) {
        deleteConfig(record.routeId, record.reRouteKey).then(() => {
          this.reloadTable();
        });
      },
      handleSaveChanges(val) {
        const api = createConfig(cloneDeep(val) as CreateAggregateRouteConfig);
        return api.then(() => {
          this.reloadTable();
        });
      },
    },
  });
</script>
