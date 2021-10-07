import { h } from 'vue';
import { Input } from 'ant-design-vue';
import { useI18n } from '/@/hooks/web/useI18n';
import { CodeEditor } from '/@/components/CodeEditor';
import { FormProps, FormSchema } from '/@/components/Form';
import { formatToDateTime } from '/@/utils/dateUtil';

const { t } = useI18n();

export function getSearchFormSchemas(): Partial<FormProps> {
  return {
    labelWidth: 100,
    schemas: [
      {
        field: 'filter',
        component: 'Input',
        label: t('AbpIdentityServer.Search'),
        colProps: { span: 12 },
      },
      {
        field: 'subjectId',
        component: 'Input',
        label: t('AbpIdentityServer.Grants:SubjectId'),
        colProps: { span: 12 },
      },
    ],
  };
}

export function getModalFormSchemas(): FormSchema[] {
  return [
    {
      field: 'key',
      component: 'Input',
      label: t('AbpIdentityServer.Grants:Key'),
      colProps: { span: 24 },
      render: ({ model, field }) => {
        return h(Input, {
          value: model[field],
          readonly: true,
          placeholder: '',
        });
      },
    },
    {
      field: 'type',
      component: 'Input',
      label: t('AbpIdentityServer.Grants:Type'),
      colProps: { span: 24 },
      render: ({ model, field }) => {
        return h(Input, {
          value: model[field],
          readonly: true,
          placeholder: '',
        });
      },
    },
    {
      field: 'subjectId',
      component: 'Input',
      label: t('AbpIdentityServer.Grants:SubjectId'),
      colProps: { span: 24 },
      render: ({ model, field }) => {
        return h(Input, {
          value: model[field],
          readonly: true,
          placeholder: '',
        });
      },
    },
    {
      field: 'sessionId',
      component: 'Input',
      label: t('AbpIdentityServer.Grants:SessionId'),
      colProps: { span: 24 },
      render: ({ model, field }) => {
        return h(Input, {
          value: model[field],
          readonly: true,
          placeholder: '',
        });
      },
    },
    {
      field: 'description',
      component: 'Input',
      label: t('AbpIdentityServer.Description'),
      colProps: { span: 24 },
      render: ({ model, field }) => {
        return h(Input, {
          value: model[field],
          readonly: true,
          placeholder: '',
        });
      },
    },
    {
      field: 'creationTime',
      component: 'Input',
      label: t('AbpIdentityServer.CreationTime'),
      colProps: { span: 24 },
      render: ({ model, field }) => {
        return h(Input, {
          value: model[field]
            ? formatToDateTime(model[field], 'YYYY-MM-DD HH:mm:ss')
            : model[field],
          readonly: true,
          placeholder: '',
        });
      },
    },
    {
      field: 'expiration',
      component: 'Input',
      label: t('AbpIdentityServer.Expiration'),
      colProps: { span: 24 },
      render: ({ model, field }) => {
        return h(Input, {
          value: model[field]
            ? formatToDateTime(model[field], 'YYYY-MM-DD HH:mm:ss')
            : model[field],
          readonly: true,
          placeholder: '',
        });
      },
    },
    {
      field: 'consumedTime',
      component: 'Input',
      label: t('AbpIdentityServer.Grants:ConsumedTime'),
      colProps: { span: 24 },
      render: ({ model, field }) => {
        return h(Input, {
          value: model[field]
            ? formatToDateTime(model[field], 'YYYY-MM-DD HH:mm:ss')
            : model[field],
          readonly: true,
          placeholder: '',
        });
      },
    },
    {
      field: 'data',
      component: 'Input',
      label: t('AbpIdentityServer.Grants:Data'),
      colProps: { span: 24 },
      render: ({ model, field }) => {
        return h(CodeEditor, {
          value: model[field],
          readonly: true,
        });
      },
    },
  ];
}
