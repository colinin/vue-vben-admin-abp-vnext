import { useI18n } from '/@/hooks/web/useI18n';
import { FormProps } from '/@/components/Form';
import { getActivedList } from '/@/api/api-gateway/group';

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
