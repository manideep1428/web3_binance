import { MarketData } from "@/lib/types";
import React, { useEffect, useState } from "react";

export default function UseMarketWebsockets(market:string) {
  const [marketData, setMarketData] = useState<MarketData | null>(null);
  const [priceChangeColor, setPriceChangeColor] = useState<
    "text-green-500" | "text-red-500"
  >("text-green-500");

  useEffect(() => {
    const ws = new WebSocket(
      `wss://stream.binance.com:9443/ws/${market}@ticker`
    );

    ws.onmessage = (event) => {
      const data: MarketData = JSON.parse(event.data);
      setMarketData(data);
      setPriceChangeColor(
        parseFloat(data.P) >= 0 ? "text-green-500" : "text-red-500"
      );
    };

    return () => ws.close();
  }, [market]);

  return { marketData , priceChangeColor  }
}
