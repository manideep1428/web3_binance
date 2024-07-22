'use server'
import { PrismaClient } from '@prisma/client'

const prisma  = new PrismaClient();

interface Props{
    crypto :String ,
    amount : string
}
//remember 10000
export  async function BuyCrypto( crypto:string , amount: string ){
   try{
      const transaction = await prisma.$transaction(async (tx:any) => {
         const cryptoOrder = await  tx.crypto.create({
            data:{
               name:crypto,
               buyAt:amount,
               TimeBuyAt:Date.now().toString(),
               TransactionFee:(Number(amount)/0.02).toString(),
            }  
         })
          await tx.order.create({
             data:{
                 amount,
                 status : "Confirmed",
                 userId: 1,
                 CryptoId: cryptoOrder.id
             }
         })
        })
        return "sucess"
   }catch(error){
      return "error"
   }
}