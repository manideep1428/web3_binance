import { TableBody, TableCell, TableRow, Table } from "@/components/ui/table"
import Image from "next/image"
import { useRouter } from "next/navigation"

interface CryptoData {
  symbol: string
  current_price: string
  priceChangePercent: string
  volume: string
  marketCap: string
  image: string
  name: string
}

interface CryptoTableProps {
  data: CryptoData[]
}

export function CryptoTable({ data }: CryptoTableProps) {
  const router = useRouter()

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableBody>
          {data.map((crypto) => (
            <TableRow
              key={crypto.symbol}
              className="hover:cursor-pointer"
              onClick={() => router.push(`/trade/${crypto.symbol}usdt`)}
            >
              <TableCell className="font-medium flex items-center space-x-2">
                <Image src={crypto.image} alt={crypto.name} width={20} height={20} />
                <span className="hidden sm:inline">{crypto.name}</span>
                <span className="sm:hidden">{crypto.symbol.toUpperCase()}</span>
              </TableCell>
              <TableCell className="text-right">${crypto.current_price}</TableCell>
              <TableCell
                className={`text-right ${
                  crypto.priceChangePercent[0] === "-" ? "text-red-500" : "text-green-500"
                }`}
              >
                {crypto.priceChangePercent}%
              </TableCell>
              <TableCell className="text-right hidden md:table-cell">{crypto.marketCap}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}