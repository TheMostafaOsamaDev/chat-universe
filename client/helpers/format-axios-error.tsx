import { AxiosError } from "axios";

export const formatAxiosError = (error: AxiosError<any>): any => {
  let finalMessage = "";
  const messsage =
    error.response?.data || error.response?.data?.message || error.message;

  if (messsage) {
    finalMessage = messsage;
  } else if (error.status) {
    finalMessage = `Error occurred with status code: ${error.status}`;
  } else {
    finalMessage = "An error occurred";
  }

  return finalMessage;
};
