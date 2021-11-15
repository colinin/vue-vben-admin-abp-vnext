import { computed } from 'vue';
import { useAbpStoreWithOut } from '/@/store/modules/abp';
import { format } from '/@/utils/strings';

interface IStringLocalizer {
  L(key: string, ...args: any[]): string;
}

export function useLocalization(resourceName: string) {
  const localization = computed(() => {
    const abpStore = useAbpStoreWithOut();
    return abpStore.getApplication.localization;
  });

  function L(key: string, ...args: any[]) {
    if (!key) return '';
    if (!localization.value.values) return key;
    const resource = localization.value.values[resourceName];
    if (!resource || !resource[key]) return key;
    return format(resource[key], args ?? []);
  }

  const localizer: IStringLocalizer = {
    L: L,
  };

  return { L, localizer };
}
