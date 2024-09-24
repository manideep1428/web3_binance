"use client"

import { Card, CardContent } from "@/components/ui/card"
import { ArrowUpIcon, ArrowDownIcon } from 'lucide-react'
import UseMarketWebsockets from "@/hooks/MarketWebsockets"
import { MarketBarSkeleton } from "./Skeletons/MarketBarSkeleton"

export function MarketBar({ market}: { market :  string }) {
  const { marketData, priceChangeColor } = UseMarketWebsockets(market)

  if (!marketData) {
    return <MarketBarSkeleton/>
  }

  return (
    <Card className="bg-gray-900 text-white p-4 overflow-hidden border-none rounded-none">
      <CardContent className="p-2">
        <div className="flex items-center space-x-4 overflow-x-auto whitespace-nowrap gap-2">
          <div className="flex-shrink-0 flex items-center space-x-2">
            <span className="text-sm font-medium">{market.toUpperCase()}</span>
            <span className={`text-lg font-bold ${priceChangeColor}`}>
              {parseFloat(marketData.c).toFixed(2)}
            </span>
          </div>
          <div className={`flex-shrink-0 flex items-center space-x-1 ${priceChangeColor}`}>
            {parseFloat(marketData.P) >= 0 ? (
              <ArrowUpIcon size={12} />
            ) : (
              <ArrowDownIcon size={12} />
            )}
            <span className="text-xs">{parseFloat(marketData.p).toFixed(2)}</span>
            <span className="text-xs">({parseFloat(marketData.P).toFixed(2)}%)</span>
          </div>
          <div className="flex-shrink-0 flex items-center space-x-4 text-xs">
            <div className="flex flex-col">
              <span className="text-gray-400">24h High</span>
              <span>{parseFloat(marketData.h).toFixed(2)}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-gray-400">24h Low</span>
              <span>{parseFloat(marketData.l).toFixed(2)}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-gray-400">24h Vol({market.slice(0, 3)})</span>
              <span>{parseFloat(marketData.v).toFixed(2)}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-gray-400">24h Vol({market.slice(3)})</span>
              <span>{(parseFloat(marketData.q) / 1000000).toFixed(2)}M</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
