import { Table, TableCell, TableRow, TableBody } from "@/components/ui/table"

interface BidProps {
  bids: Map<string, string>;
}

export function Bid({ bids }: BidProps) {
  const sortedBids = Array.from(bids.entries())
    .sort((a, b) => parseFloat(b[0]) - parseFloat(a[0]))
    .slice(0, 7);

  const maxQuantity = Math.max(...sortedBids.map(([_, quantity]) => parseFloat(quantity)));

  return (
    <Table className="w-full max-w-xs mx-auto text-sm">
      <TableBody className="border border-none rounded-sm">
        {sortedBids.map(([price, quantity]) => (
          <TableRow key={price} className="relative border-none">
            <TableCell className="py-1 px-2 text-right text-green-500">
              {parseFloat(price).toFixed(2)}
            </TableCell>
            <TableCell className="py-1 px-2 text-right">
              {parseFloat(quantity).toFixed(4)}
            </TableCell>
            <div 
              className="absolute top-0 left-0 h-full bg-green-100 dark:bg-green-900 opacity-25 transition-all duration-300 ease-in-out"
              style={{ width: `${(parseFloat(quantity) / maxQuantity) * 100}%` }}
              aria-hidden="true"
            />
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}