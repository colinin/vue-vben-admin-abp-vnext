<template>
  <Transfer
    :dataSource="resources"
    :targetKeys="targetResources"
    :titles="[t('AbpIdentityServer.Assigned'), t('AbpIdentityServer.Available')]"
    :render="(item) => item.title"
    :list-style="{
      width: '465px',
      height: '438px',
    }"
    @change="handleChange"
  />
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { Transfer } from 'ant-design-vue';

  export default defineComponent({
    name: 'Resources',
    components: { Transfer },
    props: {
      resources: {
        type: [Array] as PropType<{ key: string; title: string }[]>,
        required: true,
        default: () => [],
      },
      targetResources: { type: [Array] as PropType<string[]>, required: true, default: () => [] },
    },
    emits: ['change'],
    setup(_, { emit }) {
      const { t } = useI18n();

      function handleChange(targetKeys, direction, moveKeys) {
        emit('change', targetKeys, direction, moveKeys);
      }

      return {
        t,
        handleChange,
      };
    },
  });
</script>
