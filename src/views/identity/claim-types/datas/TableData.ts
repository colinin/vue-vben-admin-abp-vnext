import { BasicColumn } from '/@/components/Table/src/types/table';
import { useI18n } from '/@/hooks/web/useI18n';

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
      title: t('AbpIdentity.IdentityClaim:Name'),
      dataIndex: 'name',
      align: 'left',
      width: 220,
      sorter: true,
    },
    {
      title: t('AbpIdentity.IdentityClaim:ValueType'),
      dataIndex: 'valueType',
      align: 'left',
      width: 150,
      sorter: true,
      slots: {
        customRender: 'types',
      },
    },
    {
      title: t('AbpIdentity.IdentityClaim:Regex'),
      dataIndex: 'regex',
      align: 'left',
      width: 180,
      sorter: true,
    },
    {
      title: t('AbpIdentity.IdentityClaim:Required'),
      dataIndex: 'required',
      align: 'left',
      width: 150,
      sorter: true,
      slots: {
        customRender: 'required',
      },
    },
    {
      title: t('AbpIdentity.IdentityClaim:IsStatic'),
      dataIndex: 'isStatic',
      align: 'left',
      width: 150,
      sorter: true,
      slots: {
        customRender: 'static',
      },
    },
    {
      title: t('AbpIdentity.IdentityClaim:Description'),
      dataIndex: 'description',
      align: 'left',
      width: 'auto',
      sorter: true,
    },
  ];
}
