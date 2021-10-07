import { useI18n } from '/@/hooks/web/useI18n';
import { BasicColumn } from '/@/components/Table';

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
      title: t('AbpIdentityServer.Required'),
      dataIndex: 'required',
      align: 'left',
      width: 200,
      sorter: true,
      slots: { customRender: 'required' },
    },
    {
      title: t('AbpIdentityServer.Enabled'),
      dataIndex: 'enabled',
      align: 'left',
      width: 200,
      sorter: true,
      slots: { customRender: 'enabled' },
    },
    {
      title: t('AbpIdentityServer.Emphasize'),
      dataIndex: 'emphasize',
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
  ];
}
