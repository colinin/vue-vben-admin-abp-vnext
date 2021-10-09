import { useI18n } from '/@/hooks/web/useI18n';
import { FormProps } from '/@/components/Form';
import { getAll as getLanguages } from '/@/api/localization/languages';
import { getAll as getResources } from '/@/api/localization/resources';

const { t } = useI18n();

export function getSearchFormSchemas(): Partial<FormProps> {
  return {
    labelWidth: 100,
    schemas: [
      {
        field: 'cultureName',
        component: 'ApiSelect',
        label: t('LocalizationManagement.DisplayName:CultureName'),
        colProps: { span: 6 },
        required: true,
        componentProps: {
          api: () => getLanguages(),
          resultField: 'items',
          labelField: 'displayName',
          valueField: 'cultureName',
        },
      },
      {
        field: 'targetCultureName',
        component: 'ApiSelect',
        label: t('LocalizationManagement.DisplayName:TargetCultureName'),
        colProps: { span: 6 },
        required: true,
        componentProps: {
          api: () => getLanguages(),
          resultField: 'items',
          labelField: 'displayName',
          valueField: 'cultureName',
        },
      },
      {
        field: 'resourceName',
        component: 'ApiSelect',
        label: t('LocalizationManagement.DisplayName:ResourceName'),
        colProps: { span: 6 },
        componentProps: {
          api: () => getResources(),
          resultField: 'items',
          labelField: 'displayName',
          valueField: 'name',
        },
      },
      {
        field: 'onlyNull',
        component: 'Select',
        label: t('LocalizationManagement.DisplayName:TargetValue'),
        colProps: { span: 6 },
        componentProps: {
          options: [
            {
              key: t('LocalizationManagement.DisplayName:Any'),
              label: t('LocalizationManagement.DisplayName:Any'),
              value: 0,
            },
            {
              key: t('LocalizationManagement.DisplayName:OnlyNull'),
              label: t('LocalizationManagement.DisplayName:OnlyNull'),
              value: 1,
            },
          ],
        },
      },
      {
        field: 'filter',
        component: 'Input',
        label: t('AbpUi.Search'),
        colProps: { span: 24 },
      },
    ],
  };
}
