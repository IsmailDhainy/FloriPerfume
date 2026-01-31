import { User } from "../../types/native/user.types";
import { restApiClient } from "../restApiClient";

export default async function getMe() {
  return restApiClient.get<User>("/auth/me");
}
