// axios配置  可自行根据项目进行更改，只需更改该文件即可，其他文件可以不动
// The axios configuration can be changed according to the project, just change the file, other files can be left unchanged

import type { AxiosResponse } from 'axios';
import type { RequestOptions, Result } from './types';
import type { AxiosTransform, CreateAxiosOptions } from './axiosTransform';

import { VAxios } from './Axios';
import { checkResponse } from './checkStatus';

import { useGlobSetting } from '/@/hooks/setting';
import { Persistent } from '/@/utils/cache/persistent';

import { RequestEnum, ContentTypeEnum } from '/@/enums/httpEnum';

import { isString } from '/@/utils/is';
import { getToken } from '/@/utils/auth';
import { setObjToUrlParams, deepMerge } from '/@/utils';
import { useErrorLogStoreWithOut } from '/@/store/modules/errorLog';

import { useLocaleStoreWithOut } from '/@/store/modules/locale';

import { joinTimestamp, formatRequestDate } from './helper';

const globSetting = useGlobSetting();
const urlPrefix = globSetting.urlPrefix;

/**
 * @description: 数据处理，方便区分多种处理方式
 */
const transform: AxiosTransform = {
  /**
   * @description: 处理请求数据。如果数据不是预期格式，可直接抛出错误
   */
  transformRequestHook: (res: AxiosResponse<Result>, options: RequestOptions) => {
    // const { t } = useI18n();
    const { isReturnNativeResponse } = options;
    // 是否返回原生响应头 比如：需要获取响应头时使用该属性
    if (isReturnNativeResponse) {
      return res;
    }
    return res.data;
    // 不进行任何处理，直接返回
    // 用于页面代码可能需要直接获取code，data，message这些信息时开启
    // if (!isTransformRequestResult) {
    //   return res.data;
    // }
    // // 错误的时候返回
    // const { data } = res;
    // if (!data) {
    //   // return '[HTTP] Request has no return value';
    //   throw new Error(t('sys.api.apiRequestFailed'));
    // }
    // //  这里 code，result，message为 后台统一的字段，需要在 types.ts内修改为项目自己的接口返回格式
    // const { code, result, message } = data;

    // // 这里逻辑可以根据项目进行修改
    // const hasSuccess = data && Reflect.has(data, 'code') && code === ResultEnum.SUCCESS;
    // if (hasSuccess) {
    //   return result;
    // }

    // // 在此处根据自己项目的实际情况对不同的code执行不同的操作
    // // 如果不希望中断当前请求，请return数据，否则直接抛出异常即可
    // switch (code) {
    //   case ResultEnum.TIMEOUT:
    //     const timeoutMsg = t('sys.api.timeoutMessage');
    //     createErrorModal({
    //       title: t('sys.api.operationFailed'),
    //       content: timeoutMsg,
    //     });
    //     throw new Error(timeoutMsg);
    //   default:
    //     if (message) {
    //       // errorMessageMode=‘modal’的时候会显示modal错误弹窗，而不是消息提示，用于一些比较重要的错误
    //       // errorMessageMode='none' 一般是调用时明确表示不希望自动弹出错误提示
    //       if (options.errorMessageMode === 'modal') {
    //         createErrorModal({ title: t('sys.api.errorTip'), content: message });
    //       } else if (options.errorMessageMode === 'message') {
    //         createMessage.error(message);
    //       }
    //     }
    // }
    // throw new Error(message || t('sys.api.apiRequestFailed'));
  },

  // 请求之前处理config
  beforeRequestHook: (config, options) => {
    const { apiUrl, joinPrefix, joinParamsToUrl, formatDate, joinTime = true } = options;

    if (joinPrefix) {
      config.url = `${urlPrefix}${config.url}`;
    }

    if (apiUrl && isString(apiUrl)) {
      config.url = `${apiUrl}${config.url}`;
    }
    const params = config.params || {};
    const data = config.data || false;
    formatDate && data && !isString(data) && formatRequestDate(data);
    if (config.method?.toUpperCase() === RequestEnum.GET) {
      if (!isString(params)) {
        // 给 get 请求加上时间戳参数，避免从缓存中拿数据。
        config.params = Object.assign(params || {}, joinTimestamp(joinTime, false));
      } else {
        // 兼容restful风格
        config.url = config.url + params + `${joinTimestamp(joinTime, true)}`;
        config.params = undefined;
      }
    } else {
      if (!isString(params)) {
        formatDate && formatRequestDate(params);
        if (Reflect.has(config, 'data') && config.data && Object.keys(config.data).length > 0) {
          config.data = data;
          config.params = params;
        } else {
          // 非GET请求如果没有提供data，则将params视为data
          config.data = params;
          config.params = undefined;
        }
        if (joinParamsToUrl) {
          config.url = setObjToUrlParams(
            config.url as string,
            Object.assign({}, config.params, config.data)
          );
        }
      } else {
        // 兼容restful风格
        config.url = config.url + params;
        config.params = undefined;
      }
    }
    return config;
  },

  /**
   * @description: 请求拦截器处理
   */
  requestInterceptors: (config) => {
    // 请求之前处理config
    const token = getToken();
    if (token) {
      // jwt token
      config.headers.Authorization = token;
    }

    const localeStore = useLocaleStoreWithOut();
    config.headers['Accept-Language'] = localeStore.getLocale;
    const tenantId = Persistent.getTenant();
    if (tenantId) {
      config.headers[globSetting.multiTenantKey] = tenantId;
    }
    return config;
  },

  /**
   * @description: 响应错误处理
   */
  responseInterceptorsCatch: (error: any) => {
    // const { t } = useI18n();
    const errorLogStore = useErrorLogStoreWithOut();
    errorLogStore.addAjaxErrorInfo(error);
    // const { response, code, message } = error || {};
    // const msg: string = response?.data?.error?.message ?? '';
    // const err: string = error?.toString?.() ?? '';
    // try {
    //   if (code === 'ECONNABORTED' && message.indexOf('timeout') !== -1) {
    //     createMessage.error(t('sys.api.apiTimeoutMessage'));
    //   }
    //   if (err?.includes('Network Error')) {
    //     createErrorModal({
    //       title: t('sys.api.networkException'),
    //       content: t('sys.api.networkExceptionMsg'),
    //     });
    //   }
    // } catch (error) {
    //   throw new Error(error);
    // }
    // checkStatus(error?.response?.status, msg);
    checkResponse(error.response);
    return Promise.reject(error);
  },
};

