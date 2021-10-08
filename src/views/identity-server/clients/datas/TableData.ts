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
      title: t('AbpIdentityServer.Enabled'),
      dataIndex: 'enabled',
      align: 'left',
      width: 200,
      sorter: true,
      slots: { customRender: 'enabled' },
    },
    {
      title: t('AbpIdentityServer.Client:Id'),
      dataIndex: 'clientId',
      align: 'left',
      width: 200,
      sorter: true,
    },
    {
      title: t('AbpIdentityServer.Name'),
      dataIndex: 'clientName',
      align: 'left',
      width: 300,
      sorter: true,
    },
    {
      title: t('AbpIdentityServer.Description'),
      dataIndex: 'description',
      align: 'left',
      width: 300,
      sorter: true,
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
