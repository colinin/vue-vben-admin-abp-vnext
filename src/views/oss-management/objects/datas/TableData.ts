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
      title: t('AbpOssManagement.DisplayName:Name'),
      dataIndex: 'name',
      align: 'left',
      width: 300,
      sorter: true,
      slots: {
        customRender: 'enable',
      },
    },
    {
      title: t('AbpOssManagement.DisplayName:CreationDate'),
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
      title: t('AbpOssManagement.DisplayName:LastModifiedDate'),
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
      title: t('AbpOssManagement.DisplayName:FileType'),
      dataIndex: 'isFolder',
      align: 'left',
      width: 120,
      sorter: true,
      format: (text) => {
        return Boolean(text)
          ? t('AbpOssManagement.DisplayName:Folder')
          : t('AbpOssManagement.DisplayName:Standard');
      },
    },
    {
      title: t('AbpOssManagement.DisplayName:Size'),
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
