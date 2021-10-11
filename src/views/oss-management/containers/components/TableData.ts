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
      title: t('名称'),
      dataIndex: 'name',
      align: 'left',
      width: 'auto',
      sorter: true,
    },
    {
      title: t('创建日期'),
      dataIndex: 'creationDate',
      align: 'left',
      width: 150,
      sorter: true,
      format: (text) => {
        return text ? formatToDateTime(text, 'YYYY-MM-DD') : text;
      },
    },
    {
      title: t('修改日期'),
      dataIndex: 'lastModifiedDate',
      align: 'left',
      width: 150,
      sorter: true,
      format: (text) => {
        return text ? formatToDateTime(text, 'YYYY-MM-DD') : text;
      },
    },
    {
      title: t('大小'),
      dataIndex: 'size',
      align: 'left',
      width: 120,
      sorter: true,
    },
  ];
}
