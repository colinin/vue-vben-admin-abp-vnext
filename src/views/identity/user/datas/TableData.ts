import { BasicColumn } from '/@/components/Table/src/types/table';
import { useI18n } from '/@/hooks/web/useI18n';
import { User } from '/@/api/identity/model/userModel';

const { t } = useI18n();

export function getDataColumns(): BasicColumn[] {
  return [
    {
      title: 'id',
      dataIndex: 'id',
      width: 1,
      ifShow: false,
    },
    {
      title: t('AbpIdentity.DisplayName:UserName'),
      dataIndex: 'userName',
      align: 'left',
      width: 270,
      sorter: (a: User, b: User) => a.userName.localeCompare(b.userName),
    },
    {
      title: t('AbpIdentity.DisplayName:Surname'),
      dataIndex: 'surname',
      align: 'left',
      width: 300,
      sorter: (a: User, b: User) => a.surname.localeCompare(b.surname),
    },
    {
      title: t('AbpIdentity.DisplayName:Name'),
      dataIndex: 'name',
      align: 'left',
      width: 270,
      sorter: (a: User, b: User) => a.name.localeCompare(b.name),
    },
    {
      title: t('AbpIdentity.PhoneNumber'),
      dataIndex: 'phoneNumber',
      width: 100,
      sorter: (a: User, b: User) => a.phoneNumber.localeCompare(b.phoneNumber),
    },
    {
      title: t('AbpIdentity.EmailAddress'),
      dataIndex: 'email',
      align: 'left',
      width: 100,
      sorter: (a: User, b: User) => a.email.localeCompare(b.email),
    },
  ];
}

export function getClaimColumns(): BasicColumn[] {
  return [
    {
      title: 'id',
      dataIndex: 'id',
      width: 1,
      ifShow: false,
    },
    {
      title: t('AbpIdentity.DisplayName:ClaimType'),
      dataIndex: 'claimType',
      align: 'left',
      width: 150,
      sortOrder: true,
    },
    {
      title: t('AbpIdentity.DisplayName:ClaimValue'),
      dataIndex: 'claimValue',
      align: 'left',
      width: 'auto',
      sortOrder: true,
    },
  ];
}
