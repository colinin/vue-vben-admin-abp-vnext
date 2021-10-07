<template>
  <Transfer
    :dataSource="userClaims"
    :targetKeys="targetClaims"
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
  import { getActivedList } from '/@/api/identity/claim';

  export default defineComponent({
    name: 'UserClaim',
    components: { Transfer },
    props: {
      targetClaims: { type: [Array] as PropType<string[]>, required: true, default: () => [] },
    },
    emits: ['change'],
    setup(_, { emit }) {
      const { t } = useI18n();
      const userClaims = ref<
        {
          key: string;
          title: string;
        }[]
      >([]);

      onMounted(() => {
        getActivedList().then((res) => {
          userClaims.value = res.items.map((item) => {
            return {
              key: item.name,
              title: item.name,
            };
          });
        });
      });

      function handleChange(targetKeys, direction, moveKeys) {
        emit('change', targetKeys, direction, moveKeys);
      }

      return {
        t,
        userClaims,
        handleChange,
      };
    },
  });
</script>
