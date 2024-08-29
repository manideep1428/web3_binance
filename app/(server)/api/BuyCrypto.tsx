"use server";
import { prisma } from ".";

interface Props {
    crypto: string;
    amount: string;
}

export async function BuyCrypto(crypto: string, userId: string, amount: string) {
    try {
        const user = await prisma.user.findFirst({
            where: { id: userId },
        });
        if (!user) {
            return "User Not Found";
        }

        const amountNum = parseFloat(amount);
        if (isNaN(amountNum) || amountNum <= 0) {
            return "Invalid amount specified.";
        }

        const transaction = await prisma.$transaction(async (tx: any) => {
            const cryptoOrder = await tx.crypto.create({
                data: {
                    name: crypto,
                    buyAt: amount,
                    TimeBuyAt: Date.now().toString(),
                    TransactionFee: (amountNum / 0.02).toString(),
                },
            });
            await tx.order.create({
                data: {
                    amount,
                    status: "Buy",
                    userId: userId,
                    CryptoId: cryptoOrder.id,
                },
            });
        });
        return "Success";
    } catch (error) {
        return "Error";
    }
}
