const USER_TOKEN_KEY = "user_token";

export const setUserToken = (token: string) => {
  localStorage.setItem(USER_TOKEN_KEY, token);
};

export const getUserToken = () => {
  return localStorage.getItem(USER_TOKEN_KEY);
};

export const removeUserToken = () => {
  localStorage.removeItem(USER_TOKEN_KEY);
};
