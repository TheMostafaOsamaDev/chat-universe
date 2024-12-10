import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getAvatarUrl(avatar: string) {
  return `${process.env.NEXT_PUBLIC_STATIC_FILES_URL}/${avatar}`;
}

export function sliceText(text: string, length: number = 16) {
  if (!text) return "";
  return text.length > length ? text.slice(0, length) + "..." : text;
}
