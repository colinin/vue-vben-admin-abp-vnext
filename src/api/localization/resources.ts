import { defAbpHttp } from '/@/utils/http/abp';
import {
  Resource,
  ResourceCreateOrUpdate,
  GetResourcePagedRequest,
  ResourcePagedResult,
} from './model/resourcesModel';
import { format } from '/@/utils/strings';

enum Api {
  Create = '/api/localization/resources',
  DeleteById = '/api/localization/resources/{id}',
  GetById = '/api/localization/resources/{id}',
  GetList = '/api/localization/resources',
}

export const get = (id: string) => {
  return defAbpHttp.get<Resource>({
    url: format(Api.GetById, { id: id }),
  });
};

export const create = (input: ResourceCreateOrUpdate) => {
  return defAbpHttp.post<Resource>({
    url: Api.Create,
    data: input,
  });
};

export const deleteById = (id: string) => {
  return defAbpHttp.delete<void>({
    url: format(Api.GetById, { id: id }),
  });
};

export const update = (id: string, input: ResourceCreateOrUpdate) => {
  return defAbpHttp.put<Resource>({
    url: format(Api.GetById, { id: id }),
    data: input,
  });
};

export const getList = (input: GetResourcePagedRequest) => {
  return defAbpHttp.get<ResourcePagedResult>({
    url: Api.GetList,
    data: input,
  });
};
