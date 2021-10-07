import { useI18n } from '/@/hooks/web/useI18n';
import { FormSchema } from '/@/components/Form';

const { t } = useI18n();
export function getFormSchemas(): FormSchema[] {
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
