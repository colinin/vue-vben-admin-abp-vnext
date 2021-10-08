<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    :title="formTitle"
    :width="1000"
    :min-height="500"
    :mask-closable="false"
    @ok="handleOk"
    @visible-change="handleVisibleModal"
  >
    <Form
      ref="formElRef"
      :model="modelRef"
      :rules="formRules"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <Tabs v-model:activeKey="tabActivedKey" @change="handleChangeTab">
        <!-- 基本信息 -->
        <TabPane key="basic" :tab="t('AbpIdentityServer.Basics')">
          <FormItem name="enabled" :label="t('AbpIdentityServer.Enabled')">
            <Checkbox v-model:checked="modelRef.enabled">{{
              t('AbpIdentityServer.Enabled')
            }}</Checkbox>
          </FormItem>
          <FormItem
            name="requireRequestObject"
            :label="t('AbpIdentityServer.Client:RequireRequestObject')"
          >
            <Checkbox v-model:checked="modelRef.requireRequestObject">{{
              t('AbpIdentityServer.Client:RequireRequestObject')
            }}</Checkbox>
          </FormItem>
          <FormItem name="clientId" required :label="t('AbpIdentityServer.Client:Id')">
            <Input v-model:value="modelRef.clientId" :disabled="isEdit" />
          </FormItem>
          <FormItem name="clientName" required :label="t('AbpIdentityServer.Name')">
            <Input v-model:value="modelRef.clientName" />
          </FormItem>
          <FormItem name="description" :label="t('AbpIdentityServer.Description')">
            <TextArea v-model:value="modelRef.description" />
          </FormItem>
          <FormItem name="protocolType" :label="t('AbpIdentityServer.Client:ProtocolType')">
            <Select v-model:value="modelRef.protocolType">
              <Option value="oidc">OpenID Connect</Option>
            </Select>
          </FormItem>
          <FormItem
            name="allowedIdentityTokenSigningAlgorithms"
            :label="t('AbpIdentityServer.Client:AllowedIdentityTokenSigningAlgorithms')"
          >
            <Input v-model:value="modelRef.allowedIdentityTokenSigningAlgorithms" />
          </FormItem>
          <FormItem name="requirePkce" :label="t('AbpIdentityServer.Client:RequiredPkce')">
            <Checkbox v-model:checked="modelRef.requirePkce">{{
              t('AbpIdentityServer.Client:RequiredPkce')
            }}</Checkbox>
          </FormItem>
          <FormItem
            name="allowPlainTextPkce"
            :label="t('AbpIdentityServer.Client:AllowedPlainTextPkce')"
          >
            <Checkbox v-model:checked="modelRef.allowPlainTextPkce">{{
              t('AbpIdentityServer.Client:AllowedPlainTextPkce')
            }}</Checkbox>
          </FormItem>
        </TabPane>

        <!-- Urls -->
        <TabPane key="urls">
          <template #tab>
            <Dropdown>
              <span
                >{{ t('AbpIdentityServer.Client:ApplicationUrls') }}
                <DownOutlined />
              </span>
              <template #overlay>
                <Menu @click="handleClickUrlsMenu">
                  <MenuItem key="client-callback">{{
                    t('AbpIdentityServer.Client:CallbackUrl')
                  }}</MenuItem>
                  <MenuItem key="client-cors-origins">{{
                    t('AbpIdentityServer.Client:AllowedCorsOrigins')
                  }}</MenuItem>
                  <MenuItem key="client-logout-redirect-uris">{{
                    t('AbpIdentityServer.Client:PostLogoutRedirectUri')
                  }}</MenuItem>
                </Menu>
              </template>
            </Dropdown>
          </template>
          <component :is="urlsComponent" :modelRef="modelRef" />
        </TabPane>

        <!-- 资源 -->
        <TabPane key="resources">
          <template #tab>
            <Dropdown>
              <span
                >{{ t('AbpIdentityServer.Client:Resources') }}
                <DownOutlined />
              </span>
              <template #overlay>
                <Menu @click="handleClickResourcesMenu">
                  <MenuItem key="client-api-resource">{{
                    t('AbpIdentityServer.Resource:Api')
                  }}</MenuItem>
                  <MenuItem key="client-identity-resource">{{
                    t('AbpIdentityServer.Resource:Identity')
                  }}</MenuItem>
                </Menu>
              </template>
            </Dropdown>
          </template>
          <component :is="resourcesComponent" :modelRef="modelRef" />
        </TabPane>

        <!-- 认证/注销 -->
        <TabPane key="authentication" :tab="t('AbpIdentityServer.Authentication')">
          <FormItem
            name="frontChannelLogoutSessionRequired"
            :label="t('AbpIdentityServer.Client:FrontChannelLogoutSessionRequired')"
          >
            <Checkbox v-model:checked="modelRef.frontChannelLogoutSessionRequired">{{
              t('AbpIdentityServer.Client:FrontChannelLogoutSessionRequired')
            }}</Checkbox>
          </FormItem>
          <!-- :required="modelRef.frontChannelLogoutSessionRequired" -->
          <FormItem
            name="frontChannelLogoutUri"
            :label="t('AbpIdentityServer.Client:FrontChannelLogoutUri')"
          >
            <Input v-model:value="modelRef.frontChannelLogoutUri" />
          </FormItem>
          <FormItem
            name="enabled"
            :label="t('AbpIdentityServer.Client:BackChannelLogoutSessionRequired')"
          >
            <Checkbox v-model:checked="modelRef.backChannelLogoutSessionRequired">{{
              t('AbpIdentityServer.Client:BackChannelLogoutSessionRequired')
            }}</Checkbox>
          </FormItem>
          <!-- :required="modelRef.backChannelLogoutSessionRequired" -->
          <FormItem
            name="backChannelLogoutUri"
            :label="t('AbpIdentityServer.Client:BackChannelLogoutUri')"
          >
            <Input v-model:value="modelRef.backChannelLogoutUri" />
          </FormItem>
        </TabPane>

        <!-- 令牌 -->
        <TabPane key="token" :tab="t('AbpIdentityServer.Token')">
          <FormItem
            name="identityTokenLifetime"
            :label="t('AbpIdentityServer.Client:IdentityTokenLifetime')"
          >
            <InputNumber class="input-number" v-model:value="modelRef.identityTokenLifetime" />
          </FormItem>
          <FormItem
            name="accessTokenLifetime"
            :label="t('AbpIdentityServer.Client:AccessTokenLifetime')"
          >
            <InputNumber class="input-number" v-model:value="modelRef.accessTokenLifetime" />
          </FormItem>
          <FormItem name="accessTokenType" :label="t('AbpIdentityServer.Client:AccessTokenType')">
            <Select v-model:value="modelRef.accessTokenType">
              <Option :value="0">Jwt</Option>
              <Option :value="1">Reference</Option>
            </Select>
          </FormItem>
          <FormItem
            name="authorizationCodeLifetime"
            :label="t('AbpIdentityServer.Client:AuthorizationCodeLifetime')"
          >
            <InputNumber class="input-number" v-model:value="modelRef.authorizationCodeLifetime" />
          </FormItem>
          <FormItem
            name="absoluteRefreshTokenLifetime"
            :label="t('AbpIdentityServer.Client:AbsoluteRefreshTokenLifetime')"
          >
            <InputNumber
              class="input-number"
              v-model:value="modelRef.absoluteRefreshTokenLifetime"
            />
          </FormItem>
          <FormItem
            name="slidingRefreshTokenLifetime"
            :label="t('AbpIdentityServer.Client:SlidingRefreshTokenLifetime')"
          >
            <InputNumber
              class="input-number"
              v-model:value="modelRef.slidingRefreshTokenLifetime"
            />
          </FormItem>
          <FormItem
            name="refreshTokenUsage"
            :label="t('AbpIdentityServer.Client:RefreshTokenUsage')"
          >
            <Select v-model:value="modelRef.refreshTokenUsage">
              <Option :value="0">ReUse</Option>
              <Option :value="1">OneTimeOnly</Option>
            </Select>
          </FormItem>
          <FormItem
            name="refreshTokenExpiration"
            :label="t('AbpIdentityServer.Client:RefreshTokenExpiration')"
          >
            <Select v-model:value="modelRef.refreshTokenExpiration">
              <Option :value="0">Sliding</Option>
              <Option :value="1">Absolute</Option>
            </Select>
          </FormItem>
          <FormItem name="userSsoLifetime" :label="t('AbpIdentityServer.Client:UserSsoLifetime')">
            <InputNumber class="input-number" v-model:value="modelRef.userSsoLifetime" />
          </FormItem>
          <FormItem
            name="allowOfflineAccess"
            :label="t('AbpIdentityServer.Client:AllowedOfflineAccess')"
          >
            <Checkbox v-model:checked="modelRef.allowOfflineAccess">{{
              t('AbpIdentityServer.Client:AllowedOfflineAccess')
            }}</Checkbox>
          </FormItem>
          <FormItem
            name="allowAccessTokensViaBrowser"
            :label="t('AbpIdentityServer.Client:AllowedAccessTokensViaBrowser')"
          >
            <Checkbox v-model:checked="modelRef.allowAccessTokensViaBrowser">{{
              t('AbpIdentityServer.Client:AllowedAccessTokensViaBrowser')
            }}</Checkbox>
          </FormItem>
          <FormItem
            name="updateAccessTokenClaimsOnRefresh"
            :label="t('AbpIdentityServer.Client:UpdateAccessTokenClaimsOnRefresh')"
          >
            <Checkbox v-model:checked="modelRef.updateAccessTokenClaimsOnRefresh">{{
              t('AbpIdentityServer.Client:UpdateAccessTokenClaimsOnRefresh')
            }}</Checkbox>
          </FormItem>
          <FormItem name="includeJwtId" :label="t('AbpIdentityServer.Client:IncludeJwtId')">
            <Checkbox v-model:checked="modelRef.includeJwtId">{{
              t('AbpIdentityServer.Client:IncludeJwtId')
            }}</Checkbox>
          </FormItem>
          <FormItem
            name="clientClaimsPrefix"
            :label="t('AbpIdentityServer.Client:ClientClaimsPrefix')"
          >
            <Input v-model:value="modelRef.clientClaimsPrefix" />
          </FormItem>
          <FormItem
            name="pairWiseSubjectSalt"
            :label="t('AbpIdentityServer.Client:PairWiseSubjectSalt')"
          >
            <Input v-model:value="modelRef.pairWiseSubjectSalt" />
          </FormItem>
        </TabPane>

        <!-- 同意屏幕 -->
        <TabPane key="consent" :tab="t('AbpIdentityServer.Consent')">
          <FormItem name="requireConsent" :label="t('AbpIdentityServer.Client:RequireConsent')">
            <Checkbox v-model:checked="modelRef.requireConsent">{{
              t('AbpIdentityServer.Client:RequireConsent')
            }}</Checkbox>
          </FormItem>
          <FormItem
            name="allowRememberConsent"
            :label="t('AbpIdentityServer.Client:AllowRememberConsent')"
          >
            <Checkbox v-model:checked="modelRef.allowRememberConsent">{{
              t('AbpIdentityServer.Client:AllowRememberConsent')
            }}</Checkbox>
          </FormItem>
          <FormItem name="clientUri" :label="t('AbpIdentityServer.Client:ClientUri')">
            <Input v-model:value="modelRef.clientUri" />
          </FormItem>
          <FormItem name="logoUri" :label="t('AbpIdentityServer.Client:LogoUri')">
            <Input v-model:value="modelRef.logoUri" />
          </FormItem>
        </TabPane>

        <!-- 设备流程 -->
        <TabPane key="deviceFlow" :tab="t('AbpIdentityServer.DeviceFlow')">
          <FormItem name="userCodeType" :label="t('AbpIdentityServer.Client:UserCodeType')">
            <Input v-model:value="modelRef.userCodeType" />
          </FormItem>
          <FormItem
            name="deviceCodeLifetime"
            :label="t('AbpIdentityServer.Client:DeviceCodeLifetime')"
          >
            <InputNumber class="input-number" v-model:value="modelRef.deviceCodeLifetime" />
          </FormItem>
        </TabPane>

        <!-- 高级 -->
        <TabPane key="advanced">
          <template #tab>
            <Dropdown>
              <span
                >{{ t('AbpIdentityServer.Advanced') }}
                <DownOutlined />
              </span>
              <template #overlay>
                <Menu @click="handleClickAdvancedMenu">
                  <MenuItem key="client-secret">{{ t('AbpIdentityServer.Secret') }}</MenuItem>
                  <MenuItem key="client-claim">{{ t('AbpIdentityServer.Claims') }}</MenuItem>
                  <MenuItem key="client-properties">{{
                    t('AbpIdentityServer.Propertites')
                  }}</MenuItem>
                  <MenuItem key="client-grant-type">{{
                    t('AbpIdentityServer.Client:AllowedGrantTypes')
                  }}</MenuItem>
                  <MenuItem key="client-identity-provider">{{
                    t('AbpIdentityServer.Client:IdentityProviderRestrictions')
                  }}</MenuItem>
                </Menu>
              </template>
            </Dropdown>
          </template>
          <component :is="advancedComponent" :modelRef="modelRef" />
        </TabPane>
      </Tabs>
    </Form>
  </BasicModal>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { DownOutlined } from '@ant-design/icons-vue';
  import { Checkbox, Dropdown, Menu, Tabs, Form, Input, InputNumber, Select } from 'ant-design-vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { useModal } from '../hooks/useModal';
  import ClientCallback from './ClientCallback.vue';
  import ClientCorsOrigins from './ClientCorsOrigins.vue';
  import ClientLogoutRedirectUris from './ClientLogoutRedirectUris.vue';
  import ClientApiResource from './ClientApiResource.vue';
  import ClientIdentityResource from './ClientIdentityResource.vue';
  import ClientSecret from './ClientSecret.vue';
  import ClientClaim from './ClientClaim.vue';
  import ClientProperties from './ClientProperties.vue';
  import ClientGrantType from './ClientGrantType.vue';
  import ClientIdentityProvider from './ClientIdentityProvider.vue';
  export default defineComponent({
    name: 'ClientModal',
    components: {
      ClientCallback,
      ClientCorsOrigins,
      ClientLogoutRedirectUris,
      ClientApiResource,
      ClientIdentityResource,
      ClientSecret,
      ClientClaim,
      ClientProperties,
      ClientGrantType,
      ClientIdentityProvider,
      BasicModal,
      DownOutlined,
      Form,
      FormItem: Form.Item,
      Dropdown,
      Menu,
      MenuItem: Menu.Item,
      Tabs,
      TabPane: Tabs.TabPane,
      Input,
      InputNumber,
      TextArea: Input.TextArea,
      Checkbox,
      Select,
      Option: Select.Option,
    },
    emits: ['change', 'register'],
    setup(_, { emit }) {
      const { t } = useI18n();
      const formElRef = ref<any>(null);
      const modelIdRef = ref('');
      const tabActivedKey = ref('basic');
      const advancedComponent = ref('client-secret');
      const urlsComponent = ref('client-callback');
      const resourcesComponent = ref('client-api-resource');
      const [registerModal, { changeOkLoading }] = useModalInner((val) => {
        modelIdRef.value = val.id;
      });
      const {
        isEdit,
        modelRef,
        formRules,
        formTitle,
        handleChangeTab,
        handleVisibleModal,
        handleSubmit,
      } = useModal({
        modelIdRef,
        formElRef,
        tabActivedKey,
      });

      function handleClickAdvancedMenu(e) {
        tabActivedKey.value = 'advanced';
        advancedComponent.value = e.key;
      }

      function handleClickUrlsMenu(e) {
        tabActivedKey.value = 'urls';
        urlsComponent.value = e.key;
      }

      function handleClickResourcesMenu(e) {
        tabActivedKey.value = 'resources';
        resourcesComponent.value = e.key;
      }

      function handleOk() {
        changeOkLoading(true);
        handleSubmit()
          .then(() => {
            emit('change');
          })
          .finally(() => {
            changeOkLoading(false);
          });
      }

      return {
        t,
        isEdit,
        formElRef,
        formRules,
        formTitle,
        tabActivedKey,
        registerModal,
        modelRef,
        labelCol: { span: 6 },
        wrapperCol: { span: 18 },
        advancedComponent,
        urlsComponent,
        resourcesComponent,
        handleClickUrlsMenu,
        handleClickResourcesMenu,
        handleClickAdvancedMenu,
        handleChangeTab,
        handleVisibleModal,
        handleOk,
      };
    },
  });
</script>

<style lang="less" scoped>
  .input-number {
    width: 100%;
  }
</style>
