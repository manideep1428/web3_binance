"use client"

import { useEffect, useState, createContext, useContext } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { getCrypto } from "@/app/utils/ServerProps"
import { formatNumber } from "@/app/utils/Algorithms"
import useOnlineStatus from "@/hooks/onlineChecker"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"
import { ArrowUpDown } from "lucide-react"

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

const CryptoContext = createContext<{ cryptoData: CryptoData[], setCryptoData: React.Dispatch<React.SetStateAction<CryptoData[]>> } | null>(null)

export default function CryptoDashboard() {
  const isOnline = useOnlineStatus()
  const [cryptoData, setCryptoData] = useState<CryptoData[]>([])
  const [loading, setLoading] = useState(true)
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const router = useRouter()

  useEffect(() => {
    const fetchAndUpdateCryptoData = async () => {
      if (!isOnline) return
      const data = await getCrypto()
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

  const handleSort = () => {
    const newOrder = sortOrder === 'asc' ? 'desc' : 'asc'
    setSortOrder(newOrder)
    const sortedData = [...cryptoData].sort((a, b) => {
      return newOrder === 'asc' 
        ? a.price_change_percentage_24h - b.price_change_percentage_24h
        : b.price_change_percentage_24h - a.price_change_percentage_24h
    })
    setCryptoData(sortedData)
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
    <CryptoContext.Provider value={{ cryptoData, setCryptoData }}>
      <main className="container mx-auto p-4 min-h-screen">
        <Card className="w-full overflow-hidden bg-gray-100 dark:bg-black">
          <CardContent className="p-6">
            {loading ? (
              <div className="space-y-6">
                {[...Array(10)].map((_, i) => (
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
              <div className="overflow-x-auto">
                <Table className="w-full">
                  <TableHeader>
                    <TableRow className="hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200">
                      <TableHead className="text-lg font-bold">Name</TableHead>
                      <TableHead className="text-lg font-bold">Price</TableHead>
                      <TableHead className="text-lg font-bold hidden md:table-cell">Market Cap</TableHead>
                      <TableHead 
                        className="text-lg font-bold cursor-pointer"
                        onClick={handleSort}
                      >
                        24h Change
                        <ArrowUpDown className="ml-2 h-4 w-4 inline" />
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {cryptoData.map(crypto => (
                      <TableRow 
                        key={crypto.id} 
                        onClick={() => handleRedirect(crypto.symbol, crypto.image)}
                        className="cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
                      >
                        <TableCell className="py-4 px-2 bottom-none">
                          <div className="flex items-center gap-2">
                            <Image src={crypto.image} width={40} height={40} alt={crypto.name} className="rounded-full" />
                            <span className="text-xl font-semibold">{crypto.name}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-xl font-bold">${crypto.current_price.toLocaleString()}</TableCell>
                        <TableCell className="hidden md:table-cell text-lg">${formatNumber(crypto.market_cap)}</TableCell>
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
            )}
          </CardContent>
        </Card>
      </main>
    </CryptoContext.Provider>
  )
}