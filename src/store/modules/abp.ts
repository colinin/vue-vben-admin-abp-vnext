import { defineStore } from 'pinia';
import { store } from '/@/store';

import { ABP_APP_KEY, ABP_API_KEY } from '/@/enums/cacheEnum';
import { createLocalStorage } from '/@/utils/cache';

import { i18n } from '/@/locales/setupI18n';

import { getApplicationConfiguration, getApiDefinition } from '/@/api/abp/abp';
import {
  ApplicationConfiguration,
  Auth,
  CurrentUser,
  Localization,
  Setting,
} from '/@/api/abp/model/appModel';
import { ApplicationApiDescriptionModel } from '/@/api/abp/model/apiDefinition';

const ls = createLocalStorage();
const defaultApp = new ApplicationConfiguration();
const defaultApi = new ApplicationApiDescriptionModel();

const lsApplication = (ls.get(ABP_APP_KEY) || defaultApp) as ApplicationConfiguration;
const lsApiDefinition = (ls.get(ABP_API_KEY) || defaultApi) as ApplicationApiDescriptionModel;

interface AbpState {
  application: ApplicationConfiguration;
  apidefinition: ApplicationApiDescriptionModel;
}

export const useAbpStore = defineStore({
  id: 'abp-store',
  state: (): AbpState => ({
    application: lsApplication,
    apidefinition: lsApiDefinition,
  }),
  getters: {
    getApplication() {
      return this.application ?? defaultApp;
    },
    getApiDefinition() {
      return this.apidefinition ?? defaultApi;
    },
  },
  actions: {
    resetSession() {
      // 清除与用户相关的信息
      this.application.auth = new Auth();
      this.application.currentUser = new CurrentUser();
      this.application.setting = new Setting();
    },
    setApplication(application: ApplicationConfiguration) {
      this.application = application;
      ls.set(ABP_APP_KEY, application);
    },
    setApiDefinition(apidefinition: ApplicationApiDescriptionModel) {
      this.apidefinition = apidefinition;
      ls.set(ABP_API_KEY, apidefinition);
    },
    mergeLocaleMessage(localization: Localization) {
      if (localization.languagesMap['vben-admin-ui']) {
        const transferCulture = localization.languagesMap['vben-admin-ui'].filter(
          (x) => x.value === localization.currentCulture.cultureName
        );
        if (transferCulture && transferCulture.length > 0) {
          i18n.global.mergeLocaleMessage(transferCulture[0].name, localization.values);
        } else {
          i18n.global.mergeLocaleMessage(
            localization.currentCulture.cultureName,
            localization.values
          );
        }
      }
    },
    async initlizeAbpApplication() {
      const application = await getApplicationConfiguration();
      this.setApplication(application);

      const { localization } = application;
      this.mergeLocaleMessage(localization);
    },
    async initlizaAbpApiDefinition() {
      const apidefinition = await getApiDefinition();
      this.setApiDefinition(apidefinition);
    },
  },
});

export function useAbpStoreWidthOut() {
  return useAbpStore(store);
}
