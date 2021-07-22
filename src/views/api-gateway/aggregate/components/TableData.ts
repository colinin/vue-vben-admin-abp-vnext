import { BasicColumn } from '/@/components/Table/src/types/table';
import { useI18n } from '/@/hooks/web/useI18n';
import { AggregateRoute } from '/@/api/api-gateway/model/aggregateModel';

const { t } = useI18n();

export function getDataColumns(): BasicColumn[] {
  return [
    {
      title: 'reRouteId',
      dataIndex: 'reRouteId',
      width: 1,
      ifShow: false,
    },
    {
      title: 'appId',
      dataIndex: 'appId',
      width: 1,
      ifShow: false,
    },
    {
      title: t('ApiGateway.DisplayName:Name'),
      dataIndex: 'name',
      align: 'left',
      width: 250,
      sorter: (a: AggregateRoute, b: AggregateRoute) => a.name.localeCompare(b.name),
    },
    {
      title: t('ApiGateway.DisplayName:UpstreamPathTemplate'),
      dataIndex: 'upstreamPathTemplate',
      align: 'left',
      width: 300,
      sorter: (a: AggregateRoute, b: AggregateRoute) =>
        a.upstreamPathTemplate.localeCompare(b.upstreamPathTemplate),
    },
    {
      title: t('ApiGateway.DisplayName:RouteKeys'),
      dataIndex: 'reRouteKeys',
      align: 'left',
      width: 180,
      slots: {
        customRender: 'keys',
        style: {
          margin: '16px',
        },
      },
    },
    {
      title: t('ApiGateway.DisplayName:UpstreamHost'),
      dataIndex: 'upstreamHost',
      align: 'left',
      width: 200,
      sorter: (a: AggregateRoute, b: AggregateRoute) =>
        a.upstreamHost.localeCompare(b.upstreamHost),
    },
    {
      title: t('ApiGateway.DisplayName:Aggregator'),
      dataIndex: 'aggregator',
      width: 200,
      sorter: (a: AggregateRoute, b: AggregateRoute) => a.aggregator.localeCompare(b.aggregator),
    },
    {
      title: t('ApiGateway.DisplayName:Priority'),
      dataIndex: 'priority',
      width: 100,
    },
  ];
}

export function getConfigDataColumns(): BasicColumn[] {
  return [
    {
      title: t('ApiGateway.DisplayName:RouteKey'),
      dataIndex: 'reRouteKey',
      align: 'left',
      width: 150,
      sorter: (a: AggregateRoute, b: AggregateRoute) => a.name.localeCompare(b.name),
    },
    {
      title: t('ApiGateway.DisplayName:Parameter'),
      dataIndex: 'parameter',
      align: 'left',
      width: 150,
      sorter: (a: AggregateRoute, b: AggregateRoute) => a.name.localeCompare(b.name),
    },
    {
      title: t('ApiGateway.DisplayName:JsonPath'),
      dataIndex: 'jsonPath',
      align: 'left',
      width: 200,
      sorter: (a: AggregateRoute, b: AggregateRoute) => a.name.localeCompare(b.name),
    },
  ];
}
