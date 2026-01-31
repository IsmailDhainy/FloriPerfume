import { LoginFormData } from "$/pages/login/_features/constants/index.validations";

import { restApiClient } from "../restApiClient";

export const loginUser = async (data: LoginFormData) => {
  return restApiClient.post("/auth/login", { data });
};