function createAxios(opt?: Partial<CreateAxiosOptions>) {
  return new VAxios(
    deepMerge(
      {
        timeout: 30 * 1000,
        // 基础接口地址
        // baseURL: globSetting.apiUrl,
        // 接口可能会有通用的地址部分，可以统一抽取出来
        urlPrefix: urlPrefix,
        headers: { 'Content-Type': ContentTypeEnum.JSON },
        // 如果是form-data格式
        // headers: { 'Content-Type': ContentTypeEnum.FORM_URLENCODED },
        // 数据处理方式
        transform,
        // 配置项，下面的选项都可以在独立的接口请求中覆盖
        requestOptions: {
          // 默认将prefix 添加到url
          joinPrefix: true,
          // 是否返回原生响应头 比如：需要获取响应头时使用该属性
          isReturnNativeResponse: false,
          // 需要对返回数据进行处理
          isTransformRequestResult: false,
          // post请求的时候添加参数到url
          joinParamsToUrl: false,
          // 格式化提交参数时间
          formatDate: true,
          // 消息提示类型
          errorMessageMode: 'message',
          // 接口地址
          apiUrl: globSetting.apiUrl,
          //  是否加入时间戳
          joinTime: true,
          // 忽略重复请求
          ignoreCancelToken: true,
        },
      },
      opt || {}
    )
  );
}
export const defHttp = createAxios();

// other api url
// export const otherHttp = createAxios({
//   requestOptions: {
//     apiUrl: 'xxx',
//   },
// });
