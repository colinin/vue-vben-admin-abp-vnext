import { BasicColumn } from '/@/components/Table/src/types/table';
import { useI18n } from '/@/hooks/web/useI18n';

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
      title: t('LocalizationManagement.DisplayName:Key'),
      dataIndex: 'key',
      align: 'left',
      width: 260,
      sorter: true,
    },
    {
      title: t('LocalizationManagement.DisplayName:Value'),
      dataIndex: 'value',
      align: 'left',
      width: 180,
      sorter: true,
    },
    {
      title: t('LocalizationManagement.DisplayName:TargetValue'),
      dataIndex: 'targetValue',
      align: 'left',
      width: 200,
      sorter: true,
    },
    {
      title: t('LocalizationManagement.DisplayName:ResourceName'),
      dataIndex: 'resourceName',
      align: 'left',
      width: 200,
      sorter: true,
    },
  ];
}
