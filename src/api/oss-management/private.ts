import { defHttp } from '/@/utils/http/axios';
import { OssObject } from './model/ossModel';
import { format } from '/@/utils/strings';
import { AxiosResponse } from 'axios';

enum Api {
  Upload = '/api/api/files/private/{path}/{name}',
  Get = '/api/api/files/private/p/{path}/{name}',
}

export const formatUrl = (url: string) => {
  // 格式化路径为用户目录
  return `/api/api/files/static/users/p/${url}`;
};

export const upload = (file: Blob, path: string, name: string) => {
  return new Promise<AxiosResponse<OssObject>>((resolve, reject) => {
    defHttp
      .uploadFile<OssObject>(
        {
          url: format(Api.Upload, { path: path, name: name }),
        },
        {
          file: file,
        },
      )
      .then((res: AxiosResponse<any>) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
  // return defHttp.uploadFile<OssObject>(
  //   {
  //     url: format(Api.Upload, { path: path, name: name }),
  //     data: { file: file },
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': ContentTypeEnum.FORM_DATA,
  //     },
  //   },
  //   {
  //     formatDate: false,
  //   });
};

export const get = (path: string, name: string) => {
  return defHttp.get<Blob>({
    url: format(Api.Get, { name: name, path: path }),
  });
};
