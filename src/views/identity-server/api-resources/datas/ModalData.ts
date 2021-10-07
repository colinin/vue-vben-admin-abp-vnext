import { useI18n } from '/@/hooks/web/useI18n';
import { FormProps, FormSchema, TabFormSchema } from '/@/components/Form';
import { HashType } from '/@/api/identity-server/model/apiResourcesModel';

const { t } = useI18n();

export function getSearchFormSchemas(): Partial<FormProps> {
  return {
    labelWidth: 100,
    schemas: [
      {
        field: 'filter',
        component: 'Input',
        label: t('AbpIdentityServer.Search'),
        colProps: { span: 24 },
      },
    ],
  };
}

export function getModalFormSchemas(): TabFormSchema[] {
  return [
    {
      tab: t('AbpIdentityServer.Basics'),
      field: 'enabled',
      component: 'Checkbox',
      label: t('AbpIdentityServer.Resource:Enabled'),
      colProps: { span: 24 },
      renderComponentContent: t('AbpIdentityServer.Resource:Enabled'),
    },
    {
      tab: t('AbpIdentityServer.Basics'),
      field: 'showInDiscoveryDocument',
      component: 'Checkbox',
      label: t('AbpIdentityServer.ShowInDiscoveryDocument'),
      colProps: { span: 24 },
      renderComponentContent: t('AbpIdentityServer.ShowInDiscoveryDocument'),
    },
    {
      tab: t('AbpIdentityServer.Basics'),
      field: 'name',
      component: 'Input',
      label: t('AbpIdentityServer.Name'),
      colProps: { span: 24 },
      ifShow: ({ values }) => {
        return values.id ? false : true;
      },
      required: true,
    },
    {
      tab: t('AbpIdentityServer.Basics'),
      field: 'displayName',
      component: 'Input',
      label: t('AbpIdentityServer.DisplayName'),
      colProps: { span: 24 },
    },
    {
      tab: t('AbpIdentityServer.Basics'),
      field: 'allowedAccessTokenSigningAlgorithms',
      component: 'Input',
      label: t('AbpIdentityServer.AllowedAccessTokenSigningAlgorithms'),
      colProps: { span: 24 },
      labelWidth: 160,
    },
    {
      tab: t('AbpIdentityServer.Secret'),
      field: 'secrets',
      component: 'Render',
      label: '',
      colProps: { span: 24 },
      labelWidth: 0,
      slot: 'secrets',
      // render: ({ model, field }) => {
      //   return h(BasicTable, {
      //     rowKey: 'id',
      //     columns: getSecretColumns(),
      //     dataSource: model[field],
      //     pagination: false,
      //     striped: false,
      //     useSearchForm: false,
      //     showTableSetting: false,
      //   });
      // },
    },
  ];
}

export function getSecretFormSchemas(): FormSchema[] {
  return [
    {
      field: 'hashType',
      component: 'Input',
      label: '',
      colProps: { span: 24 },
      required: true,
      ifShow: false,
      defaultValue: HashType.Sha256,
    },
    {
      field: 'type',
      component: 'Select',
      label: t('AbpIdentityServer.Secret:Type'),
      colProps: { span: 24 },
      required: true,
      componentProps: {
        options: [
          { label: 'JsonWebKey', value: 'JWK' },
          { label: 'SharedSecret', value: 'SharedSecret' },
          { label: 'X509CertificateName', value: 'X509Name' },
          { label: 'X509CertificateBase64', value: 'X509CertificateBase64' },
          { label: 'X509CertificateThumbprint', value: 'X509Thumbprint' },
        ],
      },
    },
    {
      field: 'value',
      component: 'Input',
      label: t('AbpIdentityServer.Secret:Value'),
      colProps: { span: 24 },
      required: true,
    },
    {
      field: 'description',
      component: 'Input',
      label: t('AbpIdentityServer.Description'),
      colProps: { span: 24 },
    },
    {
      field: 'expiration',
      component: 'DatePicker',
      label: t('AbpIdentityServer.Expiration'),
      colProps: { span: 24 },
      componentProps: {
        style: {
          width: '100%',
        },
      },
    },
  ];
}

export function getPropertyFormSchemas(): FormSchema[] {
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
