<template>
  <BasicModal
    @register="registerModal"
    :width="800"
    :height="400"
    :title="t('AbpAuditLogging.AuditLog')"
  >
    <Form
      :colon="false"
      :labelCol="{ span: 6 }"
      :wrapperCol="{ span: 18 }"
      layout="horizontal"
      :model="modelRef"
    >
      <Tabs v-model:activeKey="activeKey">
        <TabPane key="basic" :tab="t('AbpAuditLogging.Operation')">
          <FormItem labelAlign="left" :label="t('AbpAuditLogging.HttpStatusCode')">
            <Tag :color="httpStatusCodeColor(modelRef.httpStatusCode)">
              {{ modelRef.httpStatusCode }}
            </Tag>
          </FormItem>
          <FormItem labelAlign="left" :label="t('AbpAuditLogging.HttpMethod')">
            <Tag :color="httpMethodColor(modelRef.httpMethod)">
              {{ modelRef.httpMethod }}
            </Tag>
          </FormItem>
          <FormItem labelAlign="left" :label="t('AbpAuditLogging.RequestUrl')">
            <span>{{ modelRef.url }}</span>
          </FormItem>
          <FormItem labelAlign="left" :label="t('AbpAuditLogging.ClientIpAddress')">
            <span>{{ modelRef.clientIpAddress }}</span>
          </FormItem>
          <FormItem labelAlign="left" :label="t('AbpAuditLogging.ClientId')">
            <span>{{ modelRef.clientId }}</span>
          </FormItem>
          <FormItem labelAlign="left" :label="t('AbpAuditLogging.ClientName')">
            <span>{{ modelRef.clientName }}</span>
          </FormItem>
          <FormItem labelAlign="left" :label="t('AbpAuditLogging.UserName')">
            <span>{{ modelRef.userName }}</span>
          </FormItem>
          <FormItem labelAlign="left" :label="t('AbpAuditLogging.ExecutionTime')">
            <span>{{ formatDateVal(modelRef.executionTime) }}</span>
          </FormItem>
          <FormItem labelAlign="left" :label="t('AbpAuditLogging.ExecutionDuration')">
            <span>{{ modelRef.executionDuration }}</span>
          </FormItem>
          <FormItem labelAlign="left" :label="t('AbpAuditLogging.BrowserInfo')">
            <span>{{ modelRef.browserInfo }}</span>
          </FormItem>
          <FormItem labelAlign="left" :label="t('AbpAuditLogging.ApplicationName')">
            <span>{{ modelRef.applicationName }}</span>
          </FormItem>
          <FormItem labelAlign="left" :label="t('AbpAuditLogging.CorrelationId')">
            <span>{{ modelRef.correlationId }}</span>
          </FormItem>
          <FormItem labelAlign="left" :label="t('AbpAuditLogging.Comments')">
            <span>{{ modelRef.comments }}</span>
          </FormItem>
          <FormItem labelAlign="left" :label="t('AbpAuditLogging.Additional')">
            <span>{{ modelRef.extraProperties }}</span>
          </FormItem>
          <FormItem labelAlign="left" :label="t('AbpAuditLogging.Exception')">
            <span>{{ modelRef.exceptions }}</span>
          </FormItem>
        </TabPane>
        <TabPane
          v-if="modelRef.actions?.length > 0"
          key="opera"
          :tab="`${t('AbpAuditLogging.InvokeMethod')}(${modelRef.actions?.length})`"
        >
          <Collapse>
            <CollapsePanel
              v-for="action in modelRef.actions"
              :key="action.id"
              :header="action.serviceName"
              :show-arrow="false"
            >
              <FormItem labelAlign="left" :label="t('AbpAuditLogging.MethodName')">
                <span>{{ action.methodName }}</span>
              </FormItem>
              <FormItem labelAlign="left" :label="t('AbpAuditLogging.ExecutionTime')">
                <span>{{ formatDateVal(action.executionTime) }}</span>
              </FormItem>
              <FormItem labelAlign="left" :label="t('AbpAuditLogging.ExecutionDuration')">
                <span>{{ action.executionDuration }}</span>
              </FormItem>
              <FormItem labelAlign="left" :label="t('AbpAuditLogging.Parameters')">
                <CodeEditor
                  :readonly="true"
                  mode="application/json"
                  :value="formatJsonVal(action.parameters)"
                />
              </FormItem>
              <FormItem labelAlign="left" :label="t('AbpAuditLogging.Additional')">
                <span>{{ action.extraProperties }}</span>
              </FormItem>
            </CollapsePanel>
          </Collapse>
        </TabPane>
        <TabPane
          v-if="modelRef.entityChanges?.length > 0"
          key="changes"
          :tab="`${t('AbpAuditLogging.EntitiesChanged')}(${modelRef.entityChanges.length})`"
        >
          <Collapse>
            <CollapsePanel
              v-for="entity in modelRef.entityChanges"
              :key="entity.id"
              :header="entity.entityTypeFullName"
              :show-arrow="false"
            >
              <FormItem labelAlign="left" :label="t('AbpAuditLogging.ChangeType')">
                <Tag :color="entityChangeTypeColor(entity.changeType)">
                  {{ entityChangeType(entity.changeType) }}
                </Tag>
              </FormItem>
              <FormItem labelAlign="left" :label="t('AbpAuditLogging.EntityId')">
                <span>{{ entity.entityId }}</span>
              </FormItem>
              <FormItem labelAlign="left" :label="t('AbpAuditLogging.TenantId')">
                <span>{{ entity.entityTenantId }}</span>
              </FormItem>
              <FormItem labelAlign="left" :label="t('AbpAuditLogging.StartTime')">
                <span>{{ formatDateVal(entity.changeTime) }}</span>
              </FormItem>
              <FormItem labelAlign="left" :label="t('AbpAuditLogging.Additional')">
                <span>{{ entity.extraProperties }}</span>
              </FormItem>
              <BasicTable
                v-if="entity.propertyChanges.length > 0"
                row-key="id"
                :title="t('AbpAuditLogging.PropertyChanges')"
                :columns="columns"
                :data-source="entity.propertyChanges"
                :pagination="false"
                :striped="false"
                :use-search-form="false"
                :show-table-stting="false"
                :bordered="true"
                :show-index-column="false"
                :can-resize="false"
                :immediate="false"
              />
            </CollapsePanel>
          </Collapse>
        </TabPane>
      </Tabs>
    </Form>
  </BasicModal>
