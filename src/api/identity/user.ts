import { defAbpHttp } from '/@/utils/http/abp';
import {
  User,
  CreateUser,
  UpdateUser,
  GetUserPagedRequest,
  UserPagedResult,
} from './model/userModel';
import { RoleListResult } from './model/roleModel';
import { format } from '/@/utils/strings';

enum Api {
  Create = '/api/identity/users',
  Delete = '/api/identity/users/{id}',
  GetById = '/api/identity/users/{id}',
  GetList = '/api/identity/users',
  GetRoleList = '/api/identity/users/{id}/roles',
  GetActivedList = '/api/ApiGateway/RouteGroups/Actived',
  GetAssignableRoles = '/api/identity/users/assignable-roles',
  Update = '/api/identity/users/{id}',
}

export const create = (input: CreateUser) => {
  return defAbpHttp.post<User>({
    url: Api.Create,
    data: input,
  });
};

export const deleteById = (id: string) => {
  return defAbpHttp.delete<void>({
    url: format(Api.Delete, { id: id }),
  });
};

export const getById = (id: string) => {
  return defAbpHttp.get<User>({
    url: format(Api.GetById, { id: id }),
  });
};

export const getAssignableRoles = () => {
  return defAbpHttp.get<RoleListResult>({
    url: Api.GetAssignableRoles,
  });
};

export const getRoleList = (id: string) => {
  return defAbpHttp.get<RoleListResult>({
    url: format(Api.GetRoleList, { id: id }),
  });
};

export const getList = (input: GetUserPagedRequest) => {
  return defAbpHttp.get<UserPagedResult>({
    url: Api.GetList,
    params: input,
  });
};

export const update = (id: string, input: UpdateUser) => {
  return defAbpHttp.put<User>({
    url: format(Api.Update, { id: id }),
    data: input,
  });
};
