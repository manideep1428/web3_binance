'use client'
import { SessionProvider } from 'next-auth/react'
import './globals.css'
import { Appbar } from '@/components/Appbar'
import DarkModeToggle from './DarkModeToggle'
import { ThemeProvider } from './themeProvider'
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
           {children}
           </ThemeProvider> 
          </SessionProvider>
        </body>
      </html>
  )
}