import { Table, TableCell, TableHead, TableHeader, TableRow, TableBody } from "@/components/ui/table"

interface AskOrder {
  price: string;
  quantity: string;
}

interface AskProps {
  asks: Map<string, string>;
}

export function Ask({ asks }: AskProps) {
  const sortedAsks = Array.from(asks.entries())
    .sort((a, b) => parseFloat(b[0]) - parseFloat(a[0]))
    .slice(0, 7)
    .map(([price, quantity]): AskOrder => ({ price, quantity }));

  const maxQuantity = Math.max(...sortedAsks.map(ask => parseFloat(ask.quantity)));

  return (
    <Table className="w-full text-center  border-none dark:border-gray-700 ">
      <TableHeader>
        <TableRow>
          <TableHead className="text-center">Price</TableHead>
          <TableHead className="text-center">Quantity</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sortedAsks.map((ask) => (
          <TableRow key={ask.price} className="relative border-none">
            <TableCell className="text-red-500">{parseFloat(ask.price).toFixed(2)}</TableCell>
            <TableCell>{parseFloat(ask.quantity).toFixed(4)}</TableCell>
            <div 
              className="absolute top-0 left-0 h-full bg-red-200 dark:bg-red-800 opacity-25 transition-all duration-300 ease-in-out"
              style={{ width: `${Math.min((parseFloat(ask.quantity) / maxQuantity) * 100, 100)}%` }}
              aria-hidden="true"
            />
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}