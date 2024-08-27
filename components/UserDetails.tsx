"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { LogOut, UserRound } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const dropDownData = [
  {
    name: "Profile",
    icon: <UserRound size={15} />,
    href: "/profile",
  },
];

export default function UserDetails() {
  const session = useSession();
  const user = session.data?.user;
  const router = useRouter();
  return (
    <>
      {user && (
        <DropdownMenu>
          <DropdownMenuTrigger className="w-[2.2rem] flex items-center p-[0.2rem]  justify-center h-[2.2rem] m-auto dark:bg-black dark:text-stone-100">
            {!user.image ? (
              <div className="p-1 border-2 rounded-md border-[#1a1a1a] dark:bg-black dark:text-stone-100">
                <UserRound />
              </div>
            ) : (
                <Image src={user.image} width={100} height={100} alt="user" className="rounded-full" />
            )}
          </DropdownMenuTrigger>

          <DropdownMenuContent className="!w-[15rem] dark:shadow-[#030712] translate-y-8 scale-110 -translate-x-10 shadow-lg">
            <DropdownMenuLabel className="flex gap-4 items-center">
              <div className="!w-[2rem] flex items-center p-[0.2rem]  justify-center !h-[2rem]">
                {!user.image ? (
                  <div className="p-1 border-2 rounded-full border-[#1a1a1a]">
                    <UserRound />
                  </div>
                ) : (
                    <Image src={user.image} width={100} height={100} alt="user" className="rounded-full" />
                )}
              </div>

              <div className="flex flex-col">
                <span className="max-w-[200px]">{user?.name}</span>
                <span className="text-[0.8rem] max-w-[200px] text-gray-400">{user?.email}</span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />

            {dropDownData.map((item, index) => {
              return (
                <DropdownMenuItem className="flex gap-2" onClick={() => router.push("/profile")} key={index}>
                  <span>{item.icon}</span>
                  <span>{item.name}</span>
                </DropdownMenuItem>
              );
            })}
            <DropdownMenuSeparator />
            {user && (
              <DropdownMenuItem
                onClick={async () => {
                  await signOut();
                  router.push("/");
                }}
                className=" flex gap-2 focus:bg-[#f34e4e]"
              >
                <LogOut size={15} />
                Logout
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </>
  );
}