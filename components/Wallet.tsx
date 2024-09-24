import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";

export default async function OrderDetails() {
  const session = await getServerSession();

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const cryptoData = await prisma.user.findFirst({
    where: {
        //@ts-ignore
      email: session?.user?.email
    },
    include:{
      crypto: true,
      order:true
    }
  });
  console.log(cryptoData)
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-8 p-4 sm:p-6">
        <div className="bg-background rounded-lg shadow-sm">
          <div className="px-6 py-4 border-b">
            <h2 className="text-lg font-semibold">Order History</h2>
          </div>
          <div className="p-4 sm:p-6"></div>
        </div>
        <div className="bg-background rounded-lg shadow-sm">
          <div className="px-6 py-4 border-b">
            <h2 className="text-lg font-semibold">Current Balance</h2>
          </div>
          <div className="p-4 sm:p-6">
            <div className="grid gap-4">
              <div className="grid grid-cols-[auto_1fr] items-center gap-4">
                <div className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="w-6 h-6 text-primary"
                  >
                    <path d="M11.767 19.089c4.924.868 6.14-6.025 1.216-6.894m-1.216 6.894L5.86 18.047m5.908 1.042-.347 1.97m1.563-8.864c4.924.869 6.14-6.025 1.215-6.893m-1.215 6.893-3.94-.694m5.155-6.2L8.29 4.26m5.908 1.042.348-1.97M7.48 20.364l3.126-17.727"></path>
                  </svg>
                  <span className="font-medium">Bitcoin (BTC)</span>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-semibold">0.25</div>
                  <div className="text-sm text-muted-foreground">
                    $7,500 (at $30,000 per BTC)
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-[auto_1fr] items-center gap-4">
                <div className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="w-6 h-6 text-primary"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M12 2a7 7 0 1 0 10 10"></path>
                  </svg>
                  <span className="font-medium">Ethereum</span>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-semibold">1.5</div>
                  <div className="text-sm text-muted-foreground">
                    $3,000 (at $2,000 per ETH)
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-[auto_1fr] items-center gap-4">
                <div className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="w-6 h-6 text-primary"
                  >
                    <path d="M10 5.172C10 3.782 8.423 2.679 6.5 3c-2.823.47-4.113 6.006-4 7 .08.703 1.725 1.722 3.656 1 1.261-.472 1.96-1.45 2.344-2.5"></path>
                    <path d="M14.267 5.172c0-1.39 1.577-2.493 3.5-2.172 2.823.47 4.113 6.006 4 7-.08.703-1.725 1.722-3.656 1-1.261-.472-1.855-1.45-2.239-2.5"></path>
                    <path d="M8 14v.5"></path>
                    <path d="M16 14v.5"></path>
                    <path d="M11.25 16.25h1.5L12 17l-.75-.75Z"></path>
                    <path d="M4.42 11.247A13.152 13.152 0 0 0 4 14.556C4 18.728 7.582 21 12 21s8-2.272 8-6.444c0-1.061-.162-2.2-.493-3.309m-9.243-6.082A8.801 8.801 0 0 1 12 5c.78 0 1.5.108 2.161.306"></path>
                  </svg>
                  <span className="font-medium">Dogeco</span>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-semibold">5,000</div>
                  <div className="text-sm text-muted-foreground">
                    $500 (at $0.10 per DOGE)
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-[auto_1fr] items-center gap-4">
                <div className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="w-6 h-6 text-primary"
                  >
                    <path d="M11.767 19.089c4.924.868 6.14-6.025 1.216-6.894m-1.216 6.894L5.86 18.047m5.908 1.042-.347 1.97m1.563-8.864c4.924.869 6.14-6.025 1.215-6.893m-1.215 6.893-3.94-.694m5.155-6.2L8.29 4.26m5.908 1.042.348-1.97M7.48 20.364l3.126-17.727"></path>
                  </svg>
                  <span className="font-medium">Litecoin (LTC)</span>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-semibold">0.5</div>
                  <div className="text-sm text-muted-foreground">
                    $100 (at $200 per LTC)
                  </div>
                </div>
              </div>
              <div
                data-orientation="horizontal"
                role="none"
                className="shrink-0 bg-border h-[1px] w-full"
              ></div>
              <div className="grid grid-cols-[auto_1fr] items-center gap-4">
                <div className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="w-6 h-6 text-primary"
                  >
                    <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"></path>
                    <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
