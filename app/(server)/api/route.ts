import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json()
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return NextResponse.json({ message: 'User already exists' }, { status: 400 })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    })

    return NextResponse.json({ message: 'User created successfully', user: { id: user.id, name: user.name, email: user.email } }, { status: 201 })
  } catch (error) {
    console.error('Error in signup:', error)
    return NextResponse.json({ message: 'An error occurred during signup' }, { status: 500 })
  }
}