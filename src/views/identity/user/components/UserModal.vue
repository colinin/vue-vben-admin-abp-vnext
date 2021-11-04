<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    :title="userTitle"
    @ok="handleOk"
    :width="800"
    :min-height="400"
  >
    <Form
      ref="formElRef"
      :model="userRef"
      :rules="formRules"
      :label-col="{ span: 6 }"
      :wrapper-col="{ span: 18 }"
    >
      <Tabs v-model:activeKey="activedTab">
        <TabPane key="info" :tab="t('AbpIdentity.UserInformations')">
          <FormItem name="userName" :label="t('AbpIdentity.UserName')">
            <BInput v-model:value="userRef.userName" />
          </FormItem>
          <FormItem v-if="!userRef.id" name="password" :label="t('AbpIdentity.Password')">
            <InputPassword v-model:value="userRef.password" />
          </FormItem>
          <FormItem name="surname" :label="t('AbpIdentity.DisplayName:Surname')">
            <BInput v-model:value="userRef.surname" />
          </FormItem>
          <FormItem name="name" :label="t('AbpIdentity.DisplayName:Name')">
            <BInput v-model:value="userRef.name" />
          </FormItem>
          <FormItem name="email" :label="t('AbpIdentity.DisplayName:Email')">
            <BInput v-model:value="userRef.email" />
          </FormItem>
          <FormItem name="phoneNumber" :label="t('AbpIdentity.DisplayName:PhoneNumber')">
            <BInput v-model:value="userRef.phoneNumber" />
          </FormItem>
          <FormItem :label="t('AbpIdentity.LockoutEnabled')">
            <Checkbox v-model:checked="userRef.lockoutEnabled">{{
              t('AbpIdentity.LockoutEnabled')
            }}</Checkbox>
          </FormItem>
        </TabPane>
        <TabPane key="role" :tab="t('AbpIdentity.Roles')">
          <Transfer
            class="tree-transfer"
            :dataSource="roleDataSource"
            :targetKeys="userRef.roleNames"
            :titles="[t('AbpIdentityServer.Assigned'), t('AbpIdentityServer.Available')]"
            :render="(item) => item.title"
            :list-style="{
              width: '47%',
              height: '338px',
            }"
            @change="handleRoleChange"
          />
        </TabPane>
      </Tabs>
    </Form>
  </BasicModal>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { message, Checkbox, Input, Form, Tabs, Transfer } from 'ant-design-vue';
  import { Input as BInput } from '/@/components/Input';
  import { FormActionType } from '/@/components/Form';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { useUserForm } from '../hooks/useUserForm';

  export default defineComponent({
    name: 'UserModal',
    components: {
      BasicModal,
      Checkbox,
      Form,
      FormItem: Form.Item,
      Tabs,
      TabPane: Tabs.TabPane,
      BInput,
      InputPassword: Input.Password,
      Transfer,
    },
    emits: ['register', 'change'],
    setup(_, { emit }) {
      const { t } = useI18n();
      const activedTab = ref('info');
      const userRef = ref<Recordable>({});
      const formElRef = ref<Nullable<FormActionType>>(null);
      const { handleSubmit, getUser, userTitle, formRules, roleDataSource, handleRoleChange } =
        useUserForm({
          userRef,
          formElRef,
        });
      const [registerModal, { closeModal, changeOkLoading }] = useModalInner(async (val) => {
        activedTab.value = 'info';
        getUser(val.id);
      });

      function handleOk() {
        changeOkLoading(true);
        handleSubmit()
          .then((res) => {
            message.success(t('AbpUi.Successful'));
            closeModal();
            emit('change', res);
          })
          .finally(() => {
            changeOkLoading(false);
          });
      }

      return {
        t,
        activedTab,
        userRef,
        formElRef,
        formRules,
        roleDataSource,
        handleRoleChange,
        userTitle,
        handleOk,
        registerModal,
        closeModal,
      };
    },
  });
</script>

<style scoped>
  .tree-transfer .ant-transfer-list:first-child {
    width: 100%;
    height: 400px;
    flex: none;
    justify-content: center;
    align-items: center;
  }
</style>
