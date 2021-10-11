<template>
  <div class="content">
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button
          v-if="hasPermission('AbpOssManagement.Container.Create')"
          type="primary"
          @click="handleAddNew"
          >{{ t('创建容器') }}</a-button
        >
      </template>
      <template #action="{ record }">
        <TableAction
          :stop-button-propagation="true"
          :actions="[
            {
              auth: 'AbpOssManagement.Container.Delete',
              color: 'error',
              label: t('AbpUi.Delete'),
              icon: 'ant-design:delete-outlined',
              onClick: handleDelete.bind(null, record),
            },
          ]"
        />
      </template>
    </BasicTable>
    <BasicModal
      @register="registerModal"
      :title="t('AbpOssManagement.Containers')"
      :width="466"
      :min-height="66"
      @ok="handleSubmit"
    >
      <BasicForm @register="registerForm" />
    </BasicModal>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, unref } from 'vue';
  import { Modal, message } from 'ant-design-vue';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { usePermission } from '/@/hooks/web/usePermission';
  import { BasicModal, useModal } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form';
  import { BasicTable, TableAction, useTable } from '/@/components/Table';
  import { createContainer, deleteContainer, getContainers } from '/@/api/oss-management/oss';
  import { getDataColumns } from './TableData';
  import { getSearchFormSchemas, getModalFormSchemas } from './ModalData';

  export default defineComponent({
    name: 'ContainerTable',
    components: {
      BasicForm,
      BasicModal,
      BasicTable,
      TableAction,
    },
    setup() {
      const { t } = useI18n();
      const marker = ref('');
      const { hasPermission } = usePermission();
      const [registerModal, { openModal, closeModal }] = useModal();
      const [registerForm, { validate, resetFields }] = useForm({
        labelWidth: 120,
        schemas: getModalFormSchemas(),
        showActionButtonGroup: false,
        actionColOptions: {
          span: 24,
        },
      });
      const [registerTable, { reload }] = useTable({
        rowKey: 'name',
        title: t('AbpOssManagement.Containers'),
        columns: getDataColumns(),
        api: getContainers,
        fetchSetting: {
          pageField: 'skipCount',
          sizeField: 'maxResultCount',
          listField: 'containers',
          totalField: 'maxKeys',
        },
        beforeFetch: (request) => {
          request.marker = request.skipCount === 1 ? '' : unref(marker);
        },
        pagination: true,
        striped: false,
        useSearchForm: true,
        showTableSetting: true,
        bordered: true,
        showIndexColumn: false,
        canResize: false,
        immediate: true,
        rowSelection: { type: 'checkbox' },
        formConfig: getSearchFormSchemas(),
        actionColumn: {
          width: 120,
          title: t('table.action'),
          dataIndex: 'action',
          slots: { customRender: 'action' },
        },
      });

      function handleAddNew() {
        resetFields();
        openModal(true, {});
      }

      function handleDelete(record) {
        Modal.warning({
          title: t('AbpUi.AreYouSure'),
          content: t('AbpUi.ItemWillBeDeletedMessage'),
          okCancel: true,
          onOk: () => {
            deleteContainer(record.name).then(() => {
              message.success(t('AbpUi.Successful'));
              reload();
            });
          },
        });
      }

      function handleSubmit() {
        validate().then((input) => {
          createContainer(input.name).then(() => {
            message.success(t('AbpUi.Successful'));
            closeModal();
            reload();
          });
        });
      }

      return {
        t,
        hasPermission,
        registerTable,
        registerForm,
        registerModal,
        openModal,
        handleAddNew,
        handleDelete,
        handleSubmit,
      };
    },
  });
</script>
