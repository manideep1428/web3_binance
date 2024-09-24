"use server";

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";

export async function sellCrypto(crypto: string, amount: string) {
  const session = await getServerSession();
  if (!session?.user?.email) return "Not LoggedIn";

  const user = await prisma.user.findFirst({
    where: {
      email: session?.user?.email,
    },
  });

  if (!user) {
    return "User Not Found";
  }
  const userCrypto = await prisma.crypto.findFirst({
    where: {
        //@ts-ignore
      email: session.user?.email,
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
        soldAt: Date.now().toString(),
      },
    });

    await tx.order.create({
      data: {
        //@ts-ignore
        userId: session?.user?.email,
        cryptoId: userCrypto.id,
        amount: amountNum.toString(),
        status: "Sell",
      },
    });
  });

  return "Done";
}
