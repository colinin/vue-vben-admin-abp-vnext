<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    :title="t('AbpFeatureManagement.ManageFeatures')"
    :width="800"
    :height="400"
    :min-height="400"
    @ok="handleSubmit"
    @cancel="onGroupChange(0)"
  >
    <Form ref="formRel" :model="featureGroup" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
      <Tabs tabPosition="left" v-model:activeKey="featureGroupKey" @change="onGroupChange">
        <TabPane v-for="(group, gi) in featureGroup.groups" :key="gi" :tab="group.displayName">
          <div v-for="(feature, fi) in group.features" :key="feature.name">
            <FormItem
              v-if="feature.valueType !== null"
              :label="feature.displayName"
              :name="['groups', gi, 'features', fi, 'value']"
              :rules="validator(feature.valueType.validator)"
              :help="feature.description"
            >
              <Checkbox
                v-if="feature.valueType.name === 'ToggleStringValueType'"
                v-model:checked="feature.value"
              />
              <div v-else-if="feature.valueType.name === 'FreeTextStringValueType'">
                <InputNumber
                  v-if="feature.valueType.validator.name === 'NUMERIC'"
                  v-model:value="feature.value"
                />
                <Input v-else v-model:value="feature.value" />
              </div>
              <Select
                v-else-if="feature.valueType.name === 'SelectionStringValueType'"
                v-model="feature.value"
              >
                <Option
                  v-for="valueItem in feature.valueType.itemSource.items"
                  :key="valueItem.value"
                  v-model:value="valueItem.value"
                  :label="t(valueItem.displayText.resourceName + '.' + valueItem.displayText.name)"
                />
              </Select>
            </FormItem>
          </div>
        </TabPane>
      </Tabs>
    </Form>
  </BasicModal>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { Checkbox, Form, Input, InputNumber, Select, Tabs } from 'ant-design-vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { useFeature } from '../hooks/useFeature';
  export default defineComponent({
    components: {
      BasicModal,
      Checkbox,
      Form,
      FormItem: Form.Item,
      Input,
      InputNumber,
      Select,
      Option: Select.Option,
      Tabs,
      TabPane: Tabs.TabPane,
    },
    setup() {
      const { t } = useI18n();
      const formRel = ref(null);
      const providerName = ref('');
      const providerKey = ref(null);
      const [registerModal, modalMethods] = useModalInner((data) => {
        providerName.value = data.providerName;
        providerKey.value = data.providerKey;
      });
      const { featureGroup, featureGroupKey, validator, handleSubmit, onGroupChange } = useFeature({
        providerName,
        providerKey,
        formRel,
        modalMethods,
      });

      return {
        t,
        formRel,
        registerModal,
        featureGroup,
        featureGroupKey,
        validator,
        handleSubmit,
        onGroupChange,
      };
    },
  });
</script>

<style lang="less" scoped>
  .ant-input-number {
    width: 100%;
  }
</style>
