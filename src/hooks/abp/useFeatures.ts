import { useAbpStoreWithOut } from '/@/store/modules/abp';

type FeatureValue = NameValue<string>;

/**
 * 特性检查接口
 */
interface IFeatureChecker {
  /**
   * 是否启用特性
   * @param name 特性名称
   */
  isEnabled(name: string): boolean;
  /**
   * 获取特性值
   * @param name 特性名称
   * @returns 返回设定的特性值,不存在则为空字符串
   */
  getOrEmpty(name: string): string;
}

const abpStore = useAbpStoreWithOut();
const { values: fetures } = abpStore.getApplication.features;

export function useFeatures() {
  function get(name: string): FeatureValue | null {
    if (fetures && fetures[name]) {
      return {
        name: name,
        value: fetures[name],
      };
    }
    return null;
  }

  const featureChecker: IFeatureChecker = {
    getOrEmpty(name: string) {
      return get(name)?.value ?? '';
    },
    isEnabled(name: string) {
      var setting = get(name);
      return setting?.value.toLowerCase() === 'true';
    },
  };

  return { featureChecker };
}
