'use server'
import { AuthProps } from "@/app/utils/types";
//login route
import { PrismaClient } from "@prisma/client"

const prisma  = new PrismaClient();

export async function Login(username :any, password:any){
    try {
        const user = await prisma.user.findUnique({
            where:{
                username:username
            }
        })
        if(user){
            if(user.password === password){
                return {message : user , status:200 , response:"User is logged in"}
            }
            else if (user.password !== password){
                return "Password is incorrect"
            }
        }
        const new_user  = await prisma.user.create({
            data:{
                username:username,
                password:password
            }
        })
        return  { message: new_user.id , response: "User is Created" , status:200}.toString()
    } catch (error) {
        return error 
    }
}