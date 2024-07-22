export function  formatNumber(number: number): string {
    const thresholds: [number, string][] = [
        [1e12, 'T'],  
        [1e9, 'B'],   
        [1e6, 'M'],   
        [1e3, 'K'],   
    ];

    const isNegative = number < 0;
    number = Math.abs(number);


    for (const [threshold, suffix] of thresholds) {
        if (number >= threshold) {
            const value = number / threshold;
            const formattedNumber = `${value.toFixed(2)}${suffix}`;
            return isNegative ? `-${formattedNumber}` : formattedNumber;
        }
    }

    return isNegative ? `-${number.toFixed(2)}` : number.toFixed(2);
}

type AskBidArray = [string, string][];

export function removeZeroEntries(asks: AskBidArray) {
  const filteredAsks = asks.filter(entry => entry[1] !== "0.000");
  return filteredAsks
}

export function removeZeroAsks(ask:any){
    for (let i = 0; i < ask.length; i++) {
        if (ask[i][1] === "0.000") {
            ask.splice(i, 1);
            i--; // decrement i to account for the removed element
            console.log("ask removed" + ask )
            return ask
        }
    }
}