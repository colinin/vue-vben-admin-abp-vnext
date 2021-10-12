import { BasicColumn } from '/@/components/Table/src/types/table';
import { useI18n } from '/@/hooks/web/useI18n';
import { formatToDateTime } from '/@/utils/dateUtil';

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
      title: t('AbpOssManagement.DisplayName:Name'),
      dataIndex: 'name',
      align: 'left',
      width: 'auto',
      sorter: true,
    },
    {
      title: t('AbpOssManagement.DisplayName:CreationDate'),
      dataIndex: 'creationDate',
      align: 'left',
      width: 150,
      sorter: true,
      format: (text) => {
        return text ? formatToDateTime(text, 'YYYY-MM-DD') : text;
      },
    },
    {
      title: t('AbpOssManagement.DisplayName:LastModifiedDate'),
      dataIndex: 'lastModifiedDate',
      align: 'left',
      width: 150,
      sorter: true,
      format: (text) => {
        return text ? formatToDateTime(text, 'YYYY-MM-DD') : text;
      },
    },
    {
      title: t('AbpOssManagement.DisplayName:Size'),
      dataIndex: 'size',
      align: 'left',
      width: 120,
      sorter: true,
    },
  ];
}
