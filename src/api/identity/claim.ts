import { defAbpHttp } from '/@/utils/http/abp';
import { IdentityClaimTypeListResult } from './model/claimModel';

enum Api {
  GetActivedList = '/api/identity/claim-types/actived-list',
}

export const getActivedList = () => {
  return defAbpHttp.get<IdentityClaimTypeListResult>({
    url: Api.GetActivedList,
  });
};