</template>

<script lang="ts">
  import { computed, defineComponent, ref, watch, unref } from 'vue';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { Collapse, Form, Tabs, Tag } from 'ant-design-vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicTable, BasicColumn } from '/@/components/Table';
  import { CodeEditor } from '/@/components/CodeEditor';
  import { useAuditLog } from '../hooks/useAuditLog';
  import { getById } from '/@/api/auditing/auditLog';
  import { AuditLog } from '/@/api/auditing/model/auditLogModel';
  import { formatToDateTime } from '/@/utils/dateUtil';
  import { tryToJson } from '/@/utils/strings';
  export default defineComponent({
    name: 'AuditLogModal',
    components: {
      BasicModal,
      BasicTable,
      CodeEditor,
      Collapse,
      CollapsePanel: Collapse.Panel,
      Form,
      FormItem: Form.Item,
      Tag,
      Tabs,
      TabPane: Tabs.TabPane,
    },
    setup() {
      const { t } = useI18n();
      const activeKey = ref('basic');
      const auditLogIdRef = ref('');
      const modelRef = ref<AuditLog>({} as AuditLog);
      const [registerModal] = useModalInner((model) => {
        auditLogIdRef.value = model.id;
        activeKey.value = 'basic';
      });
      const columns: BasicColumn[] = [
        {
          title: 'id',
          dataIndex: 'id',
          width: 1,
          ifShow: false,
        },
        {
          title: t('AbpAuditLogging.PropertyName'),
          dataIndex: 'propertyName',
          align: 'left',
          width: 120,
          sorter: true,
        },
        {
          title: t('AbpAuditLogging.NewValue'),
          dataIndex: 'newValue',
          align: 'left',
          width: 200,
          sorter: true,
        },
        {
          title: t('AbpAuditLogging.OriginalValue'),
          dataIndex: 'originalValue',
          align: 'left',
          width: 200,
          sorter: true,
        },
        {
          title: t('AbpAuditLogging.PropertyTypeFullName'),
          dataIndex: 'propertyTypeFullName',
          align: 'left',
          width: 300,
          sorter: true,
        },
      ];
      const { entityChangeTypeColor, entityChangeType, httpMethodColor, httpStatusCodeColor } =
        useAuditLog();
      const formatJsonVal = computed(() => {
        return (jsonString: string) => tryToJson(jsonString);
      });
      const formatDateVal = computed(() => {
        return (dateVal) => formatToDateTime(dateVal, 'YYYY-MM-DD HH:mm:ss');
      });

      watch(
        () => unref(auditLogIdRef),
        (id) => {
          if (id) {
            getById(id).then((res) => {
              modelRef.value = res;
            });
          }
        },
      );

      return {
        t,
        columns,
        modelRef,
        activeKey,
        entityChangeType,
        entityChangeTypeColor,
        httpMethodColor,
        httpStatusCodeColor,
        registerModal,
        formatJsonVal,
        formatDateVal,
      };
    },
  });
</script>
