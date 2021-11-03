import { useMessage } from '/@/hooks/web/useMessage';
import { useI18n } from '/@/hooks/web/useI18n';
// import router from '/@/router';
// import { PageEnum } from '/@/enums/pageEnum';
import { useUserStoreWidthOut } from '/@/store/modules/user';

const { createMessage } = useMessage();

const error = createMessage.error!;
export function checkStatus(status: number, msg: string): void {
  const { t } = useI18n();
  const userStore = useUserStoreWidthOut();
  switch (status) {
    case 400:
      error(`${msg}`);
      break;
    // 401: Not logged in
    // Jump to the login page if not logged in, and carry the path of the current page
    // Return to the current page after successful login. This step needs to be operated on the login page.
    case 401:
      error(t('sys.api.errMsg401'));
      userStore.setToken(undefined);
      userStore.setSessionTimeout(true);
      break;
    case 403:
      error(t('sys.api.errMsg403'));
      break;
    // 404请求不存在
    case 404:
      error(t('sys.api.errMsg404'));
      break;
    case 405:
      error(t('sys.api.errMsg405'));
      break;
    case 408:
      error(t('sys.api.errMsg408'));
      break;
    case 500:
      error(t('sys.api.errMsg500'));
      break;
    case 501:
      error(t('sys.api.errMsg501'));
      break;
    case 502:
      error(t('sys.api.errMsg502'));
      break;
    case 503:
      error(t('sys.api.errMsg503'));
      break;
    case 504:
      error(t('sys.api.errMsg504'));
      break;
    case 505:
      error(t('sys.api.errMsg505'));
      break;
    default:
  }
}

export function checkResponse(response: any): void {
  let errorJson = response.data.error;

  // 会话超时
  if (response.status === 401) {
    const userStore = useUserStoreWidthOut();
    userStore.setToken(undefined);
    userStore.setSessionTimeout(true);
    return;
  }

  // abp框架抛出异常信息
  if (response.headers['_abperrorformat'] === 'true') {
    if (errorJson === undefined && response.data.type === 'application/json') {
      const reader = new FileReader();
      reader.onload = function (e) {
        errorJson = JSON.parse(e.target?.result as string);
        console.log(errorJson);
        error(errorJson.error.message);
      };
      reader.readAsText(response.data);
    } else {
      error(errorJson.message);
    }
    return;
  }

  // oauth错误信息
  if (response.data.error_description) {
    error(response.data.error_description);
    return;
  }

  // 其他错误
  if (response.data.error.details) {
    error(response.data.error.details);
    return;
  }

  if (response.data.error.message) {
    error(response.data.error.message);
    return;
  }

  // 都没捕获到则提示默认错误信息
  const { t } = useI18n();
  checkStatus(response.status, t('sys.api.apiRequestFailed'));
}
