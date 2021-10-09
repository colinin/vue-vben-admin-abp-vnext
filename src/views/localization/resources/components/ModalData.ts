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
        label: t('AbpIdentity.Search'),
        colProps: { span: 24 },
        defaultValue: '',
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
      ifShow: false,
    },
    {
      field: 'enable',
      component: 'Checkbox',
      label: t('LocalizationManagement.DisplayName:Enable'),
      colProps: { span: 24 },
      defaultValue: true,
      renderComponentContent: t('LocalizationManagement.DisplayName:Enable'),
    },
    {
      field: 'name',
      component: 'Input',
      label: t('LocalizationManagement.DisplayName:Name'),
      colProps: { span: 24 },
    },
    {
      field: 'displayName',
      component: 'Input',
      label: t('LocalizationManagement.DisplayName:DisplayName'),
      colProps: { span: 24 },
    },
    {
      field: 'description',
      component: 'InputTextArea',
      label: t('LocalizationManagement.DisplayName:Description'),
      colProps: { span: 24 },
    },
  ];
}
