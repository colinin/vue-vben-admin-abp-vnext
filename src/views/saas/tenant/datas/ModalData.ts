import { useI18n } from '/@/hooks/web/useI18n';
import { FormProps, FormSchema } from '/@/components/Form';

const { t } = useI18n();

export function getSearchFormSchemas(): Partial<FormProps> {
  return {
    labelWidth: 120,
    schemas: [
      {
        field: 'filter',
        component: 'Input',
        label: t('AbpTenantManagement.Search'),
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
      show: false,
    },
    {
      field: 'name',
      component: 'Input',
      label: t('AbpTenantManagement.DisplayName:TenantName'),
      colProps: { span: 24 },
      required: true,
    },
    {
      field: 'adminEmailAddress',
      component: 'Input',
      label: t('AbpTenantManagement.DisplayName:AdminEmailAddress'),
      colProps: { span: 24 },
      required: true,
      ifShow: ({ values }) => {
        return values.id ? false : true;
      },
    },
    {
      field: 'adminPassword',
      component: 'InputPassword',
      label: t('AbpTenantManagement.DisplayName:AdminPassword'),
      colProps: { span: 24 },
      required: true,
      ifShow: ({ values }) => {
        return values.id ? false : true;
      },
    },
    {
      field: 'useSharedDatabase',
      component: 'Checkbox',
      label: '',
      colProps: { span: 24 },
      defaultValue: true,
      ifShow: ({ values }) => {
        return values.id ? false : true;
      },
      renderComponentContent: t('AbpTenantManagement.DisplayName:UseSharedDatabase'),
    },
    {
      field: 'defaultConnectionString',
      component: 'InputTextArea',
      label: t('AbpTenantManagement.DisplayName:DefaultConnectionString'),
      colProps: { span: 24 },
      required: true,
      ifShow: ({ values }) => {
        return !values.useSharedDatabase;
      },
      componentProps: {
        rows: 4,
      },
    },
  ];
}

export function getConnectionFormSchemas(): FormSchema[] {
  return [
    {
      field: 'name',
      component: 'Input',
      label: t('AbpTenantManagement.DisplayName:Name'),
      colProps: { span: 24 },
      required: true,
    },
    {
      field: 'value',
      component: 'Input',
      label: t('AbpTenantManagement.DisplayName:Value'),
      colProps: { span: 24 },
      required: true,
    },
  ];
}
