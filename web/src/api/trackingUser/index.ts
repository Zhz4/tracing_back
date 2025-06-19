import service from "@/utils/axios/service";
import { TrackingUserResponse } from "./type";

export const getTrackingUser = async () => {
  const result = await service.request<TrackingUserResponse[]>({
    url: `/trackUser`,
    method: "get",
  });
  return result.data;
};
