<template>
  <BasicTree
    ref="treeElRef"
    :draggable="true"
    :click-row-to-expand="false"
    :tree-data="organizationUnitTree"
    :replace-fields="{
      title: 'displayName',
      key: 'id',
    }"
    :before-right-click="getContentMenus"
    defaultExpandLevel="1"
    @select="handleSelect"
    @drop="handleDrop"
  />
  <BasicModalForm
    @register="registerModal"
    :form-items="formSchemas"
    title="组织机构"
    :save-changes="handleSubmit"
  />
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { BasicTree } from '/@/components/Tree';
  import { BasicModalForm } from '/@/components/ModalForm';
  import { useOuTree } from '../hooks/useOuTree';

  export default defineComponent({
    name: 'OrganizationUnitTree',
    components: { BasicModalForm, BasicTree },
    emits: ['change', 'select'],
    setup(_props, { emit }) {
      const { t } = useI18n();
      const {
        formSchemas,
        registerModal,
        organizationUnitTree,
        getContentMenus,
        handleDrop,
        handleSelect,
        handleSubmit,
      } = useOuTree({ emit });

      return {
        t,
        formSchemas,
        registerModal,
        organizationUnitTree,
        getContentMenus,
        handleDrop,
        handleSelect,
        handleSubmit,
      };
    },
  });
</script>
