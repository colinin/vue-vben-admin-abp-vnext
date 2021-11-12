import { defHttp } from '/@/utils/http/axios';
import { GetNotificationPagedRequest, NotificationPagedResult } from './model/notificationsModel';

enum Api {
  GetList = '/api/my-notifilers',
}

export const getList = (input: GetNotificationPagedRequest) => {
  return defHttp.get<NotificationPagedResult>({
    url: Api.GetList,
    params: input,
  });
};
