import { useI18n } from '/@/hooks/web/useI18n';
import { FormProps, FormSchema } from '/@/components/Form';

const { t } = useI18n();

export function getSearchFormSchemas(): Partial<FormProps> {
  return {
    labelWidth: 100,
    schemas: [
      {
        field: 'prefix',
        component: 'Input',
        label: t('AbpUi.Search'),
        colProps: { span: 24 },
        defaultValue: '',
      },
    ],
  };
}

export function getModalFormSchemas(): FormSchema[] {
  return [
    {
      field: 'name',
      component: 'Input',
      label: t('AbpOssManagement.DisplayName:Name'),
      colProps: { span: 24 },
      required: true,
    },
  ];
}
