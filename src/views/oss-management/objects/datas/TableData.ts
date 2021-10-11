import { BasicColumn } from '/@/components/Table/src/types/table';
import { useI18n } from '/@/hooks/web/useI18n';
import { formatToDateTime } from '/@/utils/dateUtil';

const { t } = useI18n();
const kbUnit = 1 * 1024;
const mbUnit = kbUnit * 1024;
const gbUnit = mbUnit * 1024;

export function getDataColumns(): BasicColumn[] {
  return [
    {
      title: t('名称'),
      dataIndex: 'name',
      align: 'left',
      width: 300,
      sorter: true,
      slots: {
        customRender: 'enable',
      },
    },
    {
      title: t('创建时间'),
      dataIndex: 'creationDate',
      align: 'left',
      width: 160,
      sorter: true,
      format: (text) => {
        if (text) {
          return formatToDateTime(text, 'YYYY-MM-DD HH:mm:ss');
        }
        return text;
      },
    },
    {
      title: t('变更时间'),
      dataIndex: 'lastModifiedDate',
      align: 'left',
      width: 160,
      sorter: true,
      format: (text) => {
        if (text) {
          return formatToDateTime(text, 'YYYY-MM-DD HH:mm:ss');
        }
        return text;
      },
    },
    {
      title: t('类型'),
      dataIndex: 'isFolder',
      align: 'left',
      width: 120,
      sorter: true,
      format: (text) => {
        return Boolean(text) ? '文件夹' : '标准存储';
      },
    },
    {
      title: t('大小'),
      dataIndex: 'size',
      align: 'left',
      width: 'auto',
      sorter: true,
      format: (text) => {
        const size = Number(text);
        if (size > gbUnit) {
          let gb = Math.round(size / gbUnit);
          if (gb < 1) {
            gb = 1;
          }
          return gb + ' GB';
        }
        if (size > mbUnit) {
          let mb = Math.round(size / mbUnit);
          if (mb < 1) {
            mb = 1;
          }
          return mb + ' MB';
        }
        let kb = Math.round(size / kbUnit);
        if (kb < 1) {
          kb = 1;
        }
        return kb + ' KB';
      },
    },
  ];
}
