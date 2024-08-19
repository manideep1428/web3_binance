import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"

  interface AvatarProps {
    avatar: string
    username: string
  }
  
  export function GetAvatar({avatar, username}:AvatarProps) {
    return (
      <Avatar className="rounded-full">
        <AvatarImage src={avatar} alt={"Avatar"} />
        <AvatarFallback className="bg-green-700  text-white">{username.slice(0,1).toUpperCase()}</AvatarFallback>
      </Avatar>
    )
  }
  