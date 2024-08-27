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

  useEffect(() => {
    const updateChartDimensions = () => {
      if (window.innerWidth < 768) { // Adjust this breakpoint as needed
        setChartHeight("300px"); // Smaller height for mobile
      } else {
        setChartHeight("520px"); // Original height for desktop
      }
    };

    updateChartDimensions();
    window.addEventListener('resize', updateChartDimensions);

    return () => window.removeEventListener('resize', updateChartDimensions);
  }, []);

  useEffect(() => {
    const init = async () => {
      let klineData: KLine[] = [];
      try {
        klineData = await getKlines(market, "1h", Math.floor((new Date().getTime() - 1000 * 60 * 60 * 24 * 7) / 1000), Math.floor(new Date().getTime() / 1000)); 
      } catch (e) { 
        console.error("Failed to fetch kline data:", e);
      }

      if (chartRef.current) {
        if (chartManagerRef.current) {
          chartManagerRef.current.destroy();
        }

        const chartManager = new ChartManager(
          chartRef.current,
          [
            ...klineData?.map((x) => ({
              close: parseFloat(x.close),
              high: parseFloat(x.high),
              low: parseFloat(x.low),
              open: parseFloat(x.open),
              timestamp: new Date(x.end), 
            })),
          ].sort((x, y) => (x.timestamp < y.timestamp ? -1 : 1)) || [],
          {
            background: "#0e0f14",
            color: "white",
            // Add more responsive options here if ChartManager supports them
          }
        );

        chartManagerRef.current = chartManager;

        // Add resize handler for the chart
        const handleResize = () => {
          if (chartManagerRef.current) {
            chartManagerRef.current;
          }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
      }
    };

    init();
  }, [market]);

  return (
    <div 
      ref={chartRef} 
      style={{ 
        height: chartHeight, 
        width: "100%", 
        marginTop: 4,
        transition: "height 0.3s ease" // Smooth transition for height changes
      }}
    ></div>
  );
}