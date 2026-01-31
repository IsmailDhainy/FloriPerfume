import { restApiClient } from "../restApiClient";

export const logoutUser = async () => {
  return restApiClient.post<void>("/auth/logout");
};
