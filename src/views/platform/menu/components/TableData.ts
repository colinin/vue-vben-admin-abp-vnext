import { BasicColumn } from '/@/components/Table/src/types/table';
import { useI18n } from '/@/hooks/web/useI18n';
import { Menu } from '/@/api/platform/model/menuModel';

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
      title: 'code',
      dataIndex: 'code',
      width: 1,
      ifShow: false,
    },
    {
      title: 'layoutId',
      dataIndex: 'layoutId',
      width: 1,
      ifShow: false,
    },
    {
      title: t('AppPlatform.DisplayName:Name'),
      dataIndex: 'name',
      align: 'left',
      width: 150,
      sorter: (a: Menu, b: Menu) => a.name.localeCompare(b.name),
    },
    {
      title: t('AppPlatform.DisplayName:DisplayName'),
      dataIndex: 'displayName',
      width: 180,
      sorter: (a: Menu, b: Menu) => a.displayName.localeCompare(b.displayName),
    },
    {
      title: t('AppPlatform.DisplayName:Path'),
      dataIndex: 'path',
      width: 180,
      sorter: (a: Menu, b: Menu) => a.path.localeCompare(b.path),
    },
    {
      title: t('AppPlatform.DisplayName:Component'),
      dataIndex: 'component',
      width: 180,
      sorter: (a: Menu, b: Menu) => a.component.localeCompare(b.component),
    },
    {
      title: t('AppPlatform.DisplayName:UIFramework'),
      dataIndex: 'framework',
      width: 180,
      sorter: (a: Menu, b: Menu) => a.framework.localeCompare(b.framework),
    },
    {
      title: t('AppPlatform.DisplayName:Description'),
      dataIndex: 'description',
      width: 250,
    },
    {
      title: t('AppPlatform.DisplayName:Redirect'),
      dataIndex: 'redirect',
      width: 'auto',
    },
  ];
}
