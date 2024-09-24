"use server";
import { getServerSession } from "next-auth";
import { prisma } from ".";

export async function BuyCrypto(crypto: string, amount: string) {
  console.log("Buy Server");
  const session = await getServerSession();
  const emailId = session?.user?.email;
  try {
    const user = await prisma.user.findFirst({
      //@ts-ignore
      where: { email: emailId },
    });
    if (!user) {
      return new Error("User Not Found");
    }
    console.log(user);
    const amountNum = parseFloat(amount);
    if (isNaN(amountNum) || amountNum <= 0) {
      return new Error("Invalid amount specified.");
    }

    const transaction = await prisma.$transaction(async (tx: any) => {
      const cryptoOrder = await tx.crypto.create({
        data: {
          name: crypto,
          buyAt: amount,
          TimeBuyAt: Date.now().toString(),
          TransactionFee: (amountNum / 0.2).toString(),
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
    console.log(transaction);
    return "Success";
  } catch (error) {
    console.log(error);
    return new Error("Error Occured ,Try Again");
  }
}
