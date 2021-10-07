import { useI18n } from '/@/hooks/web/useI18n';
import { FormProps, FormSchema } from '/@/components/Form';
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
