import { BasicColumn } from '/@/components/Table/src/types/table';
import { useI18n } from '/@/hooks/web/useI18n';
import { GlobalConfiguration } from '/@/api/api-gateway/model/globalModel';

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
      title: t('ApiGateway.DisplayName:AppId'),
      dataIndex: 'appId',
      width: 180,
      sorter: (a: GlobalConfiguration, b: GlobalConfiguration) => a.appId.localeCompare(b.appId),
    },
    {
      title: t('ApiGateway.DisplayName:BaseUrl'),
      dataIndex: 'baseUrl',
      width: 180,
      sorter: (a: GlobalConfiguration, b: GlobalConfiguration) =>
        a.baseUrl.localeCompare(b.baseUrl),
    },
    {
      title: t('ApiGateway.DisplayName:DownstreamScheme'),
      dataIndex: 'downstreamScheme',
      width: 180,
      sorter: (a: GlobalConfiguration, b: GlobalConfiguration) =>
        a.downstreamScheme?.localeCompare(b.downstreamScheme ?? ''),
    },
    {
      title: t('ApiGateway.DisplayName:RequestIdKey'),
      dataIndex: 'requestIdKey',
      width: 180,
      sorter: (a: GlobalConfiguration, b: GlobalConfiguration) =>
        a.requestIdKey?.localeCompare(b.requestIdKey ?? ''),
    },
    {
      title: t('ApiGateway.DisplayName:DownstreamHttpVersion'),
      dataIndex: 'downstreamHttpVersion',
      width: 100,
      sorter: (a: GlobalConfiguration, b: GlobalConfiguration) =>
        a.downstreamHttpVersion?.localeCompare(b.downstreamHttpVersion ?? ''),
    },
  ];
}
