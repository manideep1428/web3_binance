"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  createChart,
  ColorType,
  IChartApi,
  ISeriesApi,
  UTCTimestamp,
  CandlestickData,
} from "lightweight-charts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type TimeframeKey = "5m" | "30m" | "1h";

const timeframes: Record<TimeframeKey, number> = {
  "5m": 5,
  "30m": 30,
  "1h": 60,
};

interface TradeViewChartProps {
  market: string;
}

export default function TradeViewChart({ market }: TradeViewChartProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const candlestickSeriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const [timeframe, setTimeframe] = useState<TimeframeKey>("5m");
  const [coinId, setCoinId] = useState<string>("bitcoin");

  useEffect(() => {
    if (chartContainerRef.current) {
      const chart = createChart(chartContainerRef.current, {
        width: chartContainerRef.current.clientWidth,
        height: 400,
        layout: {
          background: { type: ColorType.Solid, color: "white" },
          textColor: "black",
        },
        grid: {
          vertLines: { color: "#e0e0e0" },
          horzLines: { color: "#e0e0e0" },
        },
      });

      chartRef.current = chart;

      const candlestickSeries = chart.addCandlestickSeries();
      candlestickSeriesRef.current = candlestickSeries;

      const handleResize = () => {
        chart.applyOptions({ width: chartContainerRef.current!.clientWidth });
      };

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
        chart.remove();
      };
    }
  }, []);

  const fetchHistoricalData = useCallback(async () => {
    const days = 30; // Fetch 30 days of data
    const url = `https://api.coingecko.com/api/v3/coins/${coinId}/ohlc?vs_currency=usd&days=${days}`;

    try {
      const response = await fetch(url);
      const data: number[][] = await response.json();
      const candlesticks: CandlestickData[] = data
        .filter((d) => d[0] % (timeframes[timeframe] * 60 * 1000) === 0)
        .map((d) => ({
          time: (d[0] / 1000) as UTCTimestamp,
          open: d[1],
          high: d[2],
          low: d[3],
          close: d[4],
        }));
      candlestickSeriesRef.current?.setData(candlesticks);
    } catch (error) {
      console.error("Error fetching historical data:", error);
    }
  }, [coinId, timeframe]);

  const setupWebSocket = useCallback(() => {
    if (wsRef.current) {
      wsRef.current.close();
    }

    const wsUrl = `wss://stream.binance.com:9443/ws/${coinId}usdt@kline_${timeframe}`;
    const ws = new WebSocket(wsUrl);

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.k) {
        const { t, o, h, l, c } = data.k;
        const newCandle: CandlestickData = {
          time: (t / 1000) as UTCTimestamp,
          open: parseFloat(o),
          high: parseFloat(h),
          low: parseFloat(l),
          close: parseFloat(c),
        };
        candlestickSeriesRef.current?.update(newCandle);
      }
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    wsRef.current = ws;
  }, [coinId, timeframe]);

  useEffect(() => {
    fetchHistoricalData();
    setupWebSocket();

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [fetchHistoricalData, setupWebSocket]);

  const fetchMoreHistoricalData = useCallback(
    async (endTime: number) => {
      const days = 30;
      const url = `https://api.coingecko.com/api/v3/coins/${coinId}/ohlc?vs_currency=usd&days=${days}&end_date=${endTime}`;

      try {
        const response = await fetch(url);
        const data: number[][] = await response.json();
        const candlesticks: CandlestickData[] = data
          .filter((d) => d[0] % (timeframes[timeframe] * 60 * 1000) === 0)
          .map((d) => ({
            time: (d[0] / 1000) as UTCTimestamp,
            open: d[1],
            high: d[2],
            low: d[3],
            close: d[4],
          }));
        const currentData =
          candlestickSeriesRef.current?.data() as CandlestickData[];
        candlestickSeriesRef.current?.setData([
          ...candlesticks,
          ...currentData,
        ]);
      } catch (error) {
        console.error("Error fetching more historical data:", error);
      }
    },
    [coinId, timeframe]
  );

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.timeScale().subscribeVisibleLogicalRangeChange(() => {
        const logicalRange = chartRef.current
          ?.timeScale()
          .getVisibleLogicalRange();
        if (logicalRange && logicalRange.from < 10) {
          const firstCandle = candlestickSeriesRef.current?.dataByIndex(0, 1);
          if (firstCandle) {
            const endTime = firstCandle.time as number;
            fetchMoreHistoricalData(endTime);
          }
        }
      });
    }
  }, [timeframe, fetchMoreHistoricalData, coinId]);

  const handleTimeframeChange = (newTimeframe: TimeframeKey) => {
    setTimeframe(newTimeframe);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Crypto Candlestick Chart</h1>
      <Tabs
        defaultValue={timeframe}
        onValueChange={(value) => handleTimeframeChange(value as TimeframeKey)}
      >
        <TabsList>
          <TabsTrigger value="5m">5m</TabsTrigger>
          <TabsTrigger value="30m">30m</TabsTrigger>
          <TabsTrigger value="1h">1h</TabsTrigger>
        </TabsList>
        <TabsContent value="5m"></TabsContent>
        <TabsContent value="30m"></TabsContent>
        <TabsContent value="1h"></TabsContent>
      </Tabs>
      <div ref={chartContainerRef} className="mt-4" />
    </div>
  );
}
