'use client'
import { SessionProvider } from 'next-auth/react'
import './globals.css'
import { Appbar } from '@/components/Appbar'
import { ThemeProvider } from './themeProvider'
import NextTopLoader from 'nextjs-toploader';
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <html lang="en">
        <body>
          <SessionProvider> 
            <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
            >
           <Appbar/> 
           <NextTopLoader/>
           {children}
           </ThemeProvider> 
          </SessionProvider>
        </body>
      </html>
  )
}