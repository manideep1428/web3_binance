"use client";

import { Depth } from "@/components/depth/Depth";
import { MarketBar } from "@/components/MarketBar";
import { OrderUI } from "@/components/OrderUI";
import { TradeView } from "@/components/TradeView";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
    const { market } = useParams();
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkIfMobile = () => {
            setIsMobile(window.innerWidth < 768); 
        };

        checkIfMobile();
        window.addEventListener('resize', checkIfMobile);

        return () => window.removeEventListener('resize', checkIfMobile);
    }, []);

    return (
        <div className="flex flex-col md:flex-row flex-1">
            <div className="flex flex-col flex-1">
                <MarketBar market={market as string} />
                <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} border-y border-slate-800`}>
                    <div className={`flex flex-col ${isMobile ? 'w-full' : 'flex-1'}`}>
                        <TradeView market={market as string} />
                    </div>
                    {!isMobile && (
                        <div className="flex flex-col w-[250px] overflow-hidden">
                            <Depth market={market as string} /> 
                        </div>
                    )}
                </div>
            </div>
            {!isMobile && <div className="w-[10px] flex-col border-slate-800 border-l"></div>}
            <div className={`${isMobile ? 'w-full' : 'w-[250px]'}`}>
                <OrderUI market={market as string} />
            </div>
        </div>
    );
}