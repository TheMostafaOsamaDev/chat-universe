import { assetsURL } from "@/config";

export const getAvatar = (url: string) => {
  return `${assetsURL}/${url}`;
};
