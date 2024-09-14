'use client'

import { ChartManager } from "@/app/utils/ChartManager";
import { getKlines } from "@/app/utils/ServerProps";
import { KLine } from "@/app/utils/types";
import { useEffect, useRef, useState } from "react";

export function TradeView({
  market,
}: {
  market: string;
}) {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartManagerRef = useRef<ChartManager | null>(null);
  const [chartHeight, setChartHeight] = useState("520px");
  const [timeframe, setTimeframe] = useState("1h");

  useEffect(() => {
    const updateChartDimensions = () => {
      if (window.innerWidth < 768) { 
        setChartHeight("300px"); 
      } else {
        setChartHeight("520px");
      }
    };

    updateChartDimensions();
    window.addEventListener('resize', updateChartDimensions);

    return () => window.removeEventListener('resize', updateChartDimensions);
  }, []);

  const fetchKlineData = async (start: number, end: number, tf: string) => {
    try {
      return await getKlines(market, tf, start, end);
    } catch (e) {
      console.error("Failed to fetch kline data:", e);
      throw new Error("Failed to fetch kline data");
    }
  };

  const updateChart = async (start: number, end: number, tf: string) => {
    try {
      const klineData = await fetchKlineData(start, end, tf);
      if (chartManagerRef.current) {
        chartManagerRef.current.updateData(
          klineData.map((x: KLine) => ({
            close: parseFloat(x.close),
            high: parseFloat(x.high),
            low: parseFloat(x.low),
            open: parseFloat(x.open),
            timestamp: new Date(x.end),
          })).sort((x, y) => (x.timestamp < y.timestamp ? -1 : 1))
        );
      }
    } catch (error) {
      console.error("Error updating chart:", error);
    }
  };

  useEffect(() => {
    const init = async () => {
      const end = Math.floor(new Date().getTime() / 1000);
      const start = end - 60 * 60 * 24 * 7; // 7 days ago
      let klineData: KLine[] = [];

      try {
        klineData = await fetchKlineData(start, end, timeframe);
      } catch (error) {
        console.error("Error fetching initial kline data:", error);
        return;
      }

      if (chartRef.current) {
        if (chartManagerRef.current) {
          chartManagerRef.current.destroy();
        }

        const chartManager = new ChartManager(
          chartRef.current,
          klineData.map((x: KLine) => ({
            close: parseFloat(x.close),
            high: parseFloat(x.high),
            low: parseFloat(x.low),
            open: parseFloat(x.open),
            timestamp: new Date(x.end),
          })).sort((x, y) => (x.timestamp < y.timestamp ? -1 : 1)),
          {
            background: "#0e0f14",
            color: "white",
          }
        );

        chartManagerRef.current = chartManager;

        // Add event listeners for chart movements and zoom changes
        chartManager.on('update', () => {
          const visibleRange = chartManager.getVisibleRange();
          if (visibleRange) {
            const { from, to } = visibleRange;
            const range = to.getTime() - from.getTime();
            let newTimeframe = timeframe;

            // Adjust timeframe based on visible range
            if (range <= 1000 * 60 * 60) { // 1 hour or less
              newTimeframe = '1m';
            } else if (range <= 1000 * 60 * 60 * 24) { // 1 day or less
              newTimeframe = '15m';
            } else if (range <= 1000 * 60 * 60 * 24 * 7) { // 1 week or less
              newTimeframe = '1h';
            } else {
              newTimeframe = '1d';
            }

            if (newTimeframe !== timeframe) {
              setTimeframe(newTimeframe);
              updateChart(Math.floor(from.getTime() / 1000), Math.floor(to.getTime() / 1000), newTimeframe);
            }
          }
        });

        const handleResize = () => {
          if (chartManagerRef.current) {
            chartManagerRef.current.resize();
          }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
      }
    };

    init();
  }, [market, timeframe]);

  return(
    <div 
      ref={chartRef} 
      style={{ 
        height: chartHeight, 
        width: "100%", 
        marginTop: 4,
        transition: "height 0.3s ease" 
      }}
    ></div>
  )
}