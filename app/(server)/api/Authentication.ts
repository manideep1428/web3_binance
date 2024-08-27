'use server'
import { cookies } from "next/headers";
import { PrismaClient } from "@prisma/client"
const cookiesInstance = cookies();

const prisma  = new PrismaClient();

export async function Login(username :any, password:any){
    try {
    //     const user = await prisma.user.findUnique({
    //         where:{
    //             username:username
    //         }
    //     })
    //     if(user){
    //         if(user.password === password){
    //             cookiesInstance.set('my-cookie', user.id.toString(), {
    //                 path: '/',         
    //                 httpOnly: true,     
    //                 sameSite: 'strict', 
    //                 secure: true,       
    //                 maxAge: 60 * 60 * 24, 
    //               });                  
    //             return {message : user , status:200 , response:"User is logged in"}
    //         }
    //         else if (user.password !== password){
    //             return "Password is incorrect"
    //         }
    //     }
    //     const new_user  = await prisma.user.create({
    //         data:{
    //             username:username,
    //             password:password
    //         }
    //     })

    //   return cookiesInstance.set('auth-token', new_user.id.toString(), {
    //     path: '/',         
    //     httpOnly: true,     
    //     sameSite: 'strict', 
    //     secure: true,       
    //     maxAge: 60 * 60 * 24, 
    //   });
      console.log("Tru again")
    } catch (error) {
        return error 
    }
}