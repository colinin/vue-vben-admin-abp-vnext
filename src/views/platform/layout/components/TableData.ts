import { BasicColumn } from '/@/components/Table/src/types/table';
import { useI18n } from '/@/hooks/web/useI18n';
import { Layout } from '/@/api/platform/model/layoutModel';

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
      width: 150,
      sorter: (a: Layout, b: Layout) => a.name.localeCompare(b.name),
    },
    {
      title: t('AppPlatform.DisplayName:DisplayName'),
      dataIndex: 'displayName',
      width: 180,
      sorter: (a: Layout, b: Layout) => a.displayName.localeCompare(b.displayName),
    },
    {
      title: t('AppPlatform.DisplayName:Path'),
      dataIndex: 'path',
      width: 180,
      sorter: (a: Layout, b: Layout) => a.path.localeCompare(b.path),
    },
    {
      title: t('AppPlatform.DisplayName:UIFramework'),
      dataIndex: 'framework',
      width: 180,
      sorter: (a: Layout, b: Layout) => a.framework.localeCompare(b.framework),
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
