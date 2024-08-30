"use server";
import { getServerSession } from "next-auth";
import { prisma } from ".";

interface Props {
    crypto: string;
    amount: string;
}


export async function BuyCrypto(crypto: string, amount: string) {
    const session  = await getServerSession()
    const emailId =  session?.user?.email
    try {
        const user = await prisma.user.findFirst({
            //@ts-ignore
            where: { email: emailId },
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
                    userId: user.id,
                    CryptoId: cryptoOrder.id,
                },
            });
        });
        return "Success";
    } catch (error) {
        return "Error";
    }
}
