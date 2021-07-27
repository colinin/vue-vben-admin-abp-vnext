import { useI18n } from '/@/hooks/web/useI18n';
import { FormProps, TabFormSchema } from '/@/components/Form';

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

export function getModalFormSchemas(): TabFormSchema[] {
  return [
    {
      tab: t('AbpIdentity.UserInformations'),
      field: 'id',
      component: 'Input',
      label: 'id',
      colProps: { span: 24 },
      show: false,
    },
    {
      tab: t('AbpIdentity.UserInformations'),
      field: 'concurrencyStamp',
      component: 'Input',
      label: 'concurrencyStamp',
      colProps: { span: 24 },
      show: false,
    },
    {
      tab: t('AbpIdentity.UserInformations'),
      field: 'userName',
      component: 'Input',
      label: t('AbpIdentity.UserName'),
      colProps: { span: 24 },
      required: true,
    },
    {
      tab: t('AbpIdentity.UserInformations'),
      field: 'password',
      component: 'InputPassword',
      label: t('AbpIdentity.Password'),
      colProps: { span: 24 },
      required: true,
      ifShow: ({ values }) => {
        if (values.id) {
          return false;
        }
        return true;
      },
    },
    {
      tab: t('AbpIdentity.UserInformations'),
      field: 'surName',
      component: 'Input',
      label: t('AbpIdentity.DisplayName:Surname'),
      colProps: { span: 24 },
    },
    {
      tab: t('AbpIdentity.UserInformations'),
      field: 'name',
      component: 'Input',
      label: t('AbpIdentity.DisplayName:Name'),
      colProps: { span: 24 },
    },
    {
      tab: t('AbpIdentity.UserInformations'),
      field: 'email',
      component: 'Input',
      label: t('AbpIdentity.DisplayName:Email'),
      colProps: { span: 24 },
      required: true,
    },
    {
      tab: t('AbpIdentity.UserInformations'),
      field: 'phoneNumber',
      component: 'Input',
      label: t('AbpIdentity.DisplayName:PhoneNumber'),
      colProps: { span: 24 },
    },
    {
      tab: t('AbpIdentity.UserInformations'),
      field: 'lockoutEnabled',
      component: 'Checkbox',
      label: t('AbpIdentity.LockoutEnabled'),
      colProps: { span: 24 },
      defaultValue: true,
      renderComponentContent: t('AbpIdentity.LockoutEnabled'),
    },
    {
      tab: t('AbpIdentity.Roles'),
      field: 'roleNames',
      component: 'Select',
      label: t('AbpIdentity.Roles'),
      colProps: { span: 24 },
      componentProps: {
        mode: 'multiple',
      },
      // render: ({ model, field }) => {
      //   return h(Select, {
      //     mode: 'multiple',
      //     value: model[field],
      //     onSelect: (val) => {
      //       console.log(val);
      //       model[field].push(val);
      //     },
      //   });
      // },
    },
  ];
}
