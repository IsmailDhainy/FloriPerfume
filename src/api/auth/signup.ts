import { SignupFormData } from "$/pages/signup/_features/constants/index.validations";

import { restApiClient } from "../restApiClient";

export const signupUser = async (data: SignupFormData) => {
  return restApiClient.post("/auth/register", { data });
};
