<template>
  <Form :label-col="{ span: 5 }" :wrapper-col="{ span: 15 }">
    <Row type="flex">
      <Col :span="24">
        <Tabs v-model:activeKey="activeTabKey">
          <TabPane
            v-for="(group, tabIndex) in settingGroups"
            :key="tabIndex"
            :tab="group.displayName"
          >
            <Collapse :defaultActiveKey="expandedCollapseKeys(group)">
              <CollapsePanel
                v-for="setting in group.settings"
                :key="setting.displayName"
                :header="setting.displayName"
              >
                <FormItem
                  v-for="detail in setting.details"
                  :key="detail.name"
                  :label="detail.displayName"
                >
                  <!-- <Input type="text" v-model="detail.value" /> -->
                  <Password
                    v-if="detail.valueType === 0 && detail.isEncrypted"
                    v-model:value="detail.value"
                    :placeholder="detail.description"
                    @input="handleValueChange(detail)"
                  />
                  <BInput
                    v-if="detail.valueType === 0 && !detail.isEncrypted"
                    v-model:value="detail.value"
                    :placeholder="detail.description"
                    type="text"
                    @input="handleValueChange(detail)"
                  />
                  <BInput
                    v-if="detail.valueType === 1"
                    v-model:value="detail.value"
                    :placeholder="detail.description"
                    type="number"
                    @input="handleValueChange(detail)"
                  />
                  <Select
                    v-if="detail.valueType === 5"
                    v-model:value="detail.value"
                    @change="handleValueChange(detail)"
                  >
                    <SelectOption
                      v-for="option in detail.options"
                      :key="option.value"
                      :disabled="option.value === detail.value"
                    >
                      {{ option.name }}
                    </SelectOption>
                  </Select>
                  <Checkbox
                    v-if="detail.valueType === 2"
                    :checked="detail.value === 'true'"
                    @change="handleCheckChange(detail)"
                  >
                    {{ detail.displayName }}
                  </Checkbox>
                </FormItem>
              </CollapsePanel>
            </Collapse>
          </TabPane>
        </Tabs>
      </Col>
    </Row>
    <Row type="flex">
      <Col :span="12" :offset="12">
        <FormItem>
          <a-button
            v-if="updateSetting.settings.length > 0"
            type="primary"
            style="width: 150px"
            postIcon="ant-design:setting-outlined"
            :loading="hasChangeSetting"
            @click="handleSubmit"
          >
            {{ sumbitButtonTitle() }}
          </a-button>
        </FormItem>
      </Col>
    </Row>
  </Form>
</template>

<script lang="ts">
  import { defineComponent, ref, toRaw } from 'vue';
  import { useLocalization } from '/@/hooks/abp/useLocalization';
  import { Checkbox, Tabs, Collapse, Form, Input, Select, Row, Col } from 'ant-design-vue';
  import { Input as BInput } from '/@/components/Input';

  import { SettingGroup, SettingsUpdate } from '/@/api/settings/model/settingModel';

  const props = {
    hasChangeSetting: { type: Boolean },
    settingGroups: { type: Array as PropType<Array<SettingGroup>> },
    tabPosition: { type: String },
  } as const; // 对于存在必输项的props see: https://blog.csdn.net/q535999731/article/details/109578885

  export default defineComponent({
    components: {
      Checkbox,
      Collapse: Collapse,
      CollapsePanel: Collapse.Panel,
      Form: Form,
      FormItem: Form.Item,
      BInput,
      Select,
      SelectOption: Select.Option,
      Tabs: Tabs,
      TabPane: Tabs.TabPane,
      Password: Input.Password,
      Row,
      Col,
    },
    props,
    emits: ['change'],
    setup() {
      const { L } = useLocalization('AbpSettingManagement');
      const activeTabKey = ref(0);
      const updateSetting = ref(new SettingsUpdate());

      return {
        L,
        activeTabKey,
        updateSetting,
      };
    },
    computed: {
      sumbitButtonTitle() {
        return () => {
          if (this.hasChangeSetting) {
            return this.L('Save');
          }
          return this.L('Save');
        };
      },
      expandedCollapseKeys() {
        return (group) => {
          const keys = group.settings.map((s) => {
            return s.displayName;
          });
          return keys;
        };
      },
    },
    methods: {
      handleCheckChange(setting) {
        if (setting.value === 'true') {
          setting.value = 'false';
        } else {
          setting.value = 'true';
        }
        this.handleValueChange(setting);
      },
      handleValueChange(setting) {
        const index = this.updateSetting.settings.findIndex((s) => s.name === setting.name);
        if (index >= 0) {
          this.updateSetting.settings[index].value = setting.value;
        } else {
          this.updateSetting.settings.push({
            name: setting.name,
            value: setting.value,
          });
        }
      },
      handleSubmit() {
        this.$emit('change', toRaw(this.updateSetting));
      },
    },
  });
</script>
