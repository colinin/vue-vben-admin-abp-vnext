import { useI18n } from '/@/hooks/web/useI18n';
import { FormProps } from '/@/components/Form';

const { t } = useI18n();

export function getSearchFormSchemas(): Partial<FormProps> {
  return {
    labelWidth: 100,
    schemas: [
      {
        field: 'applicationName',
        component: 'Input',
        label: t('AbpAuditLogging.ApplicationName'),
        colProps: { span: 6 },
      },
      {
        field: 'userName',
        component: 'Input',
        label: t('AbpAuditLogging.UserName'),
        colProps: { span: 6 },
      },
      {
        field: 'clientId',
        component: 'Input',
        label: t('AbpAuditLogging.ClientId'),
        colProps: { span: 6 },
      },
      {
        field: 'identity',
        component: 'Input',
        label: t('AbpAuditLogging.Identity'),
        colProps: { span: 6 },
      },
      {
        field: 'actionName',
        component: 'Input',
        label: t('AbpAuditLogging.ActionName'),
        colProps: { span: 6 },
      },
      {
        field: 'correlationId',
        component: 'Input',
        label: t('AbpAuditLogging.CorrelationId'),
        colProps: { span: 6 },
      },
      {
        field: 'startTime',
        component: 'DatePicker',
        label: t('AbpAuditLogging.StartTime'),
        colProps: { span: 6 },
        componentProps: {
          style: {
            width: '100%',
          },
        },
      },
      {
        field: 'endTime',
        component: 'DatePicker',
        label: t('AbpAuditLogging.EndTime'),
        colProps: { span: 6 },
        componentProps: {
          style: {
            width: '100%',
          },
        },
      },
    ],
  };
}
