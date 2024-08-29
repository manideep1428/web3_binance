"use server";
import { SellProps } from "@/app/utils/types";
import { prisma } from ".";

export async function sellcrypto({ crypto, amount, soldAt, userId }: SellProps) {
    const user = await prisma.user.findFirst({
        where: {
            id: userId,
        },
    });

    if (!user) {
        return "User Not Found";
    }

    const userCrypto = await prisma.crypto.findFirst({
        where: {
            userId,
            name: crypto,
        },
    });

    if (!userCrypto) {
        return "Crypto Not Found";
    }

    const cryptoAmount = parseFloat(userCrypto.amount!); 
    const amountNum = parseFloat(amount!);

    if (cryptoAmount < amountNum) {
        return "Insufficient crypto amount to sell.";
    }

    await prisma.$transaction(async (tx) => {
        await tx.crypto.update({
            where: {
                id: userCrypto.id,
            },
            data: {
                amount: (cryptoAmount - amountNum).toString(),
                SoldAt: soldAt
            },
        });

        await tx.order.create({
            data: {
                userId: userId,
                CryptoId: userCrypto.id,
                amount: amountNum.toString(),
                status:"Sell"
            },
        });
    });

    return "Done";
}
