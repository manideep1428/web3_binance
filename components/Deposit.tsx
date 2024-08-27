import { useState } from "react"

export default function Deposit(){
    return(
          <div className="w-full flex items-center justify-center h-screen bg-background">
            <div className="w-full max-w-md space-y-6">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
               <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </div>
            <div className="w-full max-w-md space-y-6">
                <div className="text-center">
                <h1 className="text-3xl font-bold tracking-tight">Make a Deposit</h1>
                <p className="mt-2 text-muted-htmlForeground">
                   {"Enter the amount you'd like to deposit and select your payment method."}
                </p>
                </div>
                <div className="rounded-lg border bg-card text-card-foreground shadow-sm" data-v0-t="card">
                <div className="p-6 space-y-4">
                    <div className="space-y-1.5">
                    <label
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        htmlFor="amount"
                    >
                        Amount
                    </label>
                    <input
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-htmlForeground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        id="amount"
                        placeholder="Enter USDC you want"
                        min="0"
                        step="0.01"
                        type="number"
                    />
                    </div>
                    <div>
                        {""}
                    </div>
                    <div className="space-y-1.5">
                    <label
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        htmlFor="payment-method"
                    >
                        Payment Method
                    </label>
                    <div>

                    </div>
                    </div>
                </div>
                <div className="items-center p-6 flex justify-end">
                    <button
                    className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-htmlForeground hover:bg-primary/90 h-10 px-4 py-2 dark:text-black"
                    type="submit"
                    >
                    Deposit
                    </button>
                </div>
                </div>
            </div>
            </div>
    )
}