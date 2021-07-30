import { computed } from 'vue';
import { useI18n } from '/@/hooks/web/useI18n';
import { useTable } from '/@/components/Table';
import { deleteById, getList } from '/@/api/identity/user';
import { formatPagedRequest } from '/@/utils/http/abp/helper';
import { getDataColumns } from '../datas/TableData';
import { getSearchFormSchemas } from '../datas/ModalData';
import { Modal } from 'ant-design-vue';

export function useUserTable() {
  const { t } = useI18n();
  const [registerTable, { reload: reloadTable }] = useTable({
    rowKey: 'id',
    title: t('AbpIdentity.Users'),
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
    rowSelection: { type: 'checkbox' },
    formConfig: getSearchFormSchemas(),
    actionColumn: {
      width: 160,
      title: t('table.action'),
      dataIndex: 'action',
      slots: { customRender: 'action' },
    },
  });

  const lockEnable = computed(() => {
    return (record) => {
      // 未启用锁定不显示
      if (!record.lockoutEnabled) {
        return false;
      }
      if (record.lockoutEnd) {
        // 锁定时间高于当前时间不显示
        const lockTime = new Date(record.lockoutEnd);
        const nowTime = new Date();
        if (lockTime > nowTime) {
          return false;
        }
      }
      return true;
    };
  });

  function handleDelete(user) {
    Modal.warning({
      title: t('AbpUi.AreYouSure'),
      content: t('AbpUi.ItemWillBeDeletedMessageWithFormat', [user.userName] as Recordable),
      okCancel: true,
      onOk: () => {
        deleteById(user.id).then(() => {
          reloadTable();
        });
      },
    });
  }

  return {
    registerTable,
    reloadTable,
    handleDelete,
    lockEnable,
  };
}
