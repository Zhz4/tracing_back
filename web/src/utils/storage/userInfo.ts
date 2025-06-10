import { UserInfo } from "@/api/login/type";
const USER_INFO_KEY = "user_info";

export const setUserInfo = (userInfo: UserInfo) => {
  localStorage.setItem(USER_INFO_KEY, JSON.stringify(userInfo));
};

export const getUserInfo = () => {
  return JSON.parse(localStorage.getItem(USER_INFO_KEY) || "{}");
};

export const removeUserInfo = () => {
  localStorage.removeItem(USER_INFO_KEY);
};
