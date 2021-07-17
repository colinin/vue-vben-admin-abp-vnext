import { BasicColumn } from '/@/components/Table/src/types/table';
import { useI18n } from '/@/hooks/web/useI18n';
import { RouteGroup } from '/@/api/api-gateway/model/groupModel';

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
      title: t('ApiGateway.DisplayName:Name'),
      dataIndex: 'name',
      fixed: 'left',
      width: 150,
      sorter: (a: RouteGroup, b: RouteGroup) => a.name.localeCompare(b.name),
    },
    {
      title: t('ApiGateway.DisplayName:AppId'),
      dataIndex: 'appId',
      width: 180,
      sorter: (a: RouteGroup, b: RouteGroup) => a.appId.localeCompare(b.appId),
    },
    {
      title: t('ApiGateway.DisplayName:AppName'),
      dataIndex: 'appName',
      width: 180,
      sorter: (a: RouteGroup, b: RouteGroup) => a.appName.localeCompare(b.appName),
    },
    {
      title: t('ApiGateway.DisplayName:AppAddress'),
      dataIndex: 'appIpAddress',
      width: 180,
      sorter: (a: RouteGroup, b: RouteGroup) => a.appIpAddress?.localeCompare(b.appIpAddress ?? ''),
    },
    {
      title: t('ApiGateway.DisplayName:IsActive'),
      dataIndex: 'isActive',
      width: 100,
      slots: { customRender: 'active' },
    },
    {
      title: t('ApiGateway.DisplayName:Description'),
      dataIndex: 'description',
      width: 250,
    },
  ];
}
