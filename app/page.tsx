'use client'

import { Button } from "@/components/ui/button"
import { ArrowRight, Bitcoin, DollarSign, LineChart, Lock, Zap } from "lucide-react"
import { signIn } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function CryptoLanding() {
  const router = useRouter();
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <header className="px-4 lg:px-6 h-14 flex items-center border-b border-gray-200 dark:border-gray-800">
        <Link className="flex items-center justify-center" href="#">
          <Bitcoin className="h-6 w-6 text-yellow-500" />
          <span className="ml-2 font-bold">WebCrypto.ai</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Features
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Pricing
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            About
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Contact
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-black text-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Welcome to WebCrypto.ai
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-400 md:text-xl">
                  Your gateway to learn cryptocurre ncies. Trade, invest, and grow your digital assets with help of ai.
                </p>
              </div>
              <div className="space-x-4">
                <Button  onClick={()=>signIn('google')} className="bg-yellow-500 text-black hover:bg-yellow-600">Get Started</Button>
                <Button variant="outline" className="text-black border-white hover:bg-white hover:text-black">Learn More</Button>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Our Features</h2>
            <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col items-center space-y-4 text-center">
                <LineChart className="h-12 w-12 text-yellow-500" />
                <h3 className="text-xl font-bold">Real-time Trading</h3>
                <p className="text-gray-500 dark:text-gray-400">Execute trades instantly with our advanced trading engine.</p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <Lock className="h-12 w-12 text-yellow-500" />
                <h3 className="text-xl font-bold">Secure Storage</h3>
                <p className="text-gray-500 dark:text-gray-400">Your assets are protected with state-of-the-art security measures.</p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <Zap className="h-12 w-12 text-yellow-500" />
                <h3 className="text-xl font-bold">Lightning Fast</h3>
                <p className="text-gray-500 dark:text-gray-400">Experience rapid transactions and minimal latency.</p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Start Your Crypto Journey</h2>
                <p className="text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join thousands of traders and investors who trust CryptoHub for their cryptocurrency needs. Get started in minutes.
                </p>
              </div>
              <div className="flex flex-col space-y-4">
                <Button onClick={()=>signIn('google')} className="bg-yellow-500 text-black hover:bg-yellow-600 max-w-lg">
                  Create Account
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-gray-200 dark:border-gray-800">
        <p className="text-xs text-gray-500 dark:text-gray-400">© 2024 WebCrypto.ai. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}