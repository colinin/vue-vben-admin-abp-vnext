import { useI18n } from '/@/hooks/web/useI18n';
import { BasicColumn } from '/@/components/Table';

const { t } = useI18n();

export function getDataColumns(): BasicColumn[] {
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
