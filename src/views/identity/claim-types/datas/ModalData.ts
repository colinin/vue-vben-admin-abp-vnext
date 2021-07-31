import { useI18n } from '/@/hooks/web/useI18n';
import { FormProps, FormSchema } from '/@/components/Form';
import { ValueType } from '/@/api/identity/model/claimModel';

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
      field: 'name',
      component: 'Input',
      label: t('AbpIdentity.IdentityClaim:Name'),
      colProps: { span: 24 },
      required: true,
      dynamicDisabled: ({ values }) => {
        return values.id ? true : false;
      },
    },
    {
      field: 'required',
      component: 'Checkbox',
      label: t('AbpIdentity.IdentityClaim:Required'),
      colProps: { span: 24 },
      renderComponentContent: t('AbpIdentity.IdentityClaim:Required'),
    },
    {
      field: 'regex',
      component: 'Input',
      label: t('AbpIdentity.IdentityClaim:Regex'),
      colProps: { span: 24 },
    },
    {
      field: 'regexDescription',
      component: 'Input',
      label: t('AbpIdentity.IdentityClaim:RegexDescription'),
      colProps: { span: 24 },
    },
    {
      field: 'description',
      component: 'InputTextArea',
      label: t('AbpIdentity.IdentityClaim:Description'),
      colProps: { span: 24 },
    },
    {
      field: 'valueType',
      component: 'Select',
      label: t('AbpIdentity.IdentityClaim:ValueType'),
      colProps: { span: 24 },
      defaultValue: ValueType.String,
      componentProps: {
        options: [
          { label: 'String', value: ValueType.String },
          { label: 'Int', value: ValueType.Int },
          { label: 'Boolean', value: ValueType.Boolean },
          { label: 'DateTime', value: ValueType.DateTime },
        ],
      },
      dynamicDisabled: ({ values }) => {
        return values.id ? true : false;
      },
    },
  ];
}
