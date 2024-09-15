'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"

export default function SignUp() {
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const { register, handleSubmit, formState: { errors } } = useForm()

  const onSubmit = async (data: any) => {
    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })

    const result = await response.json()

    if (response.ok) {
      const signInResult = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      })

      if (signInResult?.error) {
        setError(signInResult.error)
      } else {
        router.push('/') 
      }
    } else {
      setError(result.message)
    }
  }

  return (
    <Card className="w-[350px] mx-auto mt-10">
      <CardHeader>
        <CardTitle>Sign Up</CardTitle>
        <CardDescription>Create a new account</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input id="name" {...register('name', { required: 'Name is required' })} />
              {errors.name && <span className="text-red-500">{errors.name.message as string}</span>}
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" {...register('email', { required: 'Email is required' })} />
              {errors.email && <span className="text-red-500">{errors.email.message as string}</span>}
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" {...register('password', { required: 'Password is required' })} />
              {errors.password && <span className="text-red-500">{errors.password.message as string}</span>}
            </div>
          </div>
          {error && <p className="text-red-500 mt-4">{error}</p>}
          <Button className="w-full mt-4" type="submit">Sign Up</Button>
        </form>
      </CardContent>
      <CardFooter>
        <p className="text-sm text-center w-full">
          Already have an account? <a href="/auth/signin" className="text-blue-500 hover:underline">Sign In</a>
        </p>
      </CardFooter>
    </Card>
  )
}