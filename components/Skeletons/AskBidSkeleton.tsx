import { Table, TableCell, TableHead, TableHeader, TableRow, TableBody } from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"

export function AskSkeleton() {
  return (
    <Table className="w-full text-center border-2 border-gray-200 dark:border-gray-700 rounded-lg">
      <TableHeader>
        <TableRow>
          <TableHead className="text-center">Price</TableHead>
          <TableHead className="text-center">Quantity</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {[...Array(6)].map((_, index) => (
          <TableRow key={index} className="relative">
            <TableCell>
              <Skeleton className="h-4 w-20 bg-gray-200 dark:bg-gray-700" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-24 bg-gray-200 dark:bg-gray-700" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}