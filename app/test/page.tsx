'use client'
import { signIn, signOut, useSession } from "next-auth/react"

export default function Login() {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return <div>Loading...</div>
  }

  if (session) {
    return (
      <div>
        Signed in as {session.user.email} <br/>
        <button onClick={() => signOut()}>Sign out</button>
      </div>
    )
  }
  return (
    <div>
      Not signed in <br/>
      <button onClick={() => signIn("google")}>Sign in with Google</button>
    </div>
  )
}