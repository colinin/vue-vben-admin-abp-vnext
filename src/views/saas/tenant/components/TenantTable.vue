<template>
  <div>
    <BasicTable ref="tableElRef" @register="registerTable">
      <template #toolbar>
        <a-button
          v-if="hasPermission('AbpTenantManagement.Tenants.Create')"
          type="primary"
          @click="handleAddNew"
          >{{ t('AbpTenantManagement.NewTenant') }}</a-button
        >
        <a-button
          v-if="hasPermission('FeatureManagement.ManageHostFeatures')"
          type="primary"
          @click="handleManageHostFeature"
          >{{ t('AbpTenantManagement.ManageHostFeatures') }}</a-button
        >
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              auth: 'AbpTenantManagement.Tenants.Update',
              label: t('AbpUi.Edit'),
              icon: 'ant-design:edit-outlined',
              onClick: handleEdit.bind(null, record),
            },
            {
              auth: 'AbpTenantManagement.Tenants.Delete',
              color: 'error',
              label: t('AbpUi.Delete'),
              icon: 'ant-design:delete-outlined',
              onClick: handleDelete.bind(null, record),
            },
          ]"
          :dropDownActions="[
            {
              auth: 'FeatureManagement.ManageHostFeatures',
              label: t('AbpFeatureManagement.ManageFeatures'),
              onClick: handleManageTenantFeature.bind(null, record),
            },
            {
              auth: 'AbpTenantManagement.Tenants.ManageConnectionStrings',
              label: t('AbpTenantManagement.ConnectionStrings'),
              onClick: openConnectModal.bind(null, true, record),
            },
          ]"
        />
      </template>
    </BasicTable>
    <FeatureModal @register="registerFeatureModal" />
    <TenantModal @register="registerModal" @change="handleReload" />
    <TenantConnectionModal @register="registerConnectModal" />
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { usePermission } from '/@/hooks/web/usePermission';
  import { useModal } from '/@/components/Modal';
  import { BasicTable, TableAction, TableActionType } from '/@/components/Table';
  import { useTenantTable } from '../hooks/useTenantTable';
  import { useTenantModal } from '../hooks/useTenantModal';
  import { useFeatureModal } from '../hooks/useFeatureModal';
  import TenantModal from './TenantModal.vue';
  import TenantConnectionModal from './TenantConnectionModal.vue';
  import { FeatureModal } from '../../../feature';

  export default defineComponent({
    name: 'TenantTable',
    components: { BasicTable, FeatureModal, TableAction, TenantModal, TenantConnectionModal },
    setup() {
      const { t } = useI18n();
      const { hasPermission } = usePermission();
      const tableElRef = ref<Nullable<TableActionType>>(null);
      const [registerConnectModal, { openModal: openConnectModal }] = useModal();
      const { registerModal, handleAddNew, handleEdit } = useTenantModal();
      const { registerTable, handleDelete, handleReload } = useTenantTable({ tableElRef });
      const {
        registerModal: registerFeatureModal,
        handleManageHostFeature,
        handleManageTenantFeature,
      } = useFeatureModal();

      return {
        t,
        tableElRef,
        hasPermission,
        registerModal,
        registerConnectModal,
        openConnectModal,
        registerTable,
        handleAddNew,
        handleEdit,
        handleDelete,
        handleReload,
        registerFeatureModal,
        handleManageHostFeature,
        handleManageTenantFeature,
      };
    },
  });
</script>
