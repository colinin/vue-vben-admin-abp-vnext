import { useAbpStoreWithOut } from '/@/store/modules/abp';
import { format } from '/@/utils/strings';

interface IStringLocalizer {
  L(key: string, ...args: any[]): string;
}

export function useLocalization(resourceName: string) {
  const abpStore = useAbpStoreWithOut();
  const { localization } = abpStore.getApplication;

  function L(key: string, ...args: any[]) {
    if (!key) return '';
    if (!localization.values) return key;
    const resource = localization.values[resourceName];
    if (!resource || !resource[key]) return key;
    return format(resource[key], args);
  }

  const localizer: IStringLocalizer = {
    L: L,
  };

  return { L, localizer };
}
