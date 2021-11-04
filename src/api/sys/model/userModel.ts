/**
 * @description: Login interface parameters
 */
export interface LoginParams {
  username: string;
  password: string;
}

export interface RoleInfo {
  roleName: string;
  value: string;
}

/**
 * @description: Login interface return value
 */
export interface LoginResultModel {
  /** 访问令牌 */
  access_token: string;
  /** 过期时间 */
  expires_in: number;
  /** 令牌类型 */
  token_type: string;
  /** 刷新令牌 */
  refresh_token: string;
}

/**
 * @description: Get user information return value
 */
export interface GetUserInfoModel {
  roles: string[];
  // 用户id
  userId: string | number;
  // 用户名
  username: string;
  // 真实名字
  realName: string;
  // 头像
  avatar: string;
  // 介绍
  desc?: string;
}
