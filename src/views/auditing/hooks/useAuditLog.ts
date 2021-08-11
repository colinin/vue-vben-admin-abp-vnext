import { computed } from 'vue';
import { useI18n } from '/@/hooks/web/useI18n';
import { ChangeType } from '/@/api/auditing/model/auditLogModel';

export function useAuditLog() {
  const { t } = useI18n();
  const changeTypeColorMap = {
    [ChangeType.Created]: { color: '#87d068', value: t('AbpAuditLogging.Created') },
    [ChangeType.Updated]: { color: '#108ee9', value: t('AbpAuditLogging.Updated') },
    [ChangeType.Deleted]: { color: 'red', value: t('AbpAuditLogging.Deleted') },
  };
  const methodColorMap: { [key: string]: string } = {
    ['GET']: 'blue',
    ['POST']: 'green',
    ['PUT']: 'orange',
    ['DELETE']: 'red',
    ['OPTIONS']: 'cyan',
    ['PATCH']: 'pink',
  };
  const entityChangeTypeColor = computed(() => {
    return (changeType: ChangeType) => changeTypeColorMap[changeType].color;
  });
  const entityChangeType = computed(() => {
    return (changeType: ChangeType) => changeTypeColorMap[changeType].value;
  });
  const httpMethodColor = computed(() => {
    return (method: string) => {
      return methodColorMap[method];
    };
  });
  const httpStatusCodeColor = computed(() => {
    return (statusCode: number) => {
      if (statusCode >= 200 && statusCode < 300) {
        return '#87d068';
      }
      if (statusCode >= 300 && statusCode < 400) {
        return '#108ee9';
      }
      if (statusCode >= 400 && statusCode < 500) {
        return 'orange';
      }
      if (statusCode >= 500) {
        return 'red';
      }
      return 'cyan';
    };
  });

  return {
    httpMethodColor,
    httpStatusCodeColor,
    entityChangeTypeColor,
    entityChangeType,
  };
}
