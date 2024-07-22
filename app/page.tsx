'use client'

import { useEffect, useState } from "react";
import { getCrypto } from "./utils/ServerProps";
import { formatNumber } from "./utils/Algorithms";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const [cryptoData, setCryptoData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const fetchAndUpdateCryptoData = async () => {
      const data = await getCrypto();
      setCryptoData((prevData) => {
        const updatedData = data.map(newItem => {
          //@ts-ignore
          const existingItem = prevData.find(item => item.id === newItem.id);
          return existingItem ? { ...existingItem, newItem } : newItem;
        });
        console.log(...updatedData);
        setLoading(false);
        return [...updatedData];
      });
    };

    fetchAndUpdateCryptoData();
    // const interval = setInterval(fetchAndUpdateCryptoData, 5000);
    // return () => clearInterval(interval);
  }, []);

  const handleRedirect = (id: string, imageUrl: string) => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("imageUrl", imageUrl);
    }
    router.push(`/trade/${id.toString().toUpperCase()}_USDC`);
  };

  return (
    <main className="flex min-h-screen bg-black text-white flex-col items-center justify-between">
      <div className="w-full overflow-x-auto shadow-md sm:rounded-lg">
        {loading ? (
          <div className="flex justify-center items-center text-xl">
                           ...  Loading
            </div>
        ) : (
          <table className="w-full text-sm text-left rtl:text-right">
            <thead className="text-xl font-semibold bg-gray-800 uppercase">
              <tr>
                <th scope="col" className="px-6 py-4">Name</th>
                <th scope="col" className="px-6 py-4">Price</th>
                <th scope="col" className="hidden md:table-cell px-6 py-4">Market Cap</th>
                <th scope="col" className="hidden sm:table-cell px-6 py-4">24 Volume</th>
                <th scope="col" className="px-6 py-4">24h Change</th>
              </tr>
            </thead>
            <tbody>
              {cryptoData.map(eachCrypto => (
                <tr key={eachCrypto.id} onClick={() => handleRedirect(eachCrypto.symbol, eachCrypto.image)}
                  className="border-b border-gray-700 hover:cursor-pointer hover:bg-gray-600 transition-colors duration-200">
                  <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <Image src={eachCrypto.image} width={30} height={30} alt={eachCrypto.name} />
                      {eachCrypto.name}
                    </div>
                  </th>
                  <td className="px-6 py-4 text-xl font-semibold">
                    $ {eachCrypto.current_price}
                  </td>
                  <td className="hidden md:table-cell px-6 py-4 text-xl font-semibold">
                    ${formatNumber(eachCrypto.market_cap)}
                  </td>
                  <td className="hidden sm:table-cell px-6 py-4 text-xl font-semibold">
                    {formatNumber(eachCrypto.market_cap_change_24h)}
                  </td>
                  <td className="px-6 py-4 text-xl font-semibold">
                    {eachCrypto.price_change_percentage_24h.toString()[0] === "-" ? (
                      <span className="text-red-500">{eachCrypto.price_change_percentage_24h.toString().slice(0, 5)}%</span>
                    ) : (
                      <span className="text-green-500">+{eachCrypto.price_change_percentage_24h.toString().slice(0, 4)}%</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </main>
  );
}