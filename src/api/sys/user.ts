import { defHttp } from '/@/utils/http/axios';
import { LoginParams, LoginResultModel, GetUserInfoModel } from './model/userModel';

import { useGlobSetting } from '/@/hooks/setting';

import { ErrorMessageMode } from '/@/utils/http/axios/types';
import { ContentTypeEnum } from '/@/enums/httpEnum';

enum Api {
  Login = '/connect/token',
  GetUserInfo = '/connect/userinfo',
  GetPermCode = '/getPermCode',
}

/**
 * @description: user login api
 */
export function loginApi(params: LoginParams, mode: ErrorMessageMode = 'modal') {
  const setting = useGlobSetting();
  const tokenParams = {
    client_id: setting.clientId,
    client_secret: setting.clientSecret,
    grant_type: 'password',
    username: params.username,
    password: params.password,
  };
  return defHttp.post<LoginResultModel>(
    {
      url: Api.Login,
      params: tokenParams,
      headers: {
        'Content-Type': ContentTypeEnum.FORM_URLENCODED,
      },
    },
    {
      errorMessageMode: mode,
      apiUrl: '/connect',
    }
  );
}

/**
 * @description: getUserInfo
 */
export function getUserInfo() {
  return defHttp.get<GetUserInfoModel>({ url: Api.GetUserInfo });
}

export function getPermCode() {
  return defHttp.get<string[]>({ url: Api.GetPermCode });
}
