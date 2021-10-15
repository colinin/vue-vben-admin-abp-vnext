import { useI18n } from '/@/hooks/web/useI18n';
import { FormProps } from '/@/components/Form';

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
