import { BasicColumn } from '/@/components/Table/src/types/table';
import { useI18n } from '/@/hooks/web/useI18n';
import { formatToDateTime } from '/@/utils/dateUtil';

const { t } = useI18n();

export function getDataColumns(): BasicColumn[] {
  return [
    {
      title: t('AbpAuditLogging.MachineName'),
      dataIndex: 'fields.machineName',
      align: 'left',
      width: 150,
      sorter: true,
    },
    {
      title: t('AbpAuditLogging.Application'),
      dataIndex: 'fields.application',
      align: 'left',
      width: 150,
      sorter: true,
    },
    {
      title: t('AbpAuditLogging.TimeStamp'),
      dataIndex: 'timeStamp',
      align: 'left',
      width: 'auto',
      sorter: true,
      format: (text) => {
        return text ? formatToDateTime(text, 'YYYY-MM-DD HH:mm:ss') : text;
      },
    },
    {
      title: t('AbpAuditLogging.Level'),
      dataIndex: 'level',
      align: 'left',
      width: 150,
      sorter: true,
      slots: {
        customRender: 'level',
      },
    },
    {
      title: t('AbpAuditLogging.Message'),
      dataIndex: 'message',
      align: 'left',
      width: 150,
    },
    {
      title: t('AbpAuditLogging.Environment'),
      dataIndex: 'fields.environment',
      align: 'left',
      width: 150,
      sorter: true,
    },
    {
      title: t('AbpAuditLogging.ProcessId'),
      dataIndex: 'fields.processId',
      align: 'left',
      width: 150,
      sorter: true,
    },
    {
      title: t('AbpAuditLogging.ThreadId'),
      dataIndex: 'fields.threadId',
      align: 'left',
      width: 150,
      sorter: true,
    },
    {
      title: t('AbpAuditLogging.Context'),
      dataIndex: 'fields.context',
      align: 'left',
      width: 150,
      sorter: true,
    },
    {
      title: t('AbpAuditLogging.ConnectionId'),
      dataIndex: 'fields.connectionId',
      align: 'left',
      width: 150,
      sorter: true,
    },
    {
      title: t('AbpAuditLogging.CorrelationId'),
      dataIndex: 'fields.correlationId',
      align: 'left',
      width: 150,
      sorter: true,
    },
    {
      title: t('AbpAuditLogging.RequestId'),
      dataIndex: 'fields.requestId',
      align: 'left',
      width: 150,
      sorter: true,
    },
    {
      title: t('AbpAuditLogging.RequestPath'),
      dataIndex: 'fields.requestPath',
      align: 'left',
      width: 150,
      sorter: true,
    },
  ];
}
