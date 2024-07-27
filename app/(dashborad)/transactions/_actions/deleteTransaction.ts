"use server"
import { GetFormatterForCurrency } from "@/lib/helpers";
import { OverviewQuerySchema } from "@/lib/overview";
import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function DeleteTransaction(id: string) {
    const user = await currentUser();
    if (!user) {
        redirect("/sign-in");
    }


    const transactions = await prisma.transaction.findUnique({
        where: {
            userId: user.id,
            id,
        }
    })

    if (!transactions) {
        throw new Error("bad request")
    }

    await prisma.$transaction([
        // delete transaction from db
        prisma.transaction.delete({
            where: {
                id,
                userId: user.id
            }
        }),

        // update month history

        prisma.monthHistory.update({
            where: {
                day_month_year_userId: {
                    userId: user.id,
                    day: transactions.date.getUTCDate(),
                    month: transactions.date.getUTCMonth(),
                    year: transactions.date.getUTCFullYear(),
                }
            },
            data: {
                ...(transactions.type === "expense" && {
                    expense: {
                        decrement: transactions.amount
                    },
                }),
                ...(transactions.type === "income" && {
                    income: {
                        decrement: transactions.amount
                    },
                })
            }

        }),


        // update year history

        prisma.yearHistory.update({
            where: {
                month_year_userId: {
                    userId: user.id,
                    month: transactions.date.getUTCMonth(),
                    year: transactions.date.getUTCFullYear(),
                }
            },
            data: {
                ...(transactions.type === "expense" && {
                    expense: {
                        decrement: transactions.amount
                    },
                }),
                ...(transactions.type === "income" && {
                    income: {
                        decrement: transactions.amount
                    },
                })
            }

        })

    ])
}