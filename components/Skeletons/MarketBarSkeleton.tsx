import { Card, CardContent } from "../ui/card";

export function MarketBarSkeleton() {
  return (
    <Card className="bg-gray-900 text-white overflow-hidden border-none p-4 rounded-none">
      <CardContent className="p-2">
        <div className="flex items-center space-x-4 overflow-x-auto whitespace-nowrap">
          <div className="flex-shrink-0 flex items-center space-x-2">
            <div className="h-4 w-16 bg-gray-700 rounded animate-pulse"></div>
            <div className="h-6 w-20 bg-gray-700 rounded animate-pulse"></div>
          </div>
          <div className="flex-shrink-0 flex items-center space-x-1">
            <div className="h-4 w-12 bg-gray-700 rounded animate-pulse"></div>
            <div className="h-4 w-16 bg-gray-700 rounded animate-pulse"></div>
          </div>
          <div className="flex-shrink-0 flex items-center space-x-4">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="flex flex-col space-y-1">
                <div className="h-3 w-14 bg-gray-700 rounded animate-pulse"></div>
                <div className="h-4 w-14 bg-gray-700 rounded animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}