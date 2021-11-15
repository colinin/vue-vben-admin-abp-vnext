import { useAbpStoreWithOut } from '/@/store/modules/abp';

type SettingValue = NameValue<string>;
/**
 * 设置接口
 */
interface ISettingProvider {
  /**
   * 查询 number 类型设定值
   * @param name 设置名称
   * @returns 返回类型为 number 的设定值, 默认0
   */
  getNumber(name: string): number;
  /**
   * 查询 boolean 类型设定值
   * @param name 设置名称
   */
  isTrue(name: string): boolean;
  /**
   * 获取设定值,如果为空返回空字符串
   * @param name 设置名称
   */
  getOrEmpty(name: string): string;
  /**
   * 获取设定值结合
   * @param names 过滤的设置名称
   */
  getAll(...names: string[]): SettingValue[];
}

const abpStore = useAbpStoreWithOut();
const { values: settings } = abpStore.getApplication.setting;

export function useSettings() {
  function get(name: string): SettingValue | null {
    if (settings[name]) {
      return {
        name: name,
        value: settings[name],
      };
    }
    return null;
  }

  function getAll(...names: string[]): SettingValue[] {
    let settingKeys = Object.keys(settings);
    if (names) {
      settingKeys = settingKeys.filter((key) => names.includes(key));
    }
    return settingKeys.map((key) => {
      return {
        name: key,
        value: settings[key],
      };
    });
  }

  function getOrDefault<T>(name: string, defaultValue: T): T | string {
    var setting = get(name);
    if (!setting) {
      return defaultValue;
    }
    return setting.value;
  }

  const settingProvider: ISettingProvider = {
    getOrEmpty(name: string) {
      return get(name)?.value ?? '';
    },
    getAll(...names: string[]) {
      return getAll(...names);
    },
    getNumber(name: string, defaultValue: number = 0) {
      var value = getOrDefault(name, defaultValue);
      const num = Number(value);
      return isNaN(num) ? defaultValue : num;
    },
    isTrue(name: string) {
      var setting = get(name);
      return setting?.value.toLowerCase() === 'true';
    },
  };

  return { settingProvider };
}
