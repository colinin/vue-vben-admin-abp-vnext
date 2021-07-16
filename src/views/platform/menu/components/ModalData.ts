import { useI18n } from '/@/hooks/web/useI18n';
import { FormProps } from '/@/components/Form';
import { getAll as getAllLayout } from '/@/api/platform/layout';
import { getByName as getDataByName } from '/@/api/platform/dataDic';

const { t } = useI18n();

export function getSearchFormSchemas(): Partial<FormProps> {
  return {
    labelWidth: 100,
    schemas: [
      {
        field: 'filter',
        component: 'Input',
        label: t('AppPlatform.DisplayName:Filter'),
        colProps: { span: 8 },
      },
      {
        field: 'framework',
        component: 'ApiSelect',
        label: t('AppPlatform.DisplayName:UIFramework'),
        colProps: { span: 8 },
        componentProps: {
          api: () => getDataByName('UI Framework'),
          resultField: 'items',
          labelField: 'displayName',
          valueField: 'name',
        },
      },
      {
        field: 'layoutId',
        component: 'ApiSelect',
        label: t('AppPlatform.DisplayName:Layout'),
        colProps: { span: 8 },
        componentProps: {
          api: () => getAllLayout(),
          resultField: 'items',
          labelField: 'displayName',
          valueField: 'id',
        },
      },
    ],
  };
}
