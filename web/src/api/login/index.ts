import service from "@/utils/axios/service";
import { LoginParams, UserInfo } from "./type";
/**
 * 登录
 * @param data
 * @returns
 */
interface LoginResponseData {
  access_token: string;
  username: string;
  email: string;
  avatar?: string;
}
export const login = (data: LoginParams) => {
  return service.request<LoginResponseData>({
    url: "/auth/login",
    method: "post",
    data,
  });
};

/**
 * 注册
 * @param data
 * @returns
 */
export const register = (data: LoginParams) => {
  return service.request<UserInfo>({
    url: "/auth/register",
    method: "post",
    data,
  });
};
