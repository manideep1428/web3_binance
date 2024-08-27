'use client'
import React from 'react'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Login } from '../app/(server)/api/Authentication';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { title } from 'process';


export default function SignIN() : React.ReactNode {
    // const [error,setError] = React.useState<string | null>(null);
    const [loading,setLoading] = React.useState<boolean>(false);    
    const [data,setData ] = React.useState({username: "" , password : ""});
    const router = useRouter();
    const {toast} = useToast();
    
    const handleLogin = async()=>{
     try{
      console.log(data.username , "| |" , data.password)
      const response:any = await Login(data.username, data.password)
      console.log(response)
      toast({
        variant:"default",
        title: response.response
      })
      if(response.status === 200){
        localStorage.setItem("auth-token",response.token)
          router.push("/")
      }
     }catch(err){
      console.log(err)
      toast({
        variant:"destructive",
        title: "Something went wrong"
      })
     }
}

  return (
    <div className='flex flex-col w-full max-w-sm items-center my-6 gap-6'>
      <Input type='text'
       required
       autoComplete='email@example.com'
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
      > {loading ? "...Loading" : "SignIn"}
       </Button>
       <div>
         <p> No account? 
            <Link href={"/signup"} className='text-blue-600'> SignUp </Link>
         </p>
       </div>
    </div>
  )
};