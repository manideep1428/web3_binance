"use client";
import { useEffect, useState } from "react";
import { getDepth, getKlines, getTicker, getTrades } from "../../app/utils/ServerProps";
import { BidTable } from "./BidTable";
import { AskTable } from "./AskTable";
import { SignalingManager } from "@/app/utils/SignalingManager";
import { removeZeroEntries } from "@/app/utils/Algorithms";

interface DepthProps {
  market: string;
}

interface DepthData {
  bids: [string, string][];
  asks: [string, string][];
}

export function Depth({ market }: DepthProps) {
  const [bids, setBids] = useState<[string, string][]>();
  const [asks, setAsks] = useState<[string, string][]>();
  const [price, setPrice] = useState<string>();

  useEffect(() => {
    const signalingManager = SignalingManager.getInstance();

    const depthCallback = (data: DepthData) => {
      setBids((originalBids) => {
        const bidsAfterUpdate = [...(originalBids || [])];

        for (let i = 0; i < bidsAfterUpdate.length; i++) {
          for (let j = 0; j < data.bids.length; j++) {
            if (bidsAfterUpdate[i][0] === data.bids[j][0]) {
              bidsAfterUpdate[i][1] = data.bids[j][1];
              break;
            }
          }
        }
        return bidsAfterUpdate;
      });

      setAsks((originalAsks) => {
        const asksAfterUpdate = [...(originalAsks || [])];

        for (let i = 0; i < asksAfterUpdate.length; i++) {
          for (let j = 0; j < data.asks.length; j++) {
            if (asksAfterUpdate[i][0] === data.asks[j][0]) {
              asksAfterUpdate[i][1] = data.asks[j][1];
              break;
            }
          }
        }
        const updatedAsks = removeZeroEntries(asksAfterUpdate);
        return updatedAsks;
      });
    };

    signalingManager.registerCallback("depth", depthCallback, `DEPTH-${market}`);
    signalingManager.sendMessage({ "method": "SUBSCRIBE", "params": [`depth.200ms.${market}`] });

    getDepth(market).then(d => {
      setBids(d.bids.reverse());
      setAsks(d.asks);
    });

    getTicker(market).then(t => setPrice(t.lastPrice));
    getTrades(market).then(t => setPrice(t[0].price));

    return () => {
      signalingManager.sendMessage({ "method": "UNSUBSCRIBE", "params": [`depth.${market}`] });
      signalingManager.deRegisterCallback("depth", `DEPTH-${market}`);
    };
  }, [market]);

  return (
    <div>
      <TableHeader />
      {asks && <AskTable asks={asks} />}
      {price && <div>{price}</div>}
      {bids && <BidTable bids={bids} />}
    </div>
  );
}

function TableHeader() {
  return (
    <div className="flex justify-between text-xs">
      <div className="text-white">Price</div>
      <div className="text-slate-500">Size</div>
      <div className="text-slate-500">Total</div>
    </div>
  );
}