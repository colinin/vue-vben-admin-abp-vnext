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
      title: t('AbpAuditLogging.CreationTime'),
      dataIndex: 'creationTime',
      align: 'left',
      width: 150,
      sorter: true,
      format: (text) => {
        return formatToDateTime(text);
      },
    },
    {
      title: t('AbpAuditLogging.Actions'),
      dataIndex: 'action',
      align: 'left',
      width: 150,
      sorter: true,
    },
    {
      title: t('AbpAuditLogging.ClientIpAddress'),
      dataIndex: 'clientIpAddress',
      align: 'left',
      width: 200,
      sorter: true,
    },
    {
      title: t('AbpAuditLogging.BrowserInfo'),
      dataIndex: 'browserInfo',
      align: 'left',
      width: 270,
      sorter: true,
    },
    {
      title: t('AbpAuditLogging.ApplicationName'),
      dataIndex: 'applicationName',
      align: 'left',
      width: 140,
      sorter: true,
    },
    {
      title: t('AbpAuditLogging.TenantName'),
      dataIndex: 'tenantName',
      align: 'left',
      width: 120,
      sorter: true,
    },
    {
      title: t('AbpAuditLogging.Identity'),
      dataIndex: 'identity',
      align: 'left',
      width: 120,
      sorter: true,
    },
    {
      title: t('AbpAuditLogging.UserName'),
      dataIndex: 'userName',
      align: 'left',
      width: 120,
      sorter: true,
    },
    {
      title: t('AbpAuditLogging.ClientId'),
      dataIndex: 'clientId',
      align: 'left',
      width: 150,
      sorter: true,
    },
    {
      title: t('AbpAuditLogging.CorrelationId'),
      dataIndex: 'correlationId',
      align: 'left',
      width: 'auto',
      sorter: true,
    },
  ];
}
