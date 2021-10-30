import { useI18n } from '/@/hooks/web/useI18n';
import { FormProps } from '/@/components/Form';
import { LogLevel } from '/@/api/logging/model/loggingModel';

const { t } = useI18n();

export function getSearchFormSchemas(): Partial<FormProps> {
  return {
    labelWidth: 100,
    schemas: [
      {
        field: 'startTime',
        component: 'DatePicker',
        label: t('AbpAuditLogging.StartTime'),
        colProps: { span: 9 },
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
        colProps: { span: 9 },
        componentProps: {
          style: {
            width: '100%',
          },
        },
      },
      {
        field: 'level',
        component: 'Select',
        label: t('AbpAuditLogging.Level'),
        colProps: { span: 6 },
        componentProps: {
          style: {
            width: '100%',
          },
          options: [
            { label: 'None', value: LogLevel.None },
            { label: 'Debug', value: LogLevel.Debug },
            { label: 'Information', value: LogLevel.Information },
            { label: 'Warning', value: LogLevel.Warning },
            { label: 'Error', value: LogLevel.Error },
            { label: 'Trace', value: LogLevel.Trace },
            { label: 'Critical', value: LogLevel.Critical },
          ],
        },
      },
      {
        field: 'hasException',
        component: 'Select',
        label: t('AbpAuditLogging.HasException'),
        colProps: { span: 6 },
        componentProps: {
          style: {
            width: '100%',
          },
          options: [
            { label: 'None', value: null },
            { label: 'True', value: true },
            { label: 'False', value: false },
          ],
        },
      },
      {
        field: 'machineName',
        component: 'Input',
        label: t('AbpAuditLogging.MachineName'),
        colProps: { span: 6 },
      },
      {
        field: 'environment',
        component: 'Input',
        label: t('AbpAuditLogging.Environment'),
        colProps: { span: 6 },
      },
      {
        field: 'application',
        component: 'Input',
        label: t('AbpAuditLogging.Application'),
        colProps: { span: 6 },
      },
      {
        field: 'requestId',
        component: 'Input',
        label: t('AbpAuditLogging.RequestId'),
        colProps: { span: 8 },
      },
      {
        field: 'requestPath',
        component: 'Input',
        label: t('AbpAuditLogging.RequestPath'),
        colProps: { span: 8 },
      },
      {
        field: 'correlationId',
        component: 'Input',
        label: t('AbpAuditLogging.CorrelationId'),
        colProps: { span: 8 },
      },
    ],
  };
}
