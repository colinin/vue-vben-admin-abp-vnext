import { useI18n } from '/@/hooks/web/useI18n';
import { FormProps, TabFormSchema } from '/@/components/Form';
import { getActivedList } from '/@/api/api-gateway/group';
import { getLoadBalancerProviders } from '/@/api/api-gateway/basic';

const { t } = useI18n();

export function getSearchFormSchemas(): Partial<FormProps> {
  return {
    labelWidth: 100,
    schemas: [
      {
        field: 'filter',
        component: 'Input',
        label: t('ApiGateway.Search'),
        colProps: { span: 24 },
      },
    ],
  };
}

export function getModalFormSchemas(): TabFormSchema[] {
  return [
    {
      tab: t('ApiGateway.Basic'),
      field: 'itemId',
      component: 'Input',
      label: 'itemId',
      colProps: { span: 24 },
      show: false,
    },
    {
      tab: t('ApiGateway.Basic'),
      field: 'appId',
      component: 'ApiSelect',
      label: t('ApiGateway.DisplayName:AppId'),
      colProps: { span: 24 },
      required: true,
      componentProps: {
        api: () => getActivedList(),
        resultField: 'items',
        labelField: 'appName',
        valueField: 'appId',
      },
      dynamicDisabled: ({ values }) => {
        return values.itemId !== undefined;
      },
    },
    {
      tab: t('ApiGateway.Basic'),
      field: 'baseUrl',
      component: 'Input',
      label: t('ApiGateway.DisplayName:BaseUrl'),
      colProps: { span: 24 },
      required: true,
    },
    {
      tab: t('ApiGateway.Basic'),
      field: 'requestIdKey',
      component: 'Input',
      label: t('ApiGateway.DisplayName:RequestIdKey'),
      colProps: { span: 24 },
    },
    {
      tab: t('ApiGateway.Basic'),
      field: 'downstreamScheme',
      component: 'Input',
      defaultValue: 'HTTP',
      label: t('ApiGateway.DisplayName:DownstreamScheme'),
      colProps: { span: 24 },
    },
    {
      tab: t('ApiGateway.Basic'),
      field: 'downstreamHttpVersion',
      component: 'Input',
      label: t('ApiGateway.DisplayName:DownstreamHttpVersion'),
      colProps: { span: 24 },
    },
    {
      tab: t('ApiGateway.HttpOptions'),
      field: 'httpHandlerOptions.maxConnectionsPerServer',
      component: 'InputNumber', // TODO: 2.6版本此组件属性无效?
      label: t('ApiGateway.DisplayName:MaxConnectionsPerServer'),
      colProps: { span: 24 },
      componentProps: {
        style: {
          width: '100%',
        },
      },
    },
    {
      tab: t('ApiGateway.HttpOptions'),
      field: 'httpHandlerOptions.useProxy',
      component: 'RadioButtonGroup',
      label: t('ApiGateway.DisplayName:UseProxy'),
      colProps: { span: 24 },
      defaultValue: false,
      componentProps: {
        options: [
          { label: t('ApiGateway.DisplayName:Enable'), value: true },
          { label: t('ApiGateway.DisplayName:Disble'), value: false },
        ],
      },
    },
    {
      tab: t('ApiGateway.HttpOptions'),
      field: 'httpHandlerOptions.useTracing',
      component: 'RadioButtonGroup',
      label: t('ApiGateway.DisplayName:UseTracing'),
      colProps: { span: 24 },
      defaultValue: false,
      componentProps: {
        options: [
          { label: t('ApiGateway.DisplayName:Enable'), value: true },
          { label: t('ApiGateway.DisplayName:Disble'), value: false },
        ],
      },
    },
    {
      tab: t('ApiGateway.HttpOptions'),
      field: 'httpHandlerOptions.allowAutoRedirect',
      component: 'RadioButtonGroup',
      label: t('ApiGateway.DisplayName:AllowAutoRedirect'),
      colProps: { span: 24 },
      defaultValue: false,
      componentProps: {
        options: [
          { label: t('ApiGateway.DisplayName:Enable'), value: true },
          { label: t('ApiGateway.DisplayName:Disble'), value: false },
        ],
      },
    },
    {
      tab: t('ApiGateway.HttpOptions'),
      field: 'httpHandlerOptions.useCookieContainer',
      component: 'RadioButtonGroup',
      label: t('ApiGateway.DisplayName:UseCookieContainer'),
      colProps: { span: 24 },
      defaultValue: false,
      componentProps: {
        options: [
          { label: t('ApiGateway.DisplayName:Enable'), value: true },
          { label: t('ApiGateway.DisplayName:Disble'), value: false },
        ],
      },
    },
    {
      tab: t('ApiGateway.RateLimit'),
      field: 'rateLimitOptions.disableRateLimitHeaders',
      component: 'RadioButtonGroup',
      label: t('ApiGateway.DisplayName:DisableRateLimitHeaders'),
      colProps: { span: 24 },
      defaultValue: false,
      componentProps: {
        options: [
          { label: t('ApiGateway.DisplayName:Enable'), value: true },
          { label: t('ApiGateway.DisplayName:Disble'), value: false },
        ],
      },
    },
    {
      tab: t('ApiGateway.RateLimit'),
      field: 'rateLimitOptions.clientIdHeader',
      component: 'Input',
      label: t('ApiGateway.DisplayName:ClientIdHeader'),
      colProps: { span: 24 },
    },
    {
      tab: t('ApiGateway.RateLimit'),
      field: 'rateLimitOptions.httpStatusCode',
      component: 'InputNumber',
      label: t('ApiGateway.DisplayName:HttpStatusCode'),
      colProps: { span: 24 },
      componentProps: {
        style: {
          width: '100%',
        },
      },
      defaultValue: 429,
    },
    {
      tab: t('ApiGateway.RateLimit'),
      field: 'rateLimitOptions.rateLimitCounterPrefix',
      component: 'Input',
      label: t('ApiGateway.DisplayName:RateLimitCounterPrefix'),
      colProps: { span: 24 },
    },
    {
      tab: t('ApiGateway.RateLimit'),
      field: 'rateLimitOptions.quotaExceededMessage',
      component: 'InputTextArea',
      label: t('ApiGateway.DisplayName:QuotaExceededMessage'),
      colProps: { span: 24 },
      componentProps: {
        autoSize: {
          minRows: 5,
          maxRows: 10,
        },
      },
    },
    {
      tab: t('ApiGateway.Qos'),
      field: 'qoSOptions.timeoutValue',
      component: 'InputNumber',
      label: t('ApiGateway.DisplayName:TimeoutValue'),
      colProps: { span: 24 },
      defaultValue: 10000,
      componentProps: {
        style: {
          width: '100%',
        },
      },
    },
    {
      tab: t('ApiGateway.Qos'),
      field: 'qoSOptions.durationOfBreak',
      component: 'InputNumber',
      label: t('ApiGateway.DisplayName:DurationOfBreak'),
      colProps: { span: 24 },
      defaultValue: 60000,
      componentProps: {
        style: {
          width: '100%',
        },
      },
    },
    {
      tab: t('ApiGateway.Qos'),
      field: 'qoSOptions.exceptionsAllowedBeforeBreaking',
      component: 'InputNumber',
      label: t('ApiGateway.DisplayName:ExceptionsAllowedBeforeBreaking'),
      labelWidth: 150,
      colProps: { span: 24 },
      defaultValue: 50,
      componentProps: {
        style: {
          width: '100%',
        },
      },
    },
    {
      tab: t('ApiGateway.LoadBalancer'),
      field: 'loadBalancerOptions.type',
      component: 'ApiSelect',
      label: t('ApiGateway.DisplayName:LoadBalancerType'),
      colProps: { span: 24 },
      componentProps: {
        api: () => getLoadBalancerProviders(),
        resultField: 'items',
        labelField: 'displayName',
        valueField: 'type',
      },
    },
    {
      tab: t('ApiGateway.LoadBalancer'),
      field: 'loadBalancerOptions.key',
      component: 'Input',
      label: t('ApiGateway.DisplayName:PollingKey'),
      colProps: { span: 24 },
    },
    {
      tab: t('ApiGateway.LoadBalancer'),
      field: 'loadBalancerOptions.expiry',
      component: 'InputNumber',
      label: t('ApiGateway.DisplayName:Expiry'),
      colProps: { span: 24 },
      componentProps: {
        style: {
          width: '100%',
        },
      },
    },
    {
      tab: t('ApiGateway.ServiceDiscovery'),
      field: 'serviceDiscoveryProvider.type',
      component: 'Select',
      label: t('ApiGateway.DisplayName:DiscoveryType'),
      colProps: { span: 24 },
      componentProps: {
        options: [
          { label: t('ApiGateway.DisplayName:None'), value: '' },
          { label: 'Consul', value: 'Consul' },
          { label: 'Eureka', value: 'Eureka' },
          { label: 'Zookeeper', value: 'Zookeeper' },
        ],
      },
    },
    {
      tab: t('ApiGateway.ServiceDiscovery'),
      field: 'serviceDiscoveryProvider.host',
      component: 'Input',
      label: t('ApiGateway.DisplayName:Host'),
      colProps: { span: 24 },
    },
    {
      tab: t('ApiGateway.ServiceDiscovery'),
      field: 'serviceDiscoveryProvider.port',
      component: 'InputNumber',
      label: t('ApiGateway.DisplayName:Port'),
      colProps: { span: 24 },
      componentProps: {
        style: {
          width: '100%',
        },
      },
    },
    {
      tab: t('ApiGateway.ServiceDiscovery'),
      field: 'serviceDiscoveryProvider.token',
      component: 'Input',
      label: t('ApiGateway.DisplayName:Token'),
      colProps: { span: 24 },
    },
    {
      tab: t('ApiGateway.ServiceDiscovery'),
      field: 'serviceDiscoveryProvider.configurationKey',
      component: 'Input',
      label: t('ApiGateway.DisplayName:ConfigurationKey'),
      colProps: { span: 24 },
    },
    {
      tab: t('ApiGateway.ServiceDiscovery'),
      field: 'serviceDiscoveryProvider.namespace',
      component: 'Input',
      label: t('ApiGateway.DisplayName:Namespace'),
      colProps: { span: 24 },
    },
    {
      tab: t('ApiGateway.ServiceDiscovery'),
      field: 'serviceDiscoveryProvider.scheme',
      component: 'Input',
      label: t('ApiGateway.DisplayName:Scheme'),
      colProps: { span: 24 },
    },
    {
      tab: t('ApiGateway.ServiceDiscovery'),
      field: 'serviceDiscoveryProvider.pollingInterval',
      component: 'InputNumber',
      label: t('ApiGateway.DisplayName:PollingInterval'),
      colProps: { span: 24 },
      componentProps: {
        style: {
          width: '100%',
        },
      },
    },
  ];
}
