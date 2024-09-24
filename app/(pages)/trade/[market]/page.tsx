"use client";

import { useState, useEffect } from "react";
import useWebSocket from "react-use-websocket";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Ask } from "@/components/depth/AskTable";
import { Bid } from "@/components/depth/BidTable";
import { OrderUI } from "@/components/OrderUI";
import { useParams } from "next/navigation";
import { MarketBar } from "@/components/MarketBar";
import TradeViewChart from "@/components/TradeView";
import { Skeleton } from "@/components/ui/skeleton";
import { TradeViewChartSkeleton } from "@/components/Skeletons/TradingViewSkeleton";
import { AskSkeleton } from "@/components/Skeletons/AskBidSkeleton";
import useOnlineStatus from "@/hooks/onlineChecker";

type Order = [string, string];
type OrderBookUpdate = {
  e: string;
  E: number;
  s: string;
  U: number;
  u: number;
  b: Order[];
  a: Order[];
};

type OrderBookState = {
  bids: Map<string, string>;
  asks: Map<string, string>;
};

export default function Markets() {
  const { market } = useParams();
  const  isOnline  = useOnlineStatus();
  const [orderBook, setOrderBook] = useState<OrderBookState>({
    bids: new Map(),
    asks: new Map(),
  });
  const [isLoading, setIsLoading] = useState(true);
  const { lastJsonMessage, readyState } = useWebSocket(
    `wss://stream.binance.com:9443/ws/${market}@depth`
  );

  useEffect(() => {
    if (lastJsonMessage) {
      const update = lastJsonMessage as OrderBookUpdate;
      setIsLoading(false);
      setOrderBook((prevOrderBook) => {
        const newBids = new Map(prevOrderBook.bids);
        const newAsks = new Map(prevOrderBook.asks);

        update.b.forEach(([price, quantity]) => {
          if (parseFloat(quantity) === 0) {
            newBids.delete(price);
          } else {
            newBids.set(price, quantity);
          }
        });

        update.a.forEach(([price, quantity]) => {
          if (parseFloat(quantity) === 0) {
            newAsks.delete(price);
          } else {
            newAsks.set(price, quantity);
          }
        });

        return { bids: newBids, asks: newAsks };
      });
      setIsLoading(false);
    }
  }, [lastJsonMessage]);

  const LoadingSkeleton = () => (
    <div className="space-y-2">
      <Skeleton className="h-4 w-[250px]" />
      <Skeleton className="h-4 w-[200px]" />
    </div>
  );

  return (
    <div className="container mx-auto p-4">
      <MarketBar market={market as string} />
      <div className="flex gap-4">
        <Card className="mb-4 flex-1 w-[4/7] border-none">
          <div className="h-[400px]">
            {isLoading ? (
              <TradeViewChartSkeleton />
            ) : (
              <TradeViewChart market={market.toString()} />
            )}
          </div>
        </Card>

        <div className="hidden sm:flex flex-col md:grid-cols-2 gap-4">
          {isLoading ? <AskSkeleton /> : <Ask asks={orderBook.asks} />}
          {isLoading ? <AskSkeleton /> : <Bid bids={orderBook.bids} />}
        </div>

        <div className="flex h-full justify-items-end">
          {isLoading ? (
            <Skeleton className="h-[400px] w-[300px]" />
          ) : (
            <OrderUI market={market as string} />
          )}
        </div>
      </div>
    </div>
  );
}
