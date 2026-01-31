import { UserPassword } from "$/types/native/user.types";

import { restApiClient } from "../restApiClient";

export const changePassword = async (data: UserPassword) => {
  return restApiClient.put("/auth/password", { data });
};
