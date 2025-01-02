import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import SkeletonWrapper from "@/components/SkeletonWrapper";
import { TrendingUp } from "lucide-react";
import { Category } from "@prisma/client";
import CreateCategory from "./CreateCategory";
import RemoveCategory from "./RemoveCategory";

function IncomeCategoryList() {
  // Fetch categories with React Query
  const categoriesQuery = useQuery({
    queryKey: ["categories", "income"],
    queryFn: () => fetch("/api/categories?type=income").then((res) => res.json()),
  });

  // Handle category removal
  const removeCategory = (categoryId: string) => {
    fetch(`/api/categories/${categoryId}`, { method: "DELETE" })
      .then(() => {
        categoriesQuery.refetch(); // Refetch categories after deletion
      })
      .catch((error) => {
        console.error("Error deleting category:", error);
      });
  };

  return (
    <SkeletonWrapper isLoading={categoriesQuery.isLoading}>
      <Card>
        <CardHeader>
          <CardTitle>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-12 w-12 rounded-lg bg-emerald-400/10 p-2 text-emerald-500" />
              Income Categories
            </div>
          </CardTitle>
        </CardHeader>

        <CreateCategory
          type="income"
          successCallback={() => categoriesQuery.refetch()}
          onSuccess={() => categoriesQuery.refetch()}
        />

        <div>
          {categoriesQuery.data && categoriesQuery.data.length > 0 ? (
            categoriesQuery.data.map((category: Category) => (
              <div key={category.name} className="flex items-center justify-between p-2">
                <div>{category.name}</div>
                <RemoveCategory category={category} onRemove={removeCategory} />
              </div>
            ))
          ) : (
            <p>No categories available.</p>
          )}
        </div>
      </Card>
    </SkeletonWrapper>
  );
}

export default IncomeCategoryList;
