import { useI18n } from '/@/hooks/web/useI18n';
import { useTable } from '/@/components/Table';
import { getList } from '/@/api/identity/user';
import { formatPagedRequest } from '/@/utils/http/abp/helper';
import { getDataColumns } from '../datas/TableData';
import { getSearchFormSchemas } from '../datas/ModalData';

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

  return {
    registerTable,
    reloadTable,
  };
}
