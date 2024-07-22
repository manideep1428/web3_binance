"use server"
import { SellProps } from "@/app/utils/types"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

export async function sellcrypto( {crypto , amount , soldAt , userId }:SellProps) {
     const user =  await prisma.user.findFirst({
          where :{
               id: userId
          },
          include:{
               Crypto: true
          } 
     })             
     if(!user){
          return "User Not Found";
     }
     console.log
}

