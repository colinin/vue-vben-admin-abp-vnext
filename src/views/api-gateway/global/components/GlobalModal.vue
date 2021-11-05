<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    :title="formTitle"
    :width="800"
    :min-height="400"
    @ok="handleSubmit"
    @cancel="handleCancel"
  >
    <Form
      ref="formElRef"
      :model="modelRef"
      :rules="formRules"
      :label-col="{ span: 6 }"
      :wrapper-col="{ span: 18 }"
    >
      <Tabs v-model:activeKey="activedTabRef">
        <TabPane key="info" :tab="t('ApiGateway.Basic')" forceRender>
          <FormItem name="appId" :label="t('ApiGateway.DisplayName:AppId')">
            <Select
              v-model:value="modelRef.appId"
              :options="appIdOptions"
              :disabled="modelRef.itemId !== undefined"
            />
          </FormItem>
          <FormItem name="baseUrl" :label="t('ApiGateway.DisplayName:BaseUrl')">
            <Input v-model:value="modelRef.baseUrl" />
          </FormItem>
          <FormItem name="requestIdKey" :label="t('ApiGateway.DisplayName:RequestIdKey')">
            <Input v-model:value="modelRef.requestIdKey" />
          </FormItem>
          <FormItem name="downstreamScheme" :label="t('ApiGateway.DisplayName:DownstreamScheme')">
            <Input v-model:value="modelRef.downstreamScheme" />
          </FormItem>
          <FormItem
            name="downstreamHttpVersion"
            :label="t('ApiGateway.DisplayName:DownstreamHttpVersion')"
          >
            <Input v-model:value="modelRef.downstreamHttpVersion" />
          </FormItem>
        </TabPane>
        <TabPane key="httpOptions" :tab="t('ApiGateway.HttpOptions')" forceRender>
          <FormItem
            name="httpHandlerOptions.maxConnectionsPerServer"
            :label="t('ApiGateway.DisplayName:MaxConnectionsPerServer')"
          >
            <InputNumber
              style="width: 100%"
              v-model:value="modelRef.httpHandlerOptions.maxConnectionsPerServer"
            />
          </FormItem>
          <FormItem
            :name="['httpHandlerOptions', 'useProxy']"
            :label="t('ApiGateway.DisplayName:UseProxy')"
          >
            <RadioGroup
              v-model:value="modelRef.httpHandlerOptions.useProxy"
              :options="radioOptions"
            />
          </FormItem>
          <FormItem
            :name="['httpHandlerOptions', 'useTracing']"
            :label="t('ApiGateway.DisplayName:UseTracing')"
          >
            <RadioGroup
              v-model:value="modelRef.httpHandlerOptions.useTracing"
              :options="radioOptions"
            />
          </FormItem>
          <FormItem
            :name="['httpHandlerOptions', 'allowAutoRedirect']"
            :label="t('ApiGateway.DisplayName:AllowAutoRedirect')"
          >
            <RadioGroup
              v-model:value="modelRef.httpHandlerOptions.allowAutoRedirect"
              :options="radioOptions"
            />
          </FormItem>
          <FormItem
            :name="['httpHandlerOptions', 'useCookieContainer']"
            :label="t('ApiGateway.DisplayName:UseCookieContainer')"
          >
            <RadioGroup
              v-model:value="modelRef.httpHandlerOptions.useCookieContainer"
              :options="radioOptions"
            />
          </FormItem>
        </TabPane>
        <TabPane key="rateLimit" :tab="t('ApiGateway.RateLimit')" forceRender>
          <FormItem
            :name="['rateLimitOptions', 'disableRateLimitHeaders']"
            :label="t('ApiGateway.DisplayName:DisableRateLimitHeaders')"
          >
            <RadioGroup
              v-model:value="modelRef.rateLimitOptions.disableRateLimitHeaders"
              :options="radioOptions"
            />
          </FormItem>
          <FormItem
            :name="['rateLimitOptions', 'clientIdHeader']"
            :label="t('ApiGateway.DisplayName:ClientIdHeader')"
          >
            <Input v-model:value="modelRef.rateLimitOptions.clientIdHeader" />
          </FormItem>
          <FormItem
            :name="['rateLimitOptions', 'httpStatusCode']"
            :label="t('ApiGateway.DisplayName:HttpStatusCode')"
          >
            <InputNumber
              style="width: 100%"
              v-model:value="modelRef.rateLimitOptions.httpStatusCode"
            />
          </FormItem>
          <FormItem
            :name="['rateLimitOptions', 'rateLimitCounterPrefix']"
            :label="t('ApiGateway.DisplayName:RateLimitCounterPrefix')"
          >
            <Input v-model:value="modelRef.rateLimitOptions.rateLimitCounterPrefix" />
          </FormItem>
          <FormItem
            :name="['rateLimitOptions', 'quotaExceededMessage']"
            :label="t('ApiGateway.DisplayName:QuotaExceededMessage')"
          >
            <TextArea
              v-model:value="modelRef.rateLimitOptions.quotaExceededMessage"
              :auto-size="{ minRows: 5, maxRows: 10 }"
            />
          </FormItem>
        </TabPane>
        <TabPane key="qos" :tab="t('ApiGateway.Qos')" forceRender>
          <FormItem
            :name="['qoSOptions', 'timeoutValue']"
            :label="t('ApiGateway.DisplayName:TimeoutValue')"
          >
            <InputNumber style="width: 100%" v-model:value="modelRef.qoSOptions.timeoutValue" />
          </FormItem>
          <FormItem
            :name="['qoSOptions', 'durationOfBreak']"
            :label="t('ApiGateway.DisplayName:DurationOfBreak')"
          >
            <InputNumber style="width: 100%" v-model:value="modelRef.qoSOptions.durationOfBreak" />
          </FormItem>
          <FormItem
            :name="['qoSOptions', 'exceptionsAllowedBeforeBreaking']"
            :label="t('ApiGateway.DisplayName:ExceptionsAllowedBeforeBreaking')"
          >
            <InputNumber
              style="width: 100%"
              v-model:value="modelRef.qoSOptions.exceptionsAllowedBeforeBreaking"
            />
          </FormItem>
        </TabPane>
        <TabPane key="LoadBalancer" :tab="t('ApiGateway.LoadBalancer')" forceRender>
          <FormItem
            :name="['loadBalancerOptions', 'type']"
            :label="t('ApiGateway.DisplayName:LoadBalancerType')"
          >
            <Select v-model:value="modelRef.loadBalancerOptions.type" :options="balancerOptions" />
          </FormItem>
          <FormItem
            :name="['loadBalancerOptions', 'key']"
            :label="t('ApiGateway.DisplayName:PollingKey')"
          >
            <Input v-model:value="modelRef.loadBalancerOptions.key" />
          </FormItem>
          <FormItem
            :name="['loadBalancerOptions', 'expiry']"
            :label="t('ApiGateway.DisplayName:Expiry')"
          >
            <InputNumber style="width: 100%" v-model:value="modelRef.loadBalancerOptions.expiry" />
          </FormItem>
        </TabPane>
        <TabPane key="ServiceDiscovery" :tab="t('ApiGateway.ServiceDiscovery')" forceRender>
          <FormItem
            :name="['serviceDiscoveryProvider', 'type']"
            :label="t('ApiGateway.DisplayName:DiscoveryType')"
          >
            <Select
              v-model:value="modelRef.serviceDiscoveryProvider.type"
              :options="discoveryOptions"
            />
          </FormItem>
          <FormItem
            :name="['serviceDiscoveryProvider', 'host']"
            :label="t('ApiGateway.DisplayName:Host')"
          >
            <Input v-model:value="modelRef.serviceDiscoveryProvider.host" />
          </FormItem>
          <FormItem
            :name="['serviceDiscoveryProvider', 'port']"
            :label="t('ApiGateway.DisplayName:Port')"
          >
            <InputNumber
              style="width: 100%"
              v-model:value="modelRef.serviceDiscoveryProvider.port"
            />
          </FormItem>
          <FormItem
            :name="['serviceDiscoveryProvider', 'token']"
            :label="t('ApiGateway.DisplayName:Token')"
          >
            <Input v-model:value="modelRef.serviceDiscoveryProvider.token" />
          </FormItem>
          <FormItem
            :name="['serviceDiscoveryProvider', 'configurationKey']"
            :label="t('ApiGateway.DisplayName:ConfigurationKey')"
          >
            <Input v-model:value="modelRef.serviceDiscoveryProvider.configurationKey" />
          </FormItem>
          <FormItem
            :name="['serviceDiscoveryProvider', 'namespace']"
            :label="t('ApiGateway.DisplayName:Namespace')"
          >
            <Input v-model:value="modelRef.serviceDiscoveryProvider.namespace" />
          </FormItem>
          <FormItem
            :name="['serviceDiscoveryProvider', 'scheme']"
            :label="t('ApiGateway.DisplayName:Scheme')"
          >
            <Input v-model:value="modelRef.serviceDiscoveryProvider.scheme" />
          </FormItem>
          <FormItem
            :name="['serviceDiscoveryProvider', 'pollingInterval']"
            :label="t('ApiGateway.DisplayName:PollingInterval')"
          >
            <InputNumber
              style="width: 100%"
              v-model:value="modelRef.serviceDiscoveryProvider.pollingInterval"
            />
          </FormItem>
        </TabPane>
      </Tabs>
    </Form>
  </BasicModal>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';

  import { useI18n } from '/@/hooks/web/useI18n';
  import { Checkbox, Form, Tabs, Input, InputNumber, Select, RadioGroup } from 'ant-design-vue';
  import { Input as BInput } from '/@/components/Input';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { useGlobalModal } from '../hooks/useGlobalModal';

  export default defineComponent({
    name: 'GlobalModal',
    components: {
      BasicModal,
      Checkbox,
      Form,
      FormItem: Form.Item,
      Input: BInput,
      TextArea: Input.TextArea,
      Tabs,
      TabPane: Tabs.TabPane,
      InputNumber,
      Select,
      RadioGroup,
    },
    emits: ['change', 'register'],
    setup(_, { emit }) {
      const { t } = useI18n();
      const appIdRef = ref('');
      const formElRef = ref<any>(null);
      const activedTabRef = ref('info');

      const [registerModal, modalMethods] = useModalInner((args) => {
        activedTabRef.value = 'info';
        appIdRef.value = args.appId;
      });

      const {
        modelRef,
        formTitle,
        formRules,
        radioOptions,
        appIdOptions,
        balancerOptions,
        discoveryOptions,
        handleCancel,
        handleSubmit,
      } = useGlobalModal({ emit, appIdRef, formElRef, modalMethods });

      return {
        t,
        modelRef,
        formTitle,
        formElRef,
        formRules,
        activedTabRef,
        radioOptions,
        appIdOptions,
        balancerOptions,
        discoveryOptions,
        registerModal,
        handleCancel,
        handleSubmit,
      };
    },
  });
</script>
