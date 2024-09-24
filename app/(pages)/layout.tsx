import { Appbar } from '@/components/Appbar'
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
      <html lang="en">
        <body>
        <Appbar/> 
        {children}
        </body>
      </html>
  )
}