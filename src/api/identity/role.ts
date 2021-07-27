import { defAbpHttp } from '/@/utils/http/abp';
import { RoleListResult } from './model/roleModel';

enum Api {
  RemoteService = 'AbpIdentity',
  Controller = 'IdentityUser',
  GetById = '/api/identity/users/{id}',
  GetAllList = '/api/identity/roles/all',
  GetList = '/api/identity/users',
  GetActivedList = '/api/ApiGateway/RouteGroups/Actived',
}

export const getAllList = () => {
  return defAbpHttp.get<RoleListResult>({
    url: Api.GetAllList,
  });
};
