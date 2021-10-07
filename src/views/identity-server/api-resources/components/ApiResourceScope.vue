<template>
  <Transfer
    :dataSource="supportedScopes"
    :targetKeys="targetScopes"
    :titles="[t('AbpIdentityServer.Assigned'), t('AbpIdentityServer.Available')]"
    :render="(item) => item.title"
    :list-style="{
      width: '293px',
      height: '338px',
    }"
    @change="handleChange"
  />
</template>

<script lang="ts">
  import { defineComponent, onMounted, ref } from 'vue';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { Transfer } from 'ant-design-vue';
  import { discovery } from '/@/api/identity-server/identityServer';

  export default defineComponent({
    name: 'ApiResourceScope',
    components: { Transfer },
    props: {
      targetScopes: { type: Object as PropType<string[]>, required: true },
    },
    emits: ['change'],
    setup(_, { emit }) {
      const { t } = useI18n();
      const supportedScopes = ref<
        {
          key: string;
          title: string;
        }[]
      >([]);

      onMounted(() => {
        discovery().then((res) => {
          supportedScopes.value = res.scopes_supported.map((scope) => {
            return {
              key: scope,
              title: scope,
            };
          });
        });
      });

      function handleChange(targetKeys, direction, moveKeys) {
        emit('change', targetKeys, direction, moveKeys);
      }

      return {
        t,
        supportedScopes,
        handleChange,
      };
    },
  });
</script>
