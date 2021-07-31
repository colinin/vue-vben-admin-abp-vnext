<template>
  <div class="content">
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button
          v-if="hasPermission('AbpIdentity.Roles.Create')"
          type="primary"
          @click="handleAddNew"
          >{{ t('AbpIdentity.NewRole') }}</a-button
        >
      </template>
      <template #action="{ record }">
        <TableAction
          :stop-button-propagation="true"
          :actions="[
            {
              auth: 'AbpIdentity.Roles.Update',
              label: t('AbpUi.Edit'),
              icon: 'ant-design:edit-outlined',
              onClick: handleEdit.bind(null, record),
            },
            {
              auth: 'AbpIdentity.Roles.Delete',
              color: 'error',
              label: t('AbpUi.Delete'),
              icon: 'ant-design:delete-outlined',
              ifShow: !record.isStatic,
              onClick: handleDelete.bind(null, record),
            },
          ]"
          :dropDownActions="[
            {
              auth: 'AbpIdentity.Roles.ManagePermissions',
              label: t('AbpIdentity.Permissions'),
              onClick: showPermissionModal.bind(null, record.name),
            },
            {
              auth: 'AbpIdentity.Users.ManageClaims',
              label: t('AbpIdentity.Claim'),
              onClick: openClaimModal.bind(null, true, record, true),
            },
          ]"
        />
      </template>
    </BasicTable>
    <RoleModal @register="registerModal" @change="reloadTable" />
    <PermissionModal @register="registerPermissionModal" />
    <ClaimModal @register="registerClaimModal" />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { usePermission } from '/@/hooks/web/usePermission';
  import { useModal } from '/@/components/Modal';
  import RoleModal from './RoleModal.vue';
  import ClaimModal from './ClaimModal.vue';
  import { PermissionModal } from '/@/components/Permission';
  import { BasicTable, TableAction } from '/@/components/Table';
  import { useRoleTable } from '../hooks/useRoleTable';
  import { usePermission as usePermissionModal } from '../hooks/usePermission';

  export default defineComponent({
    name: 'RoleTable',
    components: {
      BasicTable,
      ClaimModal,
      RoleModal,
      TableAction,
      PermissionModal,
    },
    setup() {
      const { t } = useI18n();
      const { hasPermission } = usePermission();
      const [registerModal, { openModal }] = useModal();
      const [registerClaimModal, { openModal: openClaimModal }] = useModal();
      const { registerTable, reloadTable, handleDelete } = useRoleTable();
      const { registerModel: registerPermissionModal, showPermissionModal } = usePermissionModal();

      return {
        t,
        hasPermission,
        registerTable,
        reloadTable,
        registerModal,
        openModal,
        registerClaimModal,
        openClaimModal,
        registerPermissionModal,
        showPermissionModal,
        handleDelete,
      };
    },
    methods: {
      handleAddNew() {
        this.openModal(true, {}, true);
      },
      handleEdit(record) {
        this.openModal(true, record, true);
      },
    },
  });
</script>
