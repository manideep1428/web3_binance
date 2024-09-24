import  zod  from "zod"

export interface KLine {
    close: string;
    end: string;
    high: string;
    low: string;
    open: string;
    quoteVolume: string;
    start: string;
    trades: string;
    volume: string;
}

export interface Trade {
    "id": number,
    "isBuyerMaker": boolean,
    "price": string,
    "quantity": string,
    "quoteQuantity": string,
    "timestamp": number
}

export interface Depth {
    bids: [string, string][],
    asks: [string, string][],
    lastUpdateId: string
}

export interface TickerProps {
    "firstPrice": string,
    "high": string,
    "lastPrice": string,
    "low": string,
    "priceChange": string,
    "priceChangePercent": string,
    "quoteVolume": string,
    "symbol": string,
    "trades": string,
    "volume": string
}

export const orderVefication = zod.object({
    amount: zod.number(),
    name : zod.string(),
  })

export interface SellProps {
    crypto:string
    amount : string
    soldAt :string
    userId : string
}

export interface AuthProps{
    username:string,
    password:string
}


export interface TickerProps {
    symbol: string;
    lastPrice: string;
    high: string;
    low: string;
    volume: string;
    quoteVolume: string;
    priceChange: string;
    priceChangePercent: string;
}

export interface DepthProps {
    bids: [string, string][];
    asks: [string, string][];
}

export interface KlineProps {
    openTime: number;
    open: string;
    high: string;
    low: string;
    close: string;
    volume: string;
    closeTime: number;
}