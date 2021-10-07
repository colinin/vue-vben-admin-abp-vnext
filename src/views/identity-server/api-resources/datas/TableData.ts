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
      title: t('AbpIdentityServer.Name'),
      dataIndex: 'name',
      align: 'left',
      width: 200,
      sorter: true,
    },
    {
      title: t('AbpIdentityServer.DisplayName'),
      dataIndex: 'displayName',
      align: 'left',
      width: 300,
      sorter: true,
    },
    {
      title: t('AbpIdentityServer.Description'),
      dataIndex: 'description',
      align: 'left',
      width: 180,
      sorter: true,
    },
    {
      title: t('AbpIdentityServer.Resource:Enabled'),
      dataIndex: 'enabled',
      align: 'left',
      width: 200,
      sorter: true,
      slots: { customRender: 'enabled' },
    },
    {
      title: t('AbpIdentityServer.ShowInDiscoveryDocument'),
      dataIndex: 'showInDiscoveryDocument',
      align: 'left',
      width: 200,
      sorter: true,
      slots: { customRender: 'discovery' },
    },
    {
      title: t('AbpIdentityServer.AllowedAccessTokenSigningAlgorithms'),
      dataIndex: 'allowedAccessTokenSigningAlgorithms',
      align: 'left',
      width: 180,
      sorter: true,
    },
  ];
}

export function getSecretColumns(): BasicColumn[] {
  return [
    {
      title: t('AbpIdentityServer.Secret:Type'),
      dataIndex: 'type',
      align: 'left',
      width: 180,
      sorter: true,
    },
    {
      title: t('AbpIdentityServer.Secret:Value'),
      dataIndex: 'value',
      align: 'left',
      width: 180,
      sorter: true,
    },
    {
      title: t('AbpIdentityServer.Description'),
      dataIndex: 'description',
      align: 'left',
      width: 180,
      sorter: true,
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

export function getPropertyColumns(): BasicColumn[] {
  return [
    {
      title: t('AbpIdentityServer.Propertites:Key'),
      dataIndex: 'key',
      align: 'left',
      width: 180,
      sorter: true,
    },
    {
      title: t('AbpIdentityServer.Propertites:Value'),
      dataIndex: 'value',
      align: 'left',
      width: 180,
      sorter: true,
    },
  ];
}
