<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    :title="t('AbpIdentity.ManageClaim')"
    :width="800"
    :showCancelBtn="false"
    :showOkBtn="false"
  >
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleAddNew">{{ t('AbpIdentity.AddClaim') }}</a-button>
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              auth: 'AbpIdentity.Users.ManageClaims',
              label: t('AbpUi.Edit'),
              icon: 'ant-design:edit-outlined',
              onClick: handleEdit.bind(null, record),
            },
            {
              auth: 'AbpIdentity.Users.ManageClaims',
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
      @register="registerClaimForm"
      :save-changes="handleSaveChanges"
      :form-items="formSchemas"
      :title="t('AbpIdentity.ManageClaim')"
    />
  </BasicModal>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicTable, TableAction } from '/@/components/Table';
  import { BasicModalForm } from '/@/components/ModalForm';
  import { useClaim } from '../hooks/useClaim';

  export default defineComponent({
    name: 'ClaimModal',
    components: { BasicModal, BasicTable, BasicModalForm, TableAction },
    setup() {
      const { t } = useI18n();
      const userIdRef = ref('');
      const [registerModal] = useModalInner((val) => {
        userIdRef.value = val.id;
      });
      const {
        formSchemas,
        registerClaimForm,
        openClaimForm,
        registerTable,
        reloadTable,
        handleSaveChanges,
      } = useClaim({ userIdRef });

      return {
        t,
        formSchemas,
        registerModal,
        registerTable,
        reloadTable,
        registerClaimForm,
        openClaimForm,
        handleSaveChanges,
      };
    },
    methods: {
      handleAddNew() {
        this.openClaimForm({});
      },
      handleEdit(record) {
        this.openClaimForm(record);
      },
      handleDelete(record) {
        console.log(record);
      },
    },
  });
</script>
