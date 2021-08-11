import { useI18n } from '/@/hooks/web/useI18n';
import { BasicColumn } from '/@/components/Table';
import { formatToDateTime } from '/@/utils/dateUtil';

const { t } = useI18n();

export function getDataColumns(): BasicColumn[] {
  return [
    {
      title: 'id',
      dataIndex: 'id',
      width: 1,
      ifShow: false,
    },
    {
      title: t('AbpAuditLogging.RequestUrl'),
      dataIndex: 'url',
      align: 'left',
      width: 500,
      sorter: true,
      slots: {
        customRender: 'request',
      },
    },
    {
      title: t('AbpAuditLogging.UserName'),
      dataIndex: 'userName',
      align: 'left',
      width: 120,
      sorter: true,
    },
    {
      title: t('AbpAuditLogging.ClientIpAddress'),
      dataIndex: 'clientIpAddress',
      align: 'left',
      width: 120,
      sorter: true,
    },
    {
      title: t('AbpAuditLogging.ExecutionTime'),
      dataIndex: 'executionTime',
      align: 'left',
      width: 150,
      sorter: true,
      format: (text) => {
        return formatToDateTime(text);
      },
    },
    {
      title: t('AbpAuditLogging.ExecutionDuration'),
      dataIndex: 'executionDuration',
      align: 'left',
      width: 100,
      sorter: true,
    },
    {
      title: t('AbpAuditLogging.ApplicationName'),
      dataIndex: 'applicationName',
      align: 'left',
      width: 100,
      sorter: true,
    },
    {
      title: t('AbpAuditLogging.TenantName'),
      dataIndex: 'tenantName',
      align: 'left',
      width: 100,
      sorter: true,
    },
    {
      title: t('AbpAuditLogging.BrowserInfo'),
      dataIndex: 'browserInfo',
      align: 'left',
      width: 300,
      sorter: true,
    },
  ];
}
