<template>
  <Row :gutter="16" style="margin-right: 12px; margin-left: 12px">
    <Col :span="10">
      <OrganizationUnitTree @select="handleSelect" />
    </Col>
    <Col :span="14">
      <Card>
        <Tabs v-model="activeKey">
          <TabPane key="members" :tab="t('AbpIdentity.Users')">
            <MemberTable :ou-id="ouIdRef" />
          </TabPane>
          <TabPane key="roles" :tab="t('AbpIdentity.Roles')" :forceRender="true">
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

      function handleSelect(key) {
        ouIdRef.value = key;
      }

      return {
        t,
        activeKey,
        ouIdRef,
        handleSelect,
      };
    },
  });
</script>
