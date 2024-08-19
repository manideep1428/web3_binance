import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getUserLogin(){
  const userToken = localStorage.getItem("auth-token")
   if (userToken  !== undefined){
    return true
   }
   return false
}