import { defAbpHttp } from '/@/utils/http/abp';
import {
  OssObject,
  OssObjectCreate,
  OssContainer,
  GetOssObjectRequest,
  GetOssObjectPagedRequest,
  OssObjectsResult,
  GetOssContainerPagedRequest,
  OssContainersResult,
} from './model/ossModel';
import { format } from '/@/utils/strings';
import { UploadFileParams } from '/@/utils/http/axios/types';

enum Api {
  CreateObject = '/api/oss-management/objects',
  DeleteObject = '/api/oss-management/objects',
  GetObject = '/api/oss-management/objects',
  GetObjects = '/api/oss-management/containes/objects',
  CreateContainer = '/api/oss-management/containes/{name}',
  DeleteContainer = '/api/oss-management/containes/{name}',
  GetContainer = '/api/oss-management/containes/{name}',
  GetContainers = '/api/oss-management/containes',
  UploadObject = '/api/api/files/static/{bucket}/p/{path}',
  DownloadObject = '/api/api/files/static/{bucket}/p/{path}/{name}',
}

export const uploadUrl = Api.UploadObject;
export const downloadUrl = Api.DownloadObject;

export const uploadObject = (params: UploadFileParams) => {
  return defAbpHttp.uploadFile<OssObject>(
    {
      url: format(uploadUrl, { bucket: params.bucket, path: params.path }),
    },
    params
  );
};

export const createContainer = (name: string) => {
  return defAbpHttp.post<OssContainer>({
    url: format(Api.CreateContainer, { name: name }),
  });
};

export const deleteContainer = (name: string) => {
  return defAbpHttp.delete<void>({
    url: format(Api.GetContainer, { name: name }),
  });
};

export const getContainer = (name: string) => {
  return defAbpHttp.get<OssContainer>({
    url: format(Api.GetContainer, { name: name }),
  });
};

export const getContainers = (input: GetOssContainerPagedRequest) => {
  return defAbpHttp.get<OssContainersResult>({
    url: Api.GetContainers,
    params: input,
  });
};

export const createObject = (input: OssObjectCreate) => {
  return defAbpHttp.post<OssObject>({
    url: Api.CreateObject,
    data: input,
  });
};

export const deleteObject = (input: GetOssObjectRequest) => {
  return defAbpHttp.delete<void>(
    {
      url: Api.DeleteObject,
      params: input,
    },
    {
      joinParamsToUrl: true,
    }
  );
};

export const getObject = (input: GetOssObjectRequest) => {
  return defAbpHttp.get<OssObject>({
    url: Api.GetObject,
    params: input,
  });
};

export const getObjects = (input: GetOssObjectPagedRequest) => {
  return defAbpHttp.get<OssObjectsResult>({
    url: Api.GetObjects,
    params: input,
  });
};
