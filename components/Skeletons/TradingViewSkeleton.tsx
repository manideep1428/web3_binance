import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"

export function TradeViewChartSkeleton() {
  return (
    <div className="p-4">
      <Skeleton className="h-8 w-64 mb-4 bg-gray-200 dark:bg-gray-700" />
      <Tabs defaultValue="5m">
        <TabsList>
          <TabsTrigger value="5m">5m</TabsTrigger>
          <TabsTrigger value="30m">30m</TabsTrigger>
          <TabsTrigger value="1h">1h</TabsTrigger>
        </TabsList>
        <TabsContent value="5m">
          <Skeleton className="h-[400px] w-full bg-gray-200 dark:bg-gray-700" />
        </TabsContent>
        <TabsContent value="30m"></TabsContent>
        <TabsContent value="1h"></TabsContent>
      </Tabs>
    </div>
  )
}