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
      title: t('LocalizationManagement.DisplayName:Enable'),
      dataIndex: 'enable',
      align: 'left',
      width: 100,
      sorter: true,
      slots: {
        customRender: 'enable',
      },
    },
    {
      title: t('LocalizationManagement.DisplayName:Name'),
      dataIndex: 'name',
      align: 'left',
      width: 180,
      sorter: true,
    },
    {
      title: t('LocalizationManagement.DisplayName:DisplayName'),
      dataIndex: 'displayName',
      align: 'left',
      width: 180,
      sorter: true,
    },
    {
      title: t('LocalizationManagement.DisplayName:Description'),
      dataIndex: 'description',
      align: 'left',
      width: 200,
      sorter: true,
    },
  ];
}
