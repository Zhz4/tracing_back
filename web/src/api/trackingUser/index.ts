import service from "@/utils/axios/service";
import { TrackingUserResponse, UserInfoResponse } from "./type";

export const getTrackingUser = async (params: { userName: string }) => {
  const result = await service.request<TrackingUserResponse[]>({
    url: `/trackUser`,
    params,
    method: "get",
  });
  return result.data;
};

export const getUserInfo = async (userUuid: string) => {
  const result = await service.request<UserInfoResponse>({
    url: `/trackUser/${userUuid}`,
    method: "get",
  });
  return result.data;
};
