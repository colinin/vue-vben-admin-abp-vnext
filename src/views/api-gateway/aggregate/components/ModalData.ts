import { useI18n } from '/@/hooks/web/useI18n';
import { FormProps, FormSchema } from '/@/components/Form';
import { getActivedList } from '/@/api/api-gateway/group';
import { getDefinedAggregatorProviders } from '/@/api/api-gateway/basic';

const { t } = useI18n();

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

export function getModalFormSchemas(): FormSchema[] {
  return [
    {
      field: 'reRouteId',
      component: 'Input',
      label: 'reRouteId',
      colProps: { span: 24 },
      show: false,
    },
    {
      field: 'concurrencyStamp',
      component: 'Input',
      label: 'concurrencyStamp',
      colProps: { span: 24 },
      show: false,
    },
    {
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
      field: 'name',
      component: 'Input',
      label: t('ApiGateway.DisplayName:Name'),
      colProps: { span: 24 },
      required: true,
    },
    {
      field: 'aggregator',
      component: 'ApiSelect',
      label: t('ApiGateway.DisplayName:Aggregator'),
      colProps: { span: 24 },
      componentProps: {
        api: () => getDefinedAggregatorProviders(),
        resultField: 'items',
        labelField: 'provider',
        valueField: 'provider',
      },
    },
    {
      field: 'reRouteKeys',
      component: 'Select',
      label: t('ApiGateway.DisplayName:RouteKeys'),
      colProps: { span: 24 },
      required: true,
      componentProps: {
        mode: 'tags',
        open: false,
        tokenSeparators: [','],
      },
    },
    {
      field: 'priority',
      component: 'InputNumber',
      label: t('ApiGateway.DisplayName:Priority'),
      colProps: { span: 24 },
      componentProps: {
        style: {
          width: '100%',
        },
      },
    },
    {
      field: 'upstreamHost',
      component: 'Input',
      label: t('ApiGateway.DisplayName:UpstreamHost'),
      colProps: { span: 24 },
    },
    {
      field: 'reRouteIsCaseSensitive',
      component: 'Checkbox',
      label: t('ApiGateway.DisplayName:CaseSensitive'),
      colProps: { span: 24 },
      defaultValue: true,
      renderComponentContent: t('ApiGateway.DisplayName:CaseSensitive'),
    },
    {
      field: 'upstreamPathTemplate',
      component: 'Input',
      label: t('ApiGateway.DisplayName:UpstreamPathTemplate'),
      colProps: { span: 24 },
      required: true,
    },
    {
      field: 'upstreamHttpMethod',
      component: 'Select',
      label: t('ApiGateway.DisplayName:UpstreamHttpMethod'),
      colProps: { span: 24 },
      componentProps: {
        mode: 'tags',
        open: false,
        tokenSeparators: [','],
      },
    },
  ];
}

export function getConfigModalFormSchemas(): FormSchema[] {
  return [
    {
      field: 'routeId',
      component: 'Input',
      label: 'routeId',
      colProps: { span: 24 },
      show: false,
    },
    {
      field: 'reRouteKey',
      component: 'Input',
      label: t('ApiGateway.DisplayName:RouteKey'),
      colProps: { span: 24 },
      required: true,
    },
    {
      field: 'parameter',
      component: 'Input',
      label: t('ApiGateway.DisplayName:Parameter'),
      colProps: { span: 24 },
    },
    {
      field: 'jsonPath',
      component: 'Input',
      label: t('ApiGateway.DisplayName:JsonPath'),
      colProps: { span: 24 },
    },
  ];
}
