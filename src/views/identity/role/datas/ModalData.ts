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
      field: 'concurrencyStamp',
      component: 'Input',
      label: 'concurrencyStamp',
      colProps: { span: 24 },
      ifShow: false,
    },
    {
      field: 'name',
      component: 'Input',
      label: t('AbpIdentity.DisplayName:RoleName'),
      colProps: { span: 24 },
      required: true,
    },
    {
      field: 'isPublic',
      component: 'Checkbox',
      label: t('AbpIdentity.DisplayName:IsPublic'),
      colProps: { span: 24 },
      renderComponentContent: t('AbpIdentity.DisplayName:IsPublic'),
    },
    {
      field: 'isDefault',
      component: 'Checkbox',
      label: t('AbpIdentity.DisplayName:IsDefault'),
      colProps: { span: 24 },
      renderComponentContent: t('AbpIdentity.DisplayName:IsDefault'),
    },
  ];
}
