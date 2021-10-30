<template>
  <BasicModal
    @register="registerModal"
    :width="800"
    :height="400"
    :title="t('AbpAuditLogging.Logging')"
  >
    <Form :labelCol="{ span: 4 }" :wrapperCol="{ span: 20 }" layout="horizontal" :model="modelRef">
      <Tabs v-model:activeKey="activeKey">
        <TabPane key="basic" :tab="t('AbpAuditLogging.Operation')">
          <FormItem :label="t('AbpAuditLogging.TimeStamp')">
            <span>{{ formatDateVal(modelRef.timeStamp) }}</span>
          </FormItem>
          <FormItem :label="t('AbpAuditLogging.Level')">
            <Tag :color="LogLevelColor[modelRef.level]">
              {{ LogLevelLabel[modelRef.level] }}
            </Tag>
          </FormItem>
          <FormItem :label="t('AbpAuditLogging.Message')">
            <TextArea v-model:value="modelRef.message" readonly :rows="10" />
          </FormItem>
        </TabPane>
        <TabPane v-if="modelRef.fields" key="fields" :tab="t('AbpAuditLogging.Fields')">
          <FormItem :label="t('AbpAuditLogging.MachineName')">
            <span>{{ modelRef.fields.machineName }}</span>
          </FormItem>
          <FormItem :label="t('AbpAuditLogging.Environment')">
            <span>{{ modelRef.fields.environment }}</span>
          </FormItem>
          <FormItem :label="t('AbpAuditLogging.Application')">
            <span>{{ modelRef.fields.application }}</span>
          </FormItem>
          <FormItem :label="t('AbpAuditLogging.ProcessId')">
            <span>{{ modelRef.fields.processId }}</span>
          </FormItem>
          <FormItem :label="t('AbpAuditLogging.ThreadId')">
            <span>{{ modelRef.fields.threadId }}</span>
          </FormItem>
          <FormItem :label="t('AbpAuditLogging.Context')">
            <span>{{ modelRef.fields.context }}</span>
          </FormItem>
          <FormItem :label="t('AbpAuditLogging.ActionId')">
            <span>{{ modelRef.fields.actionId }}</span>
          </FormItem>
          <FormItem :label="t('AbpAuditLogging.ActionName')">
            <span>{{ modelRef.fields.actionName }}</span>
          </FormItem>
          <FormItem :label="t('AbpAuditLogging.RequestId')">
            <span>{{ modelRef.fields.requestId }}</span>
          </FormItem>
          <FormItem :label="t('AbpAuditLogging.RequestPath')">
            <span>{{ modelRef.fields.requestPath }}</span>
          </FormItem>
          <FormItem :label="t('AbpAuditLogging.ConnectionId')">
            <span>{{ modelRef.fields.connectionId }}</span>
          </FormItem>
          <FormItem :label="t('AbpAuditLogging.CorrelationId')">
            <span>{{ modelRef.fields.correlationId }}</span>
          </FormItem>
          <FormItem :label="t('AbpAuditLogging.ClientId')">
            <span>{{ modelRef.fields.clientId }}</span>
          </FormItem>
          <FormItem :label="t('AbpAuditLogging.UserId')">
            <span>{{ modelRef.fields.userId }}</span>
          </FormItem>
        </TabPane>
        <TabPane
          v-if="modelRef.exceptions && modelRef.exceptions.length > 0"
          key="exceptions"
          :tab="t('AbpAuditLogging.Exceptions')"
        >
          <Collapse>
            <CollapsePanel
              v-for="(exception, index) in modelRef.exceptions"
              :key="index"
              :header="exception.class"
              :show-arrow="false"
            >
              <FormItem :label="t('AbpAuditLogging.Class')">
                <span>{{ exception.class }}</span>
              </FormItem>
              <FormItem :label="t('AbpAuditLogging.Message')">
                <span>{{ exception.message }}</span>
              </FormItem>
              <FormItem :label="t('AbpAuditLogging.Source')">
                <span>{{ exception.source }}</span>
              </FormItem>
              <FormItem :label="t('AbpAuditLogging.StackTrace')">
                <TextArea v-model:value="exception.stackTrace" readonly :rows="10" />
              </FormItem>
              <FormItem :label="t('AbpAuditLogging.HResult')">
                <span>{{ exception.hResult }}</span>
              </FormItem>
              <FormItem :label="t('AbpAuditLogging.HelpURL')">
                <span>{{ exception.helpURL }}</span>
              </FormItem>
            </CollapsePanel>
          </Collapse>
        </TabPane>
      </Tabs>
    </Form>
  </BasicModal>
</template>

<script lang="ts">
  import { computed, defineComponent, ref } from 'vue';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { Collapse, Form, Tabs, Tag, Input } from 'ant-design-vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { get } from '/@/api/logging/logging';
  import { LogLevelColor, LogLevelLabel } from '../datas/typing';
  import { Log } from '/@/api/logging/model/loggingModel';
  import { formatToDateTime } from '/@/utils/dateUtil';
  export default defineComponent({
    name: 'LoggingModal',
    components: {
      BasicModal,
      Collapse,
      CollapsePanel: Collapse.Panel,
      Form,
      FormItem: Form.Item,
      Tag,
      Tabs,
      TabPane: Tabs.TabPane,
      TextArea: Input.TextArea,
    },
    setup() {
      const { t } = useI18n();
      const activeKey = ref('basic');
      const modelRef = ref<Log>({} as Log);
      const [registerModal] = useModalInner((model) => {
        activeKey.value = 'basic';
        modelRef.value = {} as Log;
        get(model.timeStamp).then((res) => {
          modelRef.value = res;
        });
      });
      const formatDateVal = computed(() => {
        return (dateVal) => formatToDateTime(dateVal, 'YYYY-MM-DD HH:mm:ss');
      });

      return {
        t,
        modelRef,
        activeKey,
        registerModal,
        formatDateVal,
        LogLevelColor,
        LogLevelLabel,
      };
    },
  });
</script>
