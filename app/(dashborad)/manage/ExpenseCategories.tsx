"use client";

import { useQuery } from "@tanstack/react-query";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import SkeletonWrapper from "@/components/SkeletonWrapper";
import { TrendingDown } from "lucide-react";
import { Category } from "@prisma/client";

function ExpenseCategoryList() {
  const categoriesQuery = useQuery({
    queryKey: ["categories", "expense"],
    queryFn: () => fetch("/api/categories?type=expense").then((res) => res.json()),
  });

  return (
    <SkeletonWrapper isLoading={categoriesQuery.isLoading}>
      <Card>
        <CardHeader>
          <CardTitle>
            <div className="flex items-center gap-2">
              <TrendingDown className="h-12 w-12 rounded-lg bg-red-400/10 p-2 text-red-500" />
              Expense Categories
            </div>
          </CardTitle>
        </CardHeader>
        {categoriesQuery.data && categoriesQuery.data.length > 0 ? (
          categoriesQuery.data.map((category: Category) => (
            <div key={category.name}>{category.name}</div>
          ))
        ) : (
          <p>No categories available.</p>
        )}
      </Card>
    </SkeletonWrapper>
  );
}

export default ExpenseCategoryList;
