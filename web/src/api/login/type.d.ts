export interface LoginParams {
  username?: string;
  email: string;
  password: string;
}

export interface UserInfo {
  id: string;
  username: string;
  email: string;
  password: string;
  createdAt?: object;
  avatar?: string | null;
}
