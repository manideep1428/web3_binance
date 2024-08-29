"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { PrimaryButton, SignButton, SuccessButton } from "./core/Button"
import { useRouter } from "next/navigation";
import { Menu, X  } from 'lucide-react'; 
import UserDetails from "./UserDetails";
import DarkModeToggle from "./DarkModeToggle";
import { signIn, useSession } from "next-auth/react";

export const Appbar = () => {
    const route = usePathname();
    const router = useRouter();
    const [isMobile, setIsMobile] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const session = useSession();

    useEffect(() => {
        const checkIfMobile = () => setIsMobile(window.innerWidth < 768);
        checkIfMobile();
        window.addEventListener('resize', checkIfMobile);
        return () => window.removeEventListener('resize', checkIfMobile);
    }, []);

    const handleDeposit = () => {
        if (session) {
            router.push("/deposit")
        } else {
            console.log("Please Signin")
        }
    }

    const NavItem = ({ href, children }:any) => (
        <div
            className={`text-sm pt-1 cursor-pointer ${route.startsWith(href) ? 'text-white' : 'text-slate-500'}`}
            onClick={() => { router.push(href); setMenuOpen(false); }}
        >
            {children}
        </div>
    );

    return (
        <div className="text-black bg-white  dark:text-white dark:bg-black  border-b border-slate-800">
            <div className="flex justify-between items-center p-2">
                <div className="flex items-center">
                    <div className="text-xl pl-4 cursor-pointer font-semibold dark:text-white" onClick={() => router.push('/')}>
                        Exchange
                    </div>
                    {!isMobile && (
                        <div className="flex m-auto gap-6 p-4">
                            <NavItem href="/markets">Markets</NavItem>
                            <NavItem href="/trade/SOL_USDC">Trade</NavItem>
                        </div>
                    )}
                </div>
                {isMobile ? (
                    <div className="flex items-center mr-3 gap-4">
                        {session.data?.user ? (
                            <div className="mr-2">
                                <UserDetails/>
                            </div>
                        ) : (
                            <SignButton onClick={() => router.push("auth/signin")} className="mr-2">SignUp</SignButton>
                        )}
                        <button onClick={() => setMenuOpen(!menuOpen)}>
                            {menuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                ) : (
                    <div className="flex flex-row justify-center gap-5">
                        <SuccessButton onClick={handleDeposit}>Deposit</SuccessButton>
                        <DarkModeToggle/>
                        {session.data?.user ? (
                            <div className="flex m-auto">
                              <PrimaryButton onClick={() => router.push(":id/wallet")}>Wallet</PrimaryButton>
                              <UserDetails/>
                            </div>
                        ) : (
                            <SignButton onClick={async () => await signIn() } >SignUp</SignButton>
                        )}
                    </div>
                )}
            </div>
            {isMobile && menuOpen && (
                <div className="flex flex-col p-4 gap-3 text-black bg-white dark:text-white dark:bg-black">
                    <NavItem href="/markets">Markets</NavItem>
                    <NavItem href="/trade/SOL_USDC">Trade</NavItem>
                    <DarkModeToggle/>
                    <SuccessButton onClick={handleDeposit} className="mt-2">Deposit</SuccessButton>
                    {session.data?.user && (
                        <PrimaryButton onClick={() => router.push(":id/wallet")} className="mt-2">Wallet</PrimaryButton>
                    )}
                </div>
            )}
        </div>
    );
}