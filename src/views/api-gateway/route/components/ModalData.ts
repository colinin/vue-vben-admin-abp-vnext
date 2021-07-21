import { h } from 'vue';
import { Select } from 'ant-design-vue';
import { useI18n } from '/@/hooks/web/useI18n';
import { FormProps, TabFormSchema } from '/@/components/Form';
import { HostAndPort, HttpMethods } from '/@/api/api-gateway/model/basicModel';
import { getActivedList } from '/@/api/api-gateway/group';
import { getLoadBalancerProviders } from '/@/api/api-gateway/basic';

const { t } = useI18n();
const httpMethods = Object.keys(HttpMethods).map((key) => {
  return {
    key: key,
    label: key,
    value: key,
  };
});

const renderObjectTags: TabFormSchema['render'] = ({ model, field }) => {
  return h(Select, {
    mode: 'tags',
    open: false,
    tokenSeparators: [','],
    value: model[field]
      ? Object.keys(model[field]).map((key) => {
          return `${key}:${model[field][key]}`;
        })
      : [],
    onSelect: (val) => {
      if (!model[field]) {
        model[field] = {};
      }
      if (String(val).includes(':')) {
        const items = String(val).split(':');
        model[field][items[0]] = items[1];
      }
    },
    onDeselect: (val) => {
      if (String(val).includes(':')) {
        const items = String(val).split(':');
        delete model[field][items[0]];
      }
    },
  });
};

export function getSearchFormSchemas(): Partial<FormProps> {
  return {
    labelWidth: 100,
    schemas: [
      {
        field: 'appId',
        component: 'ApiSelect',
        label: t('ApiGateway.DisplayName:AppId'),
        colProps: { span: 12 },
        required: true,
        componentProps: {
          api: () => getActivedList(),
          resultField: 'items',
          labelField: 'appName',
          valueField: 'appId',
        },
      },
      {
        field: 'filter',
        component: 'Input',
        label: t('ApiGateway.Search'),
        colProps: { span: 12 },
        defaultValue: '',
      },
    ],
  };
}

export function getModalFormSchemas(): TabFormSchema[] {
  return [
    {
      tab: t('ApiGateway.Basic'),
      field: 'reRouteId',
      component: 'Input',
      label: 'reRouteId',
      colProps: { span: 24 },
      show: false,
    },
    {
      tab: t('ApiGateway.Basic'),
      field: 'concurrencyStamp',
      component: 'Input',
      label: 'concurrencyStamp',
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
        return values.reRouteId !== undefined;
      },
    },
    {
      tab: t('ApiGateway.Basic'),
      field: 'reRouteName',
      component: 'Input',
      label: t('ApiGateway.DisplayName:Name'),
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
      field: 'serviceName',
      component: 'Input',
      label: t('ApiGateway.DisplayName:ServiceName'),
      colProps: { span: 24 },
    },
    {
      tab: t('ApiGateway.Basic'),
      field: 'serviceNamespace',
      component: 'Input',
      label: t('ApiGateway.DisplayName:Namespace'),
      colProps: { span: 24 },
    },
    {
      tab: t('ApiGateway.Basic'),
      field: 'timeout',
      component: 'InputNumber',
      label: t('ApiGateway.DisplayName:Timeout'),
      defaultValue: 10000,
      componentProps: {
        style: {
          width: '100%',
        },
      },
    },
    {
      tab: t('ApiGateway.Basic'),
      field: 'priority',
      component: 'InputNumber',
      label: t('ApiGateway.DisplayName:Priority'),
      defaultValue: 0,
      componentProps: {
        style: {
          width: '100%',
        },
      },
    },
    {
      tab: t('ApiGateway.Basic'),
      field: 'reRouteIsCaseSensitive',
      component: 'Checkbox',
      defaultValue: true,
      label: t('ApiGateway.DisplayName:CaseSensitive'),
      colProps: { span: 24 },
    },
    {
      tab: t('ApiGateway.Basic'),
      field: 'dangerousAcceptAnyServerCertificateValidator',
      component: 'Checkbox',
      defaultValue: true,
      label: t('ApiGateway.DisplayName:DangerousAcceptAnyServerCertificateValidator'),
      colProps: { span: 24 },
    },
    {
      tab: t('ApiGateway.Forward'),
      field: 'downstreamScheme',
      component: 'Input',
      label: t('ApiGateway.DisplayName:DownstreamScheme'),
      defaultValue: 'HTTP',
      colProps: { span: 24 },
    },
    {
      tab: t('ApiGateway.Forward'),
      field: 'downstreamHttpVersion',
      component: 'Input',
      label: t('ApiGateway.DisplayName:DownstreamHttpVersion'),
      colProps: { span: 24 },
    },
    {
      tab: t('ApiGateway.Forward'),
      field: 'upstreamPathTemplate',
      component: 'Input',
      label: t('ApiGateway.DisplayName:UpstreamPathTemplate'),
      colProps: { span: 24 },
      dynamicRules: ({}) => {
        return [
          {
            required: true,
            validator: (_, value) => {
              if (!String(value).startsWith('/')) {
                return Promise.reject(t('ApiGateway.RequestAddressMustStartWithBackslashSymbol'));
              }
              return Promise.resolve();
            },
          },
        ];
      },
    },
    {
      tab: t('ApiGateway.Forward'),
      field: 'downstreamPathTemplate',
      component: 'Input',
      label: t('ApiGateway.DisplayName:DownstreamPathTemplate'),
      required: true,
      colProps: { span: 24 },
      dynamicRules: ({}) => {
        return [
          {
            required: true,
            validator: (_, value) => {
              if (!String(value).startsWith('/')) {
                return Promise.reject(t('ApiGateway.RequestAddressMustStartWithBackslashSymbol'));
              }
              return Promise.resolve();
            },
          },
        ];
      },
    },
    {
      tab: t('ApiGateway.Forward'),
      field: 'key',
      component: 'Input',
      label: t('ApiGateway.DisplayName:AggregateKey'),
      colProps: { span: 24 },
    },
    {
      tab: t('ApiGateway.Forward'),
      field: 'upstreamHttpMethod',
      component: 'Select',
      label: t('ApiGateway.DisplayName:UpstreamHttpMethod'),
      colProps: { span: 24 },
      required: true,
      componentProps: {
        mode: 'multiple',
        options: httpMethods,
      },
    },
    {
      tab: t('ApiGateway.Forward'),
      field: 'downstreamHttpMethod',
      component: 'Input',
      label: t('ApiGateway.DisplayName:DownstreamHttpMethod'),
      colProps: { span: 24 },
    },
    {
      tab: t('ApiGateway.Forward'),
      field: 'downstreamHostAndPorts',
      component: 'Select',
      label: t('ApiGateway.DisplayName:DownstreamHostAndPorts'),
      colProps: { span: 24 },
      required: true,
      render: ({ model, field }) => {
        let valMap = [];
        if (model[field]) {
          valMap = model[field].map((m: HostAndPort) => {
            return `${m.host}:${m.port}`;
          });
        }
        return h(Select, {
          mode: 'tags',
          open: false,
          tokenSeparators: [','],
          value: valMap,
          onChange: (val: string[]) => {
            model[field] = val.map((m): HostAndPort => {
              const items = m.split(':');
              return {
                host: items[0],
                port: Number(items[1]),
              };
            });
          },
        });
      },
    },
    {
      tab: t('ApiGateway.RequestProcessing'),
      field: 'addClaimsToRequest',
      component: 'Select',
      label: t('ApiGateway.DisplayName:AddClaimsToRequest'),
      colProps: { span: 24 },
      render: renderObjectTags,
    },
    {
      tab: t('ApiGateway.RequestProcessing'),
      field: 'addHeadersToRequest',
      component: 'Select',
      label: t('ApiGateway.DisplayName:AddHeadersToRequest'),
      colProps: { span: 24 },
      render: renderObjectTags,
    },
    {
      tab: t('ApiGateway.RequestProcessing'),
      field: 'upstreamHeaderTransform',
      component: 'Select',
      label: t('ApiGateway.DisplayName:UpstreamHeaderTransform'),
      colProps: { span: 24 },
      render: renderObjectTags,
    },
    {
      tab: t('ApiGateway.RequestProcessing'),
      field: 'downstreamHeaderTransform',
      component: 'Select',
      label: t('ApiGateway.DisplayName:DownstreamHeaderTransform'),
      colProps: { span: 24 },
      render: renderObjectTags,
    },
    {
      tab: t('ApiGateway.RequestProcessing'),
      field: 'changeDownstreamPathTemplate',
      component: 'Select',
      label: t('ApiGateway.DisplayName:ChangeDownstreamPathTemplate'),
      colProps: { span: 24 },
      render: renderObjectTags,
    },
    {
      tab: t('ApiGateway.RequestProcessing'),
      field: 'routeClaimsRequirement',
      component: 'Select',
      label: t('ApiGateway.DisplayName:RouteClaimsRequirement'),
      colProps: { span: 24 },
      render: renderObjectTags,
    },
    {
      tab: t('ApiGateway.RequestProcessing'),
      field: 'delegatingHandlers',
      component: 'Select',
      label: t('ApiGateway.DisplayName:DelegatingHandlers'),
      colProps: { span: 24 },
      render: renderObjectTags,
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
      field: 'rateLimitOptions.enableRateLimiting',
      component: 'RadioButtonGroup',
      label: t('ApiGateway.DisplayName:EnableRateLimiting'),
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
      field: 'rateLimitOptions.limit',
      component: 'InputNumber',
      label: t('ApiGateway.DisplayName:limit'),
      colProps: { span: 24 },
      componentProps: {
        style: {
          width: '100%',
        },
      },
    },
    {
      tab: t('ApiGateway.RateLimit'),
      field: 'rateLimitOptions.period',
      component: 'Input',
      label: t('ApiGateway.DisplayName:Period'),
      colProps: { span: 24 },
    },
    {
      tab: t('ApiGateway.RateLimit'),
      field: 'rateLimitOptions.periodTimespan',
      component: 'InputNumber',
      label: t('ApiGateway.DisplayName:PeriodTimespan'),
      colProps: { span: 24 },
      componentProps: {
        style: {
          width: '100%',
        },
      },
    },
    {
      tab: t('ApiGateway.RateLimit'),
      field: 'rateLimitOptions.clientWhitelist',
      component: 'Select',
      label: t('ApiGateway.DisplayName:ClientWhitelist'),
      colProps: { span: 24 },
      componentProps: {
        mode: 'tags',
        open: false,
        tokenSeparators: [','],
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
      tab: t('ApiGateway.SecurityOptions'),
      field: 'loadBalancerOptions.authenticationProviderKey',
      component: 'Input',
      label: t('ApiGateway.DisplayName:AuthenticationProviderKey'),
      colProps: { span: 24 },
    },
    {
      tab: t('ApiGateway.SecurityOptions'),
      field: 'authenticationOptions.allowedScopes',
      component: 'Select',
      label: t('ApiGateway.DisplayName:AllowedScopes'),
      colProps: { span: 24 },
      componentProps: {
        mode: 'tags',
        open: false,
        tokenSeparators: [','],
      },
    },
    {
      tab: t('ApiGateway.SecurityOptions'),
      field: 'securityOptions.ipAllowedList',
      component: 'Select',
      label: t('ApiGateway.DisplayName:IpAllowedList'),
      colProps: { span: 24 },
      componentProps: {
        mode: 'tags',
        open: false,
        tokenSeparators: [','],
      },
    },
    {
      tab: t('ApiGateway.SecurityOptions'),
      field: 'securityOptions.ipBlockedList',
      component: 'Select',
      label: t('ApiGateway.DisplayName:IpBlockedList'),
      colProps: { span: 24 },
      componentProps: {
        mode: 'tags',
        open: false,
        tokenSeparators: [','],
      },
    },
  ];
}
