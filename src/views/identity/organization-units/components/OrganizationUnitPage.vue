<template>
  <Row :gutter="16" style="margin-right: 12px; margin-left: 12px">
    <Col :span="10">
      <Card title="组织结构树">
        <template #extra>
          <a-button
            v-if="hasPermission('AbpIdentity.OrganizationUnits.Create')"
            type="primary"
            pre-icon="ant-design:plus-outlined"
            @click="handleAddNew"
          >
            {{ t('AbpIdentity.OrganizationUnit:AddRoot') }}
          </a-button>
        </template>
        <OrganizationUnitTree @select="handleSelect" />
      </Card>
    </Col>
    <Col :span="14">
      <Card>
        <Tabs v-model="activeKey">
          <TabPane key="members" tab="成员">
            <MemberTable :ou-id="ouIdRef" />
          </TabPane>
          <TabPane key="roles" tab="角色" :forceRender="true">
            <RoleTable :ou-id="ouIdRef" />
          </TabPane>
        </Tabs>
      </Card>
    </Col>
  </Row>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { Card, Row, Col, Tabs } from 'ant-design-vue';
  import { usePermission } from '/@/hooks/web/usePermission';
  import OrganizationUnitTree from './OrganizationUnitTree.vue';
  import MemberTable from './MemberTable.vue';
  import RoleTable from './RoleTable.vue';

  export default defineComponent({
    name: 'OrganizationUnitPage',
    components: {
      OrganizationUnitTree,
      Card,
      Col,
      MemberTable,
      Row,
      RoleTable,
      Tabs,
      TabPane: Tabs.TabPane,
    },
    setup() {
      const { t } = useI18n();
      const activeKey = ref('members');
      const ouIdRef = ref('');

      const { hasPermission } = usePermission();

      function handleSelect(key) {
        ouIdRef.value = key;
      }

      function handleAddNew() {
        console.log('handleAddNew');
      }

      return {
        t,
        activeKey,
        ouIdRef,
        handleSelect,
        handleAddNew,
        hasPermission,
      };
    },
  });
</script>
