import { useI18n } from '/@/hooks/web/useI18n';
import { FormProps, FormSchema } from '/@/components/Form';

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

export function getModalFormSchemas(): FormSchema[] {
  return [
    {
      field: 'id',
      component: 'Input',
      label: 'id',
      colProps: { span: 24 },
      show: false,
    },
    {
      field: 'isActive',
      component: 'Switch',
      label: t('ApiGateway.DisplayName:IsActive'),
      colProps: { span: 24 },
      defaultValue: true,
    },
    {
      field: 'appId',
      component: 'Input',
      label: t('ApiGateway.DisplayName:AppId'),
      colProps: { span: 24 },
      required: true,
    },
    {
      field: 'appName',
      component: 'Input',
      label: t('ApiGateway.DisplayName:AppName'),
      colProps: { span: 24 },
      required: true,
    },
    {
      field: 'appIpAddress',
      component: 'Input',
      label: t('ApiGateway.DisplayName:AppAddress'),
      colProps: { span: 24 },
      required: true,
    },
    {
      field: 'name',
      component: 'Input',
      label: t('ApiGateway.DisplayName:Name'),
      colProps: { span: 24 },
      required: true,
    },
    {
      field: 'description',
      component: 'InputTextArea',
      label: t('ApiGateway.DisplayName:Description'),
      colProps: { span: 24 },
    },
  ];
}
