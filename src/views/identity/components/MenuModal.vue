<template>
  <BasicModal
    @register="registerModal"
    @visible-change="handleVisibleChange"
    :width="660"
    :height="500"
    :title="t('AppPlatform.Menu:Manage')"
    :loading="loading"
    :show-ok-btn="!loading"
    :show-cancel-btn="!loading"
    @ok="handleSubmit"
  >
    <Card>
      <Form :labelCol="{ span: 4 }" :wrapperCol="{ span: 18 }" layout="horizontal">
        <FormItem :label="t('AppPlatform.DisplayName:UIFramework')">
          <Select v-model:value="frameworkRef" :options="optionsRef" @select="handleSelect" />
        </FormItem>
        <FormItem :label="t('AppPlatform.DisplayName:Menus')">
          <BasicTree
            :checkable="true"
            :check-strictly="true"
            :tree-data="menuTreeRef"
            :replace-fields="replaceFields"
            :checked-keys="defaultCheckedRef"
            @check="handleCheck"
          />
        </FormItem>
      </Form>
    </Card>
  </BasicModal>
</template>

<script lang="ts">
  import { defineComponent, ref, unref } from 'vue';
  import { Card, Form, Select } from 'ant-design-vue';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicTree } from '/@/components/Tree';
  import { getByName } from '/@/api/platform/dataDic';
  import { MenuListResult } from '/@/api/platform/model/menuModel';
  import { getAll } from '/@/api/platform/menu';
  import { listToTree } from '/@/utils/helper/treeHelper';
  export default defineComponent({
    name: 'MenuModal',
    components: {
      BasicModal,
      BasicTree,
      Card,
      Form,
      FormItem: Form.Item,
      Select,
    },
    props: {
      loading: {
        type: Boolean,
        default: false,
      },
      getMenuApi: {
        type: Function as PropType<(...args) => Promise<MenuListResult>>,
        required: true,
        default: new Promise<MenuListResult>((resolve) => {
          return resolve({
            items: [],
          });
        }),
      },
    },
    emits: ['change', 'register'],
    setup(props, { emit }) {
      const { t } = useI18n();
      const identityRef = ref('');
      const frameworkRef = ref('');
      const menuTreeRef = ref<any[]>([]);
      const defaultCheckedRef = ref<any[]>([]);
      const checkedRef = ref<string[]>([]);
      const replaceFields = {
        key: 'id',
        title: 'displayName',
        children: 'children',
      };
      const optionsRef = ref<
        {
          key: string;
          label: string;
          value: string;
        }[]
      >([]);
      const [registerModal] = useModalInner((record) => {
        identityRef.value = record.identity;
        optionsRef.value = [];
        frameworkRef.value = '';
        checkedRef.value = [];
        defaultCheckedRef.value = [];
        menuTreeRef.value = [];
      });

      function handleSelect(value) {
        getAll({
          filter: '',
          sorting: '',
          framework: value,
        }).then((res) => {
          menuTreeRef.value = listToTree(res.items, { id: 'id', pid: 'parentId' });
        });
        props.getMenuApi(unref(identityRef), value).then((res) => {
          defaultCheckedRef.value = res.items.map((item) => item.id);
        });
      }

      function handleVisibleChange(visible) {
        if (visible) {
          getByName('UI Framework').then((res) => {
            optionsRef.value = res.items.map((item) => {
              return {
                key: item.id,
                label: item.displayName,
                value: item.name,
              };
            });
          });
        }
      }

      function handleCheck(checkedKeys) {
        checkedRef.value = checkedKeys.checked;
      }

      function handleSubmit() {
        emit('change', unref(identityRef), unref(checkedRef));
      }

      return {
        t,
        menuTreeRef,
        defaultCheckedRef,
        replaceFields,
        frameworkRef,
        optionsRef,
        registerModal,
        handleSelect,
        handleVisibleChange,
        handleCheck,
        handleSubmit,
      };
    },
  });
</script>
