import { assetsURL } from "@/config";

export const getAvatar = (url: string) => {
  return `${assetsURL}/${url}`;
};

export function sliceText(text: string, length: number = 16) {
  if (!text) return "";
  return text.length > length ? text.slice(0, length) + "..." : text;
}
