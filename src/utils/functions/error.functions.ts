import { AxiosError } from "axios";
import { toast } from "react-toastify";

export const errorMessageToaster = (error: AxiosError) => {
  const errorData = error.response?.data as unknown as {
    message: string[] | string;
    error: string;
    statusCode: number;
  };

  if (typeof errorData.message === "string") {
    toast.error(errorData.message);
    return;
  }

  errorData.message.forEach((msg) => toast.error(msg.split(":")[1]));
};
