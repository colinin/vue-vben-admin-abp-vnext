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
      title: t('AbpIdentityServer.Client:Id'),
      dataIndex: 'clientId',
      align: 'left',
      width: 150,
      sorter: true,
    },
    {
      title: t('AbpIdentityServer.Grants:Key'),
      dataIndex: 'key',
      align: 'left',
      width: 300,
      sorter: true,
    },
    {
      title: t('AbpIdentityServer.Grants:Type'),
      dataIndex: 'type',
      align: 'left',
      width: 180,
      sorter: true,
    },
    {
      title: t('AbpIdentityServer.Grants:SessionId'),
      dataIndex: 'sessionId',
      align: 'left',
      width: 200,
      sorter: true,
    },
    {
      title: t('AbpIdentityServer.Grants:SubjectId'),
      dataIndex: 'subjectId',
      align: 'left',
      width: 300,
      sorter: true,
    },
    {
      title: t('AbpIdentityServer.Grants:ConsumedTime'),
      dataIndex: 'consumedTime',
      align: 'left',
      width: 180,
      sorter: true,
      format: (text) => {
        if (text) {
          return formatToDateTime(text);
        }
        return '';
      },
    },
    {
      title: t('AbpIdentityServer.CreationTime'),
      dataIndex: 'creationTime',
      align: 'left',
      width: 180,
      sorter: true,
      format: (text) => {
        return formatToDateTime(text);
      },
    },
    {
      title: t('AbpIdentityServer.Expiration'),
      dataIndex: 'expiration',
      align: 'left',
      width: 180,
      sorter: true,
      format: (text) => {
        if (text) {
          return formatToDateTime(text);
        }
        return '';
      },
    },
  ];
}
