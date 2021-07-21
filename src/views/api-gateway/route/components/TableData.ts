import { BasicColumn } from '/@/components/Table/src/types/table';
import { useI18n } from '/@/hooks/web/useI18n';
import { Route } from '/@/api/api-gateway/model/routeModel';

const { t } = useI18n();

export function getDataColumns(): BasicColumn[] {
  return [
    {
      title: 'reRouteId',
      dataIndex: 'reRouteId',
      width: 100,
      ifShow: false,
    },
    {
      title: t('ApiGateway.DisplayName:Name'),
      dataIndex: 'reRouteName',
      align: 'left',
      width: 270,
      sorter: (a: Route, b: Route) => a.reRouteName.localeCompare(b.reRouteName),
    },
    {
      title: t('ApiGateway.DisplayName:UpstreamPathTemplate'),
      dataIndex: 'upstreamPathTemplate',
      align: 'left',
      width: 300,
      sorter: (a: Route, b: Route) => a.upstreamPathTemplate.localeCompare(b.upstreamPathTemplate),
    },
    {
      title: t('ApiGateway.DisplayName:DownstreamPathTemplate'),
      dataIndex: 'downstreamPathTemplate',
      align: 'left',
      width: 300,
      sorter: (a: Route, b: Route) =>
        a.downstreamPathTemplate.localeCompare(b.downstreamPathTemplate),
    },
    {
      title: t('ApiGateway.DisplayName:UpstreamHttpMethod'),
      dataIndex: 'upstreamHttpMethod',
      width: 180,
      slots: {
        customRender: 'methods',
        style: {
          margin: '16px',
        },
      },
    },
    {
      title: t('ApiGateway.DisplayName:DownstreamScheme'),
      dataIndex: 'downstreamScheme',
      width: 180,
      sorter: (a: Route, b: Route) => a.downstreamScheme?.localeCompare(b.downstreamScheme ?? ''),
    },
    {
      title: t('ApiGateway.DisplayName:DownstreamHostAndPorts'),
      dataIndex: 'downstreamHostAndPorts',
      width: 180,
      slots: { customRender: 'hosts' },
    },
    {
      title: t('ApiGateway.DisplayName:Timeout'),
      dataIndex: 'timeout',
      width: 150,
    },
    {
      title: t('ApiGateway.DisplayName:ServiceName'),
      dataIndex: 'serviceName',
      width: 180,
      sorter: (a: Route, b: Route) => a.serviceName?.localeCompare(b.serviceName ?? ''),
    },
  ];
}
