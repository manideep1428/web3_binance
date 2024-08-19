// import { PrismaClient } from "@prisma/client"
// import { AuthProps } from "@/app/utils/types";
// import { NextRequest, NextResponse } from 'next/server';

// const prisma  = new PrismaClient();

// export async function POST(req:NextRequest) {
//     const {vusername , password } = await req.body
//     try {
//         const user = await prisma.user.findUnique({
//             where:{
//                 username:username
//             }
//         })
//         if(user){
//             if(user.password === password){
//                 return {message : user , status:200 , response:"User is logged in"}
//             }
//             else if (user.password !== password){
//                 return "Password is incorrect"
//             }
//         }
//         const new_user  = await prisma.user.create({
//             data:{
//                 username:username,
//                 password:password
//             }
//         })
//         return  { message: new_user.id , response: "User is Created" , status:200}.toString()
//     } catch (error) {
//         return error 
//     }
// }
