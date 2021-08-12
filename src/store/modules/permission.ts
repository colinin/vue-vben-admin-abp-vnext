import type { AppRouteRecordRaw, Menu, RouteMeta } from '/@/router/types';

import { defineStore } from 'pinia';
import { store } from '/@/store';
import { useI18n } from '/@/hooks/web/useI18n';
import { useUserStore } from './user';
import { useAbpStoreWidthOut } from './abp';
import { useAppStoreWidthOut } from './app';
import { toRaw } from 'vue';
import { transformObjToRoute, flatMultiLevelRoutes } from '/@/router/helper/routeHelper';
import { transformRouteToMenu, generateTree, mapMetaBoolean } from '/@/router/helper/menuHelper';

import projectSetting from '/@/settings/projectSetting';

import { PermissionModeEnum } from '/@/enums/appEnum';

import { asyncRoutes } from '/@/router/routes';
import { ERROR_LOG_ROUTE, PAGE_NOT_FOUND_ROUTE } from '/@/router/routes/basic';

import { filter } from '/@/utils/helper/treeHelper';

import { getMenuList } from '/@/api/sys/menu';

import { useMessage } from '/@/hooks/web/useMessage';
import { RouteItem } from '/@/api/sys/model/menuModel';

interface PermissionState {
  // Permission code list
  permCodeList: string[];
  // Whether the route has been dynamically added
  isDynamicAddedRoute: boolean;
  // To trigger a menu update
  lastBuildMenuTime: number;
  // Backstage menu list
  backMenuList: Menu[];
}
export const usePermissionStore = defineStore({
  id: 'app-permission',
  state: (): PermissionState => ({
    permCodeList: [],
    // Whether the route has been dynamically added
    isDynamicAddedRoute: false,
    // To trigger a menu update
    lastBuildMenuTime: 0,
    // Backstage menu list
    backMenuList: [],
  }),
  getters: {
    getPermCodeList() {
      return this.permCodeList;
    },
    getBackMenuList() {
      return this.backMenuList;
    },
    getLastBuildMenuTime() {
      return this.lastBuildMenuTime;
    },
    getIsDynamicAddedRoute() {
      return this.isDynamicAddedRoute;
    },
  },
  actions: {
    setPermCodeList(codeList: string[]) {
      this.permCodeList = codeList;
    },

    setBackMenuList(list: Menu[]) {
      this.backMenuList = list;
      list?.length > 0 && this.setLastBuildMenuTime();
    },

    setLastBuildMenuTime() {
      this.lastBuildMenuTime = new Date().getTime();
    },

    setDynamicAddedRoute(added: boolean) {
      this.isDynamicAddedRoute = added;
    },
    resetState(): void {
      this.isDynamicAddedRoute = false;
      this.permCodeList = [];
      this.backMenuList = [];
      this.lastBuildMenuTime = 0;
    },
    async changePermissionCode() {
      const abpStore = useAbpStoreWidthOut();
      const grantedPolicies = abpStore.getApplication.auth.grantedPolicies;
      const authPermissions = new Array<string>();
      if (grantedPolicies) {
        Object.keys(grantedPolicies).forEach((key) => {
          if (grantedPolicies[key]) {
            authPermissions.push(key);
          }
        });
      }
      this.setPermCodeList(authPermissions);
    },
    async buildRoutesAction(): Promise<AppRouteRecordRaw[]> {
      const { t } = useI18n();
      const userStore = useUserStore();
      const appStore = useAppStoreWidthOut();

      let routes: AppRouteRecordRaw[] = [];
      const roleList = toRaw(userStore.getRoleList) || [];
      const { permissionMode = projectSetting.permissionMode } = appStore.getProjectConfig;
      // role permissions
      if (permissionMode === PermissionModeEnum.ROLE) {
        const routeFilter = (route: AppRouteRecordRaw) => {
          const { meta } = route;
          const { roles } = meta || {};
          if (!roles) return true;
          return roleList.some((role) => roles.includes(role));
        };
        routes = filter(asyncRoutes, routeFilter);
        routes = routes.filter(routeFilter);
        // Convert multi-level routing to level 2 routing
        routes = flatMultiLevelRoutes(routes);
        //  If you are sure that you do not need to do background dynamic permissions, please comment the entire judgment below
      } else if (permissionMode === PermissionModeEnum.BACK) {
        const { createMessage } = useMessage();

        createMessage.loading({
          content: t('sys.app.menuLoading'),
          duration: 1,
        });

        // !Simulate to obtain permission codes from the background,
        // this function may only need to be executed once, and the actual project can be put at the right time by itself
        let routeList: AppRouteRecordRaw[] = [];
        try {
          this.changePermissionCode();
          const menuResult = await getMenuList();
          const menuList = generateTree(menuResult.items) as RouteItem[];
          routeList = this.filterDynamicRoutes(menuList);
        } catch (error) {
          console.error(error);
        }

        // Dynamically introduce components
        routeList = transformObjToRoute(routeList);

        //  Background routing to menu structure
        const backMenuList = transformRouteToMenu(routeList);
        this.setBackMenuList(backMenuList);

        routeList = flatMultiLevelRoutes(routeList);
        routes = [PAGE_NOT_FOUND_ROUTE, ...routeList];
      }
      routes.push(ERROR_LOG_ROUTE);
      return routes;
    },
    filterDynamicRoutes(menus: RouteItem[]) {
      const routeList: AppRouteRecordRaw[] = [];
      menus.forEach((menu) => {
        if (!this.validationFeatures(menu.meta)) {
          return;
        }
        const r: AppRouteRecordRaw = {
          path: menu.path,
          name: menu.name!,
          redirect: menu.redirect,
          component: menu.component,
          meta: {
            affix: mapMetaBoolean('affix', menu.meta),
            title: menu.meta.title,
            icon: menu.meta.icon,
            ignoreAuth: mapMetaBoolean('ignoreAuth', menu.meta),
            ignoreKeepAlive: mapMetaBoolean('ignoreKeepAlive', menu.meta),
            frameSrc: menu.meta.frameSrc,
            frameFormat: menu.meta.frameFormat,
            transitionName: menu.meta.transitionName,
            hideBreadcrumb: mapMetaBoolean('hideBreadcrumb', menu.meta),
            hideChildrenInMenu: mapMetaBoolean('hideChildrenInMenu', menu.meta),
            carryParam: mapMetaBoolean('carryParam', menu.meta),
            single: mapMetaBoolean('single', menu.meta),
            currentActiveMenu: menu.meta.currentActiveMenu,
            hideTab: mapMetaBoolean('hideTab', menu.meta),
            hideMenu: mapMetaBoolean('hideMenu', menu.meta),
            isLink: mapMetaBoolean('isLink', menu.meta),
            roles: menu.meta.roles,
          },
        };
        if (menu.children) {
          r.children = this.filterDynamicRoutes(menu.children);
        }
        routeList.push(r);
      });

      return routeList;
    },
    /** 验证功能 */
    validationFeatures(meta: RouteMeta) {
      // 如果声明了必须某些功能而系统为启用此功能,则不加入路由中
      if (meta.requiredFeatures) {
        let featureHasEnabled = true;
        const abpStore = useAbpStoreWidthOut();
        const { features } = abpStore.getApplication;
        const definedFeatures = features.values;
        if (definedFeatures === undefined) {
          return featureHasEnabled;
        }
        let requiredFeatures = meta.requiredFeatures;
        if (!Array.isArray(requiredFeatures)) {
          requiredFeatures = requiredFeatures.split(',');
        }
        requiredFeatures.forEach((feature) => {
          if (definedFeatures[feature] === 'false') {
            featureHasEnabled = false;
          }
        });
        return featureHasEnabled;
      }
      return true;
    },
  },
});

// Need to be used outside the setup
export function usePermissionStoreWidthOut() {
  return usePermissionStore(store);
}
