import { ChartManager } from "@/app/utils/ChartManager";
import { getKlines } from "@/app/utils/ServerProps";
import { KLine } from "@/app/utils/types";
import { error } from "console";
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

  useEffect(() => {
    const init = async () => {
      let klineData: KLine[] = [];
      try {
        klineData = await getKlines(market, "1h", Math.floor((new Date().getTime() - 1000 * 60 * 60 * 24 * 7) / 1000), Math.floor(new Date().getTime() / 1000)); 
      } catch (e) { 
        console.error("Failed to fetch kline data:", e)
        throw new Error("Failed to fetch kline data");
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
          }
        );

        chartManagerRef.current = chartManager;

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

  if(!chartRef.current){
    return (
      <div className="flex flex-col text-xl font-semibold text-red-500 justify-center items-center h-full">
        Uable to Connect to Web Socket ,    
         <div>
          <i>... Please Try Again  </i>
         </div>
      </div>
    )
  }
 
  return (
    <div 
      ref={chartRef} 
      style={{ 
        height: chartHeight, 
        width: "100%", 
        marginTop: 4,
        transition: "height 0.3s ease" 
      }}
    ></div>
  );
}