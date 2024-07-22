'use client'
import React from 'react'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Login } from '../(server)/api/Authentication';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { loginVerfication } from '../utils/types';



export default function SignUp() : React.ReactNode {
    const [error,setError] = React.useState<string | null>(null);
    const [loading,setLoading] = React.useState<boolean>(false);    
    const [data,setData ] = React.useState({username: "" , password : ""});
    const router = useRouter();
    const { toast } = useToast()
   
    const handleLogin = async()=>{
     try {
      console.log(data)
      const safeData = loginVerfication.safeParse(data)
     if(safeData.success){
        const response:any = await Login(safeData?.data?.username, safeData?.data?.password)
        toast({
          variant:"default",
          title: response.response
        })
        if(response.status === 200){
            router.push("/")
        }
     }
      else if(!safeData.success) {
        console.log(safeData)
        setError("Please Enter Valid  Data \n. Username Aleast 6 Letter And  No Space Are Allowed. \n PassWord Atleast 8 Chacretors. \n")
      }
     } catch (error) {
      console.log(error)
      setError(error as string)
     }
   }

  return (
    <div className='flex flex-col w-full max-w-sm items-center my-6 gap-6'>
      {error && <p className='text-red-500 font-bold w-[auto]'>{error}</p>}
      <Input type='email'
       required
       placeholder='Email' 
       onChange={(e)=>setData({...data , username: e.target.value})}
        />         
      <Input
       type='password'
       required
       placeholder='password' 
       onChange={(e)=>setData({...data , password: e.target.value})}/>  
      <Button
      type='submit'
      onClick={handleLogin}
      > {loading ? "...Loading" : "SignUp"}
       </Button>
       <div>
         <p> No Account ? 
            <Link href={"/signin"} className='text-blue-600'> SignIn </Link>
         </p>
       </div>
    </div>
  )
};