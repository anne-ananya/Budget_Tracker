"use client";

import { CurrencyComboBox } from "@/components/CurrencyComboBox";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import IncomeCategoryList from "./IncomeCategories";
import ExpenseCategoryList from "./ExpenseCategories";
function Page() {
  return (
    <main>
      {/* HEADER */}
      <div className="border-b bg-card">
        <div className="container flex flex-wrap items-center justify-between gap-6 py-8">
          <div>
            <p className="text-3xl font-bold">Manage</p>
            <p className="text-muted-foreground">
              Manage your account settings
            </p>
          </div>
        </div>
      </div>
      {/* END HEADER */}
      <div className="container flex flex-col gap-4 p-4">
        <Card>
          <CardHeader>
            <CardTitle>Currency</CardTitle>
            <CardDescription>
              Set your default currency for transactions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CurrencyComboBox />
          </CardContent>
        </Card>
        <IncomeCategoryList />
        <ExpenseCategoryList />
      </div>
    </main>
  );
}

export default Page;
