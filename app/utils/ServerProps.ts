import axios from "axios";
import { Depth, KLine, Trade } from "./types";

const BASE_URL = "https://api.backpack.exchange/api/v1";
const Market_URL = "https://price-indexer.workers.madlads.com/?ids=solana,usd-coin,pyth-network,jito-governance-token,tether,bonk,helium,helium-mobile,bitcoin,ethereum,dogwifcoin,jupiter-exchange-solana,parcl,render-token,sharky-fi,tensor,wormhole,wen-4,cat-in-a-dogs-world,book-of-meme,raydium,hivemapper,kamino,drift-protocol,nyan,jeo-boden,habibi-sol,io,zeta,mother-iggy,shuffle-2,pepe,shiba-inu,chainlink,uniswap,ondo-finance,holograph,starknet,matic-network,fantom,mon-protocol,blur,worldcoin-wld,polyhedra-network,unagi-token,layerzero"

export async function getTicker(market: string): Promise<any> {
    const tickers = await getTickers();
    const ticker = tickers.find(t => t.symbol === market);
    if (!ticker) {
        throw new Error(`No ticker found for ${market}`);
    }
    return ticker;
}

export async function getTickers(): Promise<any[]> {
    try {
        const response = await axios.get(`${BASE_URL}/tickers`);
       return response.data;
    } catch (error) {
        console.error("THIS IS THE ERROR : ", error);
        return [];
    }
}


export async function getDepth(market: string): Promise<Depth> {
    console.log("Req Came for this :" + market )
    const response = await axios.get(`${BASE_URL}/depth?symbol=${market}`);
    return response.data;
}
export async function getTrades(market: string): Promise<Trade[]> {
    const response = await axios.get(`${BASE_URL}/trades?symbol=${market}`);
    return response.data;
}

export async function getKlines(market: string, interval: string, startTime: number, endTime: number): Promise<KLine[]> {
    const response = await axios.get(`${BASE_URL}/klines?symbol=${market}&interval=${interval}&startTime=${startTime}&endTime=${endTime}`);
    const data: KLine[] = response.data;
    return data.sort((x, y) => (Number(x.end) < Number(y.end) ? -1 : 1));
}


export async function getCrypto(): Promise<string[]> {
   console.log("req came")
    const response = await axios.get(Market_URL);
    console.log(response.data);
    return response.data;
}