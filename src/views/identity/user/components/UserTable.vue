<template>
  <div class="content">
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button
          v-if="hasPermission('AbpIdentity.Users.Create')"
          type="primary"
          @click="handleAddNew"
          >{{ t('AbpIdentity.NewUser') }}</a-button
        >
      </template>
      <template #phoneNumberConfirmed="{ record }">
        <Tag
          style="margin-right: 10px; margin-bottom: 5px"
          :color="record.phoneNumberConfirmed ? 'green' : 'orange'"
        >
          {{ record.phoneNumberConfirmed }}
        </Tag>
      </template>
      <template #emailConfirmed="{ record }">
        <Tag
          style="margin-right: 10px; margin-bottom: 5px"
          :color="record.emailConfirmed ? 'green' : 'orange'"
        >
          {{ record.emailConfirmed }}
        </Tag>
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              auth: 'AbpIdentity.Users.Update',
              label: t('AbpUi.Edit'),
              icon: 'ant-design:edit-outlined',
              onClick: handleEdit.bind(null, record),
            },
            {
              auth: 'AbpIdentity.Users.Delete',
              color: 'error',
              label: t('AbpUi.Delete'),
              icon: 'ant-design:delete-outlined',
              onClick: handleDelete.bind(null, record),
            },
          ]"
          :dropDownActions="[
            {
              auth: 'AbpIdentity.Users.Update',
              label: t('AbpIdentity.Lockout'),
              ifShow: lockEnable(record),
              onClick: showLockModal.bind(null, record.id),
            },
            {
              auth: 'AbpIdentity.Users.Update',
              label: t('AbpIdentity.UnLock'),
              ifShow: record.lockoutEnabled && !lockEnable(record),
              onClick: handleUnlock.bind(null, record),
            },
            {
              auth: 'AbpIdentity.Users.ManagePermissions',
              label: t('AbpIdentity.Permissions'),
              onClick: showPermissionModal.bind(null, record.id),
            },
            {
              auth: 'AbpIdentity.Users.ManageClaims',
              label: t('AbpIdentity.Claim'),
              onClick: openClaimModal.bind(null, true, record, true),
            },
            {
              auth: 'AbpIdentity.Users.Update',
              label: t('AbpIdentity.SetPassword'),
              onClick: showPasswordModal.bind(null, record.id),
            },
          ]"
        />
      </template>
    </BasicTable>
    <UserModal @register="registerModal" @change="reloadTable" />
    <PermissionModal @register="registerPermissionModal" />
    <PasswordModal @register="registerPasswordModal" />
    <ClaimModal @register="registerClaimModal" />
    <LockModal @register="registerLockModal" @change="reloadTable" />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { usePermission } from '/@/hooks/web/usePermission';
  import { Tag } from 'ant-design-vue';
  import { useModal } from '/@/components/Modal';
  import { PermissionModal } from '/@/components/Permission';
  import { BasicTable, TableAction } from '/@/components/Table';
  import UserModal from './UserModal.vue';
  import PasswordModal from './PasswordModal.vue';
  import ClaimModal from './ClaimModal.vue';
  import LockModal from './LockModal.vue';
  import { useUserTable } from '../hooks/useUserTable';
  import { usePassword } from '../hooks/usePassword';
  import { useLock } from '../hooks/useLock';
  import { usePermission as usePermissionModal } from '../hooks/usePermission';

  export default defineComponent({
    name: 'UserTable',
    components: {
      BasicTable,
      ClaimModal,
      PermissionModal,
      TableAction,
      Tag,
      UserModal,
      PasswordModal,
      LockModal,
    },
    setup(_props, { emit }) {
      const { t } = useI18n();
      const { hasPermission } = usePermission();
      const [registerModal, { openModal }] = useModal();
      const { lockEnable, registerTable, reloadTable, handleDelete } = useUserTable();
      const { registerLockModal, showLockModal, handleUnLock } = useLock({ emit });
      const { registerPasswordModal, showPasswordModal } = usePassword();
      const [registerClaimModal, { openModal: openClaimModal }] = useModal();
      const { registerModel: registerPermissionModal, showPermissionModal } = usePermissionModal();

      return {
        t,
        hasPermission,
        lockEnable,
        registerTable,
        reloadTable,
        registerModal,
        openModal,
        registerPermissionModal,
        showPermissionModal,
        registerPasswordModal,
        showPasswordModal,
        registerClaimModal,
        openClaimModal,
        handleDelete,
        registerLockModal,
        showLockModal,
        handleUnLock,
      };
    },
    methods: {
      handleAddNew() {
        this.openModal(true, {}, true);
      },
      handleEdit(record) {
        this.openModal(true, record, true);
      },
      handleUnlock(record) {
        this.handleUnLock(record.id).then(() => {
          this.reloadTable();
        });
      },
    },
  });
</script>
