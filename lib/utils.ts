import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getUserLogin() {
  if (typeof window !== "undefined") {
    const userToken = window.localStorage.getItem("auth-token");
    if (userToken !== null) return true;
    return false;
  }
  return false;
}
