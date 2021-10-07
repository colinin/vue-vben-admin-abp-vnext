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
        label: t('AbpIdentityServer.Search'),
        colProps: { span: 24 },
      },
    ],
  };
}

export function getPropertyFormSchemas(): FormSchema[] {
  return [
    {
      field: 'key',
      component: 'Input',
      label: t('AbpIdentityServer.Propertites:Key'),
      colProps: { span: 24 },
      required: true,
    },
    {
      field: 'value',
      component: 'Input',
      label: t('AbpIdentityServer.Propertites:Value'),
      colProps: { span: 24 },
      required: true,
    },
  ];
}
