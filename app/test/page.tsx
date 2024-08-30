"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { getCrypto } from "@/app/utils/ServerProps"
import { formatNumber } from "@/app/utils/Algorithms"
import useOnlineStatus from "@/hooks/onlineChecker"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"

type CryptoData = {
  id: string
  symbol: string
  name: string
  image: string
  current_price: number
  market_cap: number
  market_cap_change_24h: number
  price_change_percentage_24h: number
}

export default function CryptoDashboard() {
  const isOnline = useOnlineStatus()
  const [cryptoData, setCryptoData] = useState<CryptoData[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchAndUpdateCryptoData = async () => {
      if (!isOnline) return
      const data = await getCrypto()
      //@ts-ignore
      setCryptoData(data)
      setLoading(false)
    }

    fetchAndUpdateCryptoData()
    const interval = setInterval(fetchAndUpdateCryptoData, 10000)
    return () => clearInterval(interval)
  }, [isOnline])

  const handleRedirect = (symbol: string, imageUrl: string) => {
    localStorage.setItem("imageUrl", imageUrl)
    router.push(`/trade/${symbol.toUpperCase()}_USDC`)
  }

  if (!isOnline) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center text-2xl font-semibold">
            Sorry, you are not connected to the internet.
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <main className="container mx-auto p-4 min-h-screen">
      <Card className="w-full overflow-hidden">
        <CardContent className="p-6">
          {loading ? (
            <div className="space-y-6">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center space-x-6">
                  <Skeleton className="h-16 w-16 rounded-full" />
                  <div className="space-y-3 flex-1">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-6 sm:hidden">
                {cryptoData.map(crypto => (
                  <Card 
                    key={crypto.id}
                    onClick={() => handleRedirect(crypto.symbol, crypto.image)}
                    className="p-6 hover:bg-gray-200 dark:hover:bg-gray-800 transition duration-300 cursor-pointer"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <Image src={crypto.image} width={48} height={48} alt={crypto.name} className="rounded-full" />
                        <span className="text-2xl font-bold">{crypto.name}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-lg">
                        <div>Price: <span className="font-semibold">${crypto.current_price.toLocaleString()}</span></div>
                        <div>
                          24h Change: 
                          <span className={`font-semibold ${crypto.price_change_percentage_24h < 0 ? 'text-red-500' : 'text-green-500'}`}>
                            {crypto.price_change_percentage_24h > 0 ? '+' : ''}
                            {crypto.price_change_percentage_24h.toFixed(2)}%
                          </span>
                        </div>
                        <div>Market Cap: <span className="font-semibold">${formatNumber(crypto.market_cap)}</span></div>
                        <div>24h Volume: <span className="font-semibold">${formatNumber(crypto.market_cap_change_24h)}</span></div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="hidden sm:block overflow-x-auto">
                <Table className="w-full">
                  <TableHeader>
                    <TableRow className="hover:bg-white dark:hover:bg-gray-800 transition-colors duration-200">
                      <TableHead className="text-lg font-bold">Name</TableHead>
                      <TableHead className="text-lg font-bold">Price</TableHead>
                      <TableHead className="text-lg font-bold hidden md:table-cell">Market Cap</TableHead>
                      <TableHead className="text-lg font-bold hidden lg:table-cell">24h Volume</TableHead>
                      <TableHead className="text-lg font-bold">24h Change</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {cryptoData.map(crypto => (
                      <TableRow 
                        key={crypto.id} 
                        onClick={() => handleRedirect(crypto.symbol, crypto.image)}
                        className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
                      >
                        <TableCell className="py-4">
                          <div className="flex items-center gap-4">
                            <Image src={crypto.image} width={40} height={40} alt={crypto.name} className="rounded-full" />
                            <span className="text-xl font-semibold">{crypto.name}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-xl font-bold">${crypto.current_price.toLocaleString()}</TableCell>
                        <TableCell className="hidden md:table-cell text-lg">${formatNumber(crypto.market_cap)}</TableCell>
                        <TableCell className="hidden lg:table-cell text-lg">${formatNumber(crypto.market_cap_change_24h)}</TableCell>
                        <TableCell className="text-lg font-semibold">
                          <span className={crypto.price_change_percentage_24h < 0 ? 'text-red-500' : 'text-green-500'}>
                            {crypto.price_change_percentage_24h > 0 ? '+' : ''}
                            {crypto.price_change_percentage_24h.toFixed(2)}%
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </main>
  )
}