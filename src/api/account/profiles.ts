import { defAbpHttp } from '/@/utils/http/abp';
import {
  MyProfile,
  UpdateMyProfile,
  ChangePassword,
  ChangePhoneNumber,
  TwoFactorEnabled,
  IdentityUserClaimSet,
} from './model/profilesModel';

enum Api {
  Get = '/api/identity/my-profile',
  Update = '/api/identity/my-profile',
  ChangePassword = '/api/identity/my-profile/change-password',
  SendChangePhoneNumberCode = '/api/identity/my-profile/send-phone-number-change-code',
  ChangePhoneNumber = '/api/identity/my-profile/change-phone-number',
  GetTwoFactorEnabled = '/api/identity/my-profile/two-factor',
  ChangeTwoFactorEnabled = '/api/identity/my-profile/change-two-factor',
  SetClaim = '/api/identity/my-profile/claims',
}

export const get = () => {
  return defAbpHttp.get<MyProfile>({
    url: Api.Get,
  });
};

export const update = (input: UpdateMyProfile) => {
  return defAbpHttp.put<MyProfile>({
    url: Api.Update,
    data: input,
  });
};

export const changePassword = (input: ChangePassword) => {
  return defAbpHttp.post<void>({
    url: Api.ChangePassword,
    data: input,
  });
};

export const setClaim = (input: IdentityUserClaimSet) => {
  return defAbpHttp.put<void>({
    url: Api.SetClaim,
    data: input,
  });
};

export const sendChangePhoneNumberCode = (phoneNumber: string) => {
  return defAbpHttp.put<void>({
    url: Api.SendChangePhoneNumberCode,
    data: {
      newPhoneNumber: phoneNumber,
    },
  });
};

export const changePhoneNumber = (input: ChangePhoneNumber) => {
  return defAbpHttp.put<void>({
    url: Api.ChangePhoneNumber,
    data: input,
  });
};

export const getTwoFactorEnabled = () => {
  return defAbpHttp.get<TwoFactorEnabled>({
    url: Api.GetTwoFactorEnabled,
  });
};

export const changeTwoFactorEnabled = (enabled: boolean) => {
  return defAbpHttp.put<void>({
    url: Api.ChangeTwoFactorEnabled,
    data: {
      enabled: enabled,
    },
  });
};
