import { BasicColumn } from '/@/components/Table/src/types/table';
import { useI18n } from '/@/hooks/web/useI18n';
import { valueTypeMaps } from './BasicType';
import { DataItem } from '/@/api/platform/model/dataItemModel';

const { t } = useI18n();

export function getDataColumns(): BasicColumn[] {
  return [
    {
      title: 'id',
      dataIndex: 'id',
      width: 100,
      ifShow: false,
    },
    {
      title: t('AppPlatform.DisplayName:Name'),
      dataIndex: 'name',
      fixed: 'left',
      width: 120,
      sorter: (a: DataItem, b: DataItem) => a.name.localeCompare(b.name),
    },
    {
      title: t('AppPlatform.DisplayName:DisplayName'),
      dataIndex: 'displayName',
      width: 120,
      sorter: (a: DataItem, b: DataItem) => a.displayName.localeCompare(b.displayName),
    },
    {
      title: t('AppPlatform.DisplayName:Description'),
      dataIndex: 'description',
      width: 150,
    },
    {
      title: t('AppPlatform.DisplayName:ValueType'),
      dataIndex: 'valueType',
      width: 100,
      format: (value) => {
        return valueTypeMaps[value];
      },
    },
    {
      title: t('AppPlatform.DisplayName:DefaultValue'),
      dataIndex: 'defaultValue',
      width: 100,
    },
    {
      title: t('AppPlatform.DisplayName:AllowBeNull'),
      dataIndex: 'allowBeNull',
      width: 100,
      slots: { customRender: 'allow' },
    },
  ];
}
