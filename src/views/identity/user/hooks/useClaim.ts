import type { Ref } from 'vue';

import { useI18n } from '/@/hooks/web/useI18n';
import { cloneDeep } from 'lodash-es';
import { Modal } from 'ant-design-vue';
import { FormSchema } from '/@/components/Form';
import { useModal } from '/@/components/Modal';
import { getActivedList } from '/@/api/identity/claim';
import { getClaimColumns } from '../datas/TableData';
import { createClaim, deleteClaim, getClaimList, updateClaim } from '/@/api/identity/user';
import { CreateUserClaim, UpdateUserClaim, UserClaim } from '/@/api/identity/model/userModel';
import { useTable } from '/@/components/Table';
import { computed, unref, watch } from 'vue';

interface UseClaim {
  userIdRef: Ref<string>;
}

export function useClaim({ userIdRef }: UseClaim) {
  const { t } = useI18n();
  const formSchemas: FormSchema[] = [
    {
      field: 'id',
      component: 'Input',
      label: 'id',
      colProps: { span: 24 },
      ifShow: false,
    },
    {
      field: 'claimType',
      component: 'ApiSelect',
      label: t('AbpIdentity.DisplayName:ClaimType'),
      colProps: { span: 24 },
      required: true,
      componentProps: {
        api: () => getActivedList(),
        resultField: 'items',
        labelField: 'name',
        valueField: 'name',
      },
    },
    {
      field: 'claimValue',
      component: 'Input',
      label: t('AbpIdentity.DisplayName:ClaimValue'),
      colProps: { span: 24 },
      required: true,
      ifShow: ({ values }) => {
        return values.id ? false : true;
      },
    },
    {
      field: 'newClaimValue',
      component: 'Input',
      label: t('AbpIdentity.DisplayName:ClaimValue'),
      colProps: { span: 24 },
      required: true,
      ifShow: ({ values }) => {
        return values.id ? true : false;
      },
    },
  ];
  const search = computed(() => {
    return {
      id: userIdRef.value,
    };
  });
  const [registerTable, { reload: reloadTable }] = useTable({
    rowKey: 'id',
    title: t('AbpIdentity.ManageClaim'),
    columns: getClaimColumns(),
    api: getClaimList,
    searchInfo: search,
    pagination: false,
    striped: false,
    useSearchForm: false,
    showTableSetting: true,
    bordered: true,
    showIndexColumn: false,
    canResize: false,
    immediate: false,
    rowSelection: { type: 'checkbox' },
    actionColumn: {
      width: 160,
      title: t('table.action'),
      dataIndex: 'action',
      slots: { customRender: 'action' },
    },
  });

  const [registerClaimForm, { openModal }] = useModal();

  function openClaimForm(model) {
    if (model.id) {
      openModal(
        true,
        Object.assign(model, {
          newClaimValue: model.claimValue,
        }),
        true
      );
    } else {
      openModal(true, {}, true);
    }
  }

  function handleDelete(claim: UserClaim) {
    Modal.warning({
      title: t('AbpUi.AreYouSure'),
      content: t('AbpUi.ItemWillBeDeletedMessageWithFormat', [claim.claimValue] as Recordable),
      okCancel: true,
      onOk: () => {
        deleteClaim(unref(userIdRef), claim).then(() => {
          reloadTable();
        });
      },
    });
  }

  function handleSaveChanges(input) {
    const api = input.id
      ? updateClaim(unref(userIdRef), cloneDeep(input) as UpdateUserClaim)
      : createClaim(unref(userIdRef), cloneDeep(input) as CreateUserClaim);
    return api.then(() => {
      reloadTable();
    });
  }

  watch(
    () => unref(userIdRef),
    (id) => {
      reloadTable({
        searchInfo: {
          id: id,
        },
      });
    }
  );

  return {
    formSchemas,
    registerClaimForm,
    openClaimForm,
    registerTable,
    reloadTable,
    handleSaveChanges,
    handleDelete,
  };
}
