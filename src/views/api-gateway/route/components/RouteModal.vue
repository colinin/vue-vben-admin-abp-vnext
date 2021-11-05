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
      :model="routeRef"
      :rules="formRules"
      :label-col="{ span: 6 }"
      :wrapper-col="{ span: 18 }"
    >
      <Tabs v-model:activeKey="activedTabRef">
        <TabPane key="info" :tab="t('ApiGateway.Basic')" forceRender>
          <FormItem name="appId" :label="t('ApiGateway.DisplayName:AppId')">
            <Select
              v-model:value="routeRef.appId"
              :options="appIdOptions"
              :disabled="routeRef.reRouteId !== undefined"
            />
          </FormItem>
          <FormItem name="reRouteName" :label="t('ApiGateway.DisplayName:Name')">
            <Input v-model:value="routeRef.reRouteName" />
          </FormItem>
          <FormItem name="requestIdKey" :label="t('ApiGateway.DisplayName:RequestIdKey')">
            <Input v-model:value="routeRef.requestIdKey" />
          </FormItem>
          <FormItem name="serviceName" :label="t('ApiGateway.DisplayName:ServiceName')">
            <Input v-model:value="routeRef.serviceName" />
          </FormItem>
          <FormItem name="serviceNamespace" :label="t('ApiGateway.DisplayName:Namespace')">
            <Input v-model:value="routeRef.serviceNamespace" />
          </FormItem>
          <FormItem name="timeout" :label="t('ApiGateway.DisplayName:Timeout')">
            <InputNumber style="width: 100%" v-model:value="routeRef.timeout" />
          </FormItem>
          <FormItem name="priority" :label="t('ApiGateway.DisplayName:Priority')">
            <InputNumber style="width: 100%" v-model:value="routeRef.priority" />
          </FormItem>
          <FormItem :label="t('ApiGateway.DisplayName:CaseSensitive')">
            <Checkbox v-model:checked="routeRef.reRouteIsCaseSensitive">
              {{ t('ApiGateway.DisplayName:CaseSensitive') }}
            </Checkbox>
          </FormItem>
          <FormItem
            :label="t('ApiGateway.DisplayName:DangerousAcceptAnyServerCertificateValidator')"
          >
            <Checkbox v-model:checked="routeRef.dangerousAcceptAnyServerCertificateValidator">
              {{ t('ApiGateway.DisplayName:DangerousAcceptAnyServerCertificateValidator') }}
            </Checkbox>
          </FormItem>
        </TabPane>
        <TabPane key="forward" :tab="t('ApiGateway.Forward')" forceRender>
          <FormItem name="downstreamScheme" :label="t('ApiGateway.DisplayName:DownstreamScheme')">
            <Input v-model:value="routeRef.downstreamScheme" />
          </FormItem>
          <FormItem
            name="downstreamHttpVersion"
            :label="t('ApiGateway.DisplayName:DownstreamHttpVersion')"
          >
            <Input v-model:value="routeRef.downstreamHttpVersion" />
          </FormItem>
          <FormItem
            name="upstreamPathTemplate"
            :label="t('ApiGateway.DisplayName:UpstreamPathTemplate')"
          >
            <Input v-model:value="routeRef.upstreamPathTemplate" />
          </FormItem>
          <FormItem
            name="downstreamPathTemplate"
            :label="t('ApiGateway.DisplayName:DownstreamPathTemplate')"
          >
            <Input v-model:value="routeRef.downstreamPathTemplate" />
          </FormItem>
          <FormItem name="key" :label="t('ApiGateway.DisplayName:AggregateKey')">
            <Input v-model:value="routeRef.key" />
          </FormItem>
          <FormItem
            name="upstreamHttpMethod"
            :label="t('ApiGateway.DisplayName:UpstreamHttpMethod')"
          >
            <Select
              mode="multiple"
              v-model:value="routeRef.upstreamHttpMethod"
              :options="httpMethods"
            />
          </FormItem>
          <FormItem
            name="downstreamHttpMethod"
            :label="t('ApiGateway.DisplayName:DownstreamHttpMethod')"
          >
            <Input v-model:value="routeRef.downstreamHttpMethod" />
          </FormItem>
          <FormItem
            name="downstreamHostAndPorts"
            :label="t('ApiGateway.DisplayName:DownstreamHostAndPorts')"
          >
            <Select
              mode="tags"
              :open="false"
              :value="getHostAndPorts"
              @change="onHostAndPortsChange"
            />
          </FormItem>
        </TabPane>
        <TabPane key="http" :tab="t('ApiGateway.HttpOptions')" forceRender>
          <FormItem
            :name="['httpHandlerOptions', 'maxConnectionsPerServer']"
            :label="t('ApiGateway.DisplayName:MaxConnectionsPerServer')"
          >
            <InputNumber
              style="width: 100%"
              v-model:value="routeRef.httpHandlerOptions.maxConnectionsPerServer"
            />
          </FormItem>
          <FormItem
            :name="['httpHandlerOptions', 'useProxy']"
            :label="t('ApiGateway.DisplayName:UseProxy')"
          >
            <RadioGroup
              v-model:value="routeRef.httpHandlerOptions.useProxy"
              :options="radioOptions"
            />
          </FormItem>
          <FormItem
            :name="['httpHandlerOptions', 'useTracing']"
            :label="t('ApiGateway.DisplayName:UseTracing')"
          >
            <RadioGroup
              v-model:value="routeRef.httpHandlerOptions.useTracing"
              :options="radioOptions"
            />
          </FormItem>
          <FormItem
            :name="['httpHandlerOptions', 'allowAutoRedirect']"
            :label="t('ApiGateway.DisplayName:AllowAutoRedirect')"
          >
            <RadioGroup
              v-model:value="routeRef.httpHandlerOptions.allowAutoRedirect"
              :options="radioOptions"
            />
          </FormItem>
          <FormItem
            :name="['httpHandlerOptions', 'useCookieContainer']"
            :label="t('ApiGateway.DisplayName:UseCookieContainer')"
          >
            <RadioGroup
              buttonStyle="solid"
              v-model:value="routeRef.httpHandlerOptions.useCookieContainer"
              :options="radioOptions"
            />
          </FormItem>
        </TabPane>
        <TabPane key="processing" :tab="t('ApiGateway.RequestProcessing')" forceRender>
          <FormItem
            name="addClaimsToRequest"
            :label="t('ApiGateway.DisplayName:AddClaimsToRequest')"
          >
            <Select
              mode="tags"
              :open="false"
              :value="getDictionaryValue('addClaimsToRequest')"
              @select="(val) => onDictionarySelect('addClaimsToRequest', val)"
              @deselect="(val) => onDictionaryUnSelect('addClaimsToRequest', val)"
            />
          </FormItem>
          <FormItem
            name="addHeadersToRequest"
            :label="t('ApiGateway.DisplayName:AddHeadersToRequest')"
          >
            <Select
              mode="tags"
              :open="false"
              :value="getDictionaryValue('addHeadersToRequest')"
              @select="(val) => onDictionarySelect('addHeadersToRequest', val)"
              @deselect="(val) => onDictionaryUnSelect('addHeadersToRequest', val)"
            />
          </FormItem>
          <FormItem
            name="upstreamHeaderTransform"
            :label="t('ApiGateway.DisplayName:UpstreamHeaderTransform')"
          >
            <Select
              mode="tags"
              :open="false"
              :value="getDictionaryValue('upstreamHeaderTransform')"
              @select="(val) => onDictionarySelect('upstreamHeaderTransform', val)"
              @deselect="(val) => onDictionaryUnSelect('upstreamHeaderTransform', val)"
            />
          </FormItem>
          <FormItem
            name="downstreamHeaderTransform"
            :label="t('ApiGateway.DisplayName:DownstreamHeaderTransform')"
          >
            <Select
              mode="tags"
              :open="false"
              :value="getDictionaryValue('downstreamHeaderTransform')"
              @select="(val) => onDictionarySelect('downstreamHeaderTransform', val)"
              @deselect="(val) => onDictionaryUnSelect('downstreamHeaderTransform', val)"
            />
          </FormItem>
          <FormItem
            name="changeDownstreamPathTemplate"
            :label="t('ApiGateway.DisplayName:ChangeDownstreamPathTemplate')"
          >
            <Select
              mode="tags"
              :open="false"
              :value="getDictionaryValue('changeDownstreamPathTemplate')"
              @select="(val) => onDictionarySelect('changeDownstreamPathTemplate', val)"
              @deselect="(val) => onDictionaryUnSelect('changeDownstreamPathTemplate', val)"
            />
          </FormItem>
          <FormItem
            name="routeClaimsRequirement"
            :label="t('ApiGateway.DisplayName:RouteClaimsRequirement')"
          >
            <Select
              mode="tags"
              :open="false"
              :value="getDictionaryValue('routeClaimsRequirement')"
              @select="(val) => onDictionarySelect('routeClaimsRequirement', val)"
              @deselect="(val) => onDictionaryUnSelect('routeClaimsRequirement', val)"
            />
          </FormItem>
          <FormItem
            name="delegatingHandlers"
            :label="t('ApiGateway.DisplayName:DelegatingHandlers')"
          >
            <Select
              mode="tags"
              :open="false"
              :value="getDictionaryValue('delegatingHandlers')"
              @select="(val) => onDictionarySelect('delegatingHandlers', val)"
              @deselect="(val) => onDictionaryUnSelect('delegatingHandlers', val)"
            />
          </FormItem>
        </TabPane>
        <TabPane key="rateLimit" :tab="t('ApiGateway.RateLimit')" forceRender>
          <FormItem
            :name="['rateLimitOptions', 'limit']"
            :label="t('ApiGateway.DisplayName:limit')"
          >
            <InputNumber style="width: 100%" v-model:value="routeRef.rateLimitOptions.limit" />
          </FormItem>
          <FormItem
            :name="['rateLimitOptions', 'period']"
            :label="t('ApiGateway.DisplayName:Period')"
          >
            <Input v-model:value="routeRef.rateLimitOptions.period" />
          </FormItem>
          <FormItem
            :name="['rateLimitOptions', 'periodTimespan']"
            :label="t('ApiGateway.DisplayName:PeriodTimespan')"
          >
            <InputNumber
              style="width: 100%"
              v-model:value="routeRef.rateLimitOptions.periodTimespan"
            />
          </FormItem>
          <FormItem
            :name="['rateLimitOptions', 'clientWhitelist']"
            :label="t('ApiGateway.DisplayName:ClientWhitelist')"
          >
            <Select
              mode="tags"
              :open="false"
              :tokenSeparators="[',']"
              v-model:value="routeRef.rateLimitOptions.clientWhitelist"
            />
          </FormItem>
        </TabPane>
        <TabPane key="qos" :tab="t('ApiGateway.Qos')" forceRender>
          <FormItem
            :name="['qoSOptions', 'timeoutValue']"
            :label="t('ApiGateway.DisplayName:TimeoutValue')"
          >
            <InputNumber style="width: 100%" v-model:value="routeRef.qoSOptions.timeoutValue" />
          </FormItem>
          <FormItem
            :name="['qoSOptions', 'durationOfBreak']"
            :label="t('ApiGateway.DisplayName:DurationOfBreak')"
          >
            <InputNumber style="width: 100%" v-model:value="routeRef.qoSOptions.durationOfBreak" />
          </FormItem>
          <FormItem
            :name="['qoSOptions', 'exceptionsAllowedBeforeBreaking']"
            :label="t('ApiGateway.DisplayName:ExceptionsAllowedBeforeBreaking')"
          >
            <InputNumber
              style="width: 100%"
              v-model:value="routeRef.qoSOptions.exceptionsAllowedBeforeBreaking"
            />
          </FormItem>
        </TabPane>
        <TabPane key="loadBalancer" :tab="t('ApiGateway.LoadBalancer')" forceRender>
          <FormItem
            :name="['loadBalancerOptions', 'type']"
            :label="t('ApiGateway.DisplayName:LoadBalancerType')"
          >
            <Select v-model:value="routeRef.loadBalancerOptions.type" :options="balancerOptions" />
          </FormItem>
          <FormItem
            :name="['loadBalancerOptions', 'key']"
            :label="t('ApiGateway.DisplayName:PollingKey')"
          >
            <Input v-model:value="routeRef.loadBalancerOptions.key" />
          </FormItem>
          <FormItem
            :name="['loadBalancerOptions', 'expiry']"
            :label="t('ApiGateway.DisplayName:Expiry')"
          >
            <InputNumber style="width: 100%" v-model:value="routeRef.loadBalancerOptions.expiry" />
          </FormItem>
        </TabPane>
        <TabPane key="securityOptions" :tab="t('ApiGateway.SecurityOptions')" forceRender>
          <FormItem
            :name="['authenticationOptions', 'authenticationProviderKey']"
            :label="t('ApiGateway.DisplayName:AuthenticationProviderKey')"
          >
            <Input v-model:value="routeRef.authenticationOptions.authenticationProviderKey" />
          </FormItem>
          <FormItem
            :name="['authenticationOptions', 'allowedScopes']"
            :label="t('ApiGateway.DisplayName:AllowedScopes')"
          >
            <Select
              mode="tags"
              :open="false"
              :tokenSeparators="[',']"
              v-model:value="routeRef.authenticationOptions.allowedScopes"
            />
          </FormItem>
          <FormItem
            :name="['securityOptions', 'ipAllowedList']"
            :label="t('ApiGateway.DisplayName:IpAllowedList')"
          >
            <Select
              mode="tags"
              :open="false"
              :tokenSeparators="[',']"
              v-model:value="routeRef.securityOptions.ipAllowedList"
            />
          </FormItem>
          <FormItem
            :name="['securityOptions', 'ipBlockedList']"
            :label="t('ApiGateway.DisplayName:IpBlockedList')"
          >
            <Select
              mode="tags"
              :open="false"
              :tokenSeparators="[',']"
              v-model:value="routeRef.securityOptions.ipBlockedList"
            />
          </FormItem>
        </TabPane>
      </Tabs>
    </Form>
  </BasicModal>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { Checkbox, Form, Tabs, InputNumber, Select, RadioGroup } from 'ant-design-vue';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { Input } from '/@/components/Input';
  import { ApiSelect } from '/@/components/Form';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { useRouteModal } from '../hooks/useRouteModal';

  export default defineComponent({
    name: 'RouteModal',
    components: {
      ApiSelect,
      BasicModal,
      Checkbox,
      Form,
      FormItem: Form.Item,
      Tabs,
      TabPane: Tabs.TabPane,
      Input,
      InputNumber,
      Select,
      RadioGroup,
    },
    emits: ['change', 'register'],
    setup(_, { emit }) {
      const { t } = useI18n();
      const routeIdRef = ref('');
      const formElRef = ref(null);
      const activedTabRef = ref('info');

      const [registerModal, modalMethods] = useModalInner((args) => {
        activedTabRef.value = 'info';
        routeIdRef.value = args.reRouteId;
      });

      const {
        routeRef,
        formRules,
        formTitle,
        httpMethods,
        radioOptions,
        appIdOptions,
        balancerOptions,
        getHostAndPorts,
        onHostAndPortsChange,
        getDictionaryValue,
        onDictionarySelect,
        onDictionaryUnSelect,
        handleCancel,
        handleSubmit,
      } = useRouteModal({ emit, formElRef, routeIdRef, modalMethods });

      return {
        t,
        routeRef,
        formElRef,
        formRules,
        formTitle,
        httpMethods,
        radioOptions,
        appIdOptions,
        activedTabRef,
        balancerOptions,
        getHostAndPorts,
        onHostAndPortsChange,
        getDictionaryValue,
        onDictionarySelect,
        onDictionaryUnSelect,
        registerModal,
        handleCancel,
        handleSubmit,
      };
    },
  });
</script>
