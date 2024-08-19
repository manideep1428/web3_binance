"use client";

import { usePathname } from "next/navigation";
import { PrimaryButton, SignButton, SuccessButton } from "./core/Button"
import { useRouter } from "next/navigation";
import { getUserLogin } from "@/lib/utils";
import { GetAccountDetails } from "./core/AccountDetails";


export const Appbar = () => {
    const route = usePathname();
    const router = useRouter();
    
    const handleDeposit = ()=>{
        if(getUserLogin()){
            router.push("/deposit")
        }else if(!getUserLogin()){
            console.log("Please Signin")
        }else{
            console.log("Something Went Wrong")
        }
    }
    return <div className="text-white bg-black border-b border-slate-800">
        <div className="flex justify-between items-center p-2">
            <div className="flex">
                <div className={`text-xl pl-4 flex flex-col justify-center cursor-pointer text-white`} onClick={() => router.push('/')}>
                    Exchange
                </div>
                <div className={`text-sm pt-1 flex flex-col justify-center pl-8 cursor-pointer ${route.startsWith('/') ? 'text-white' : 'text-slate-500'}`} onClick={() => router.push('/markets')}>
                    Markets
                </div>
                <div className={`text-sm pt-1 flex flex-col justify-center pl-8 cursor-pointer ${route.startsWith('/trade') ? 'text-white' : 'text-slate-500'}`} onClick={() => router.push('/trade/SOL_USDC')}>
                    Trade
                </div>
            </div>
            <div className="flex flex-row justify-center gap-5">
                <div className="p-2 mr-4 flex">
                    <SuccessButton onClick={()=>setisDesposit(true)}>Deposit</SuccessButton>
                    {/* <PrimaryButton>Withdraw</PrimaryButton> */}
                  { getUserLogin() ?
                    ( <div className="flex flex-row gap-5">
                        <PrimaryButton onClick={() => router.push(":id/wallet")}>Wallet</PrimaryButton>
                        <GetAccountDetails/>
                      </div> ) 
                   : 
                    ( <SignButton onClick={() => router.push("/signin")} >SignUp</SignButton> )
                   }
                </div>
            </div>
        </div>
    </div>
}