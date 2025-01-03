"use client";

import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";
import DeleteCategoryDialog from "../_components/DeleteCategoryDialog";
import { Category } from "@prisma/client";

function CategoryCard({ category }: { category: Category }) {
  const handleConfirm = () => {
    console.log(`Category ${category.name} deleted successfully.`);
    // Add any additional actions on confirmation here, like refetching data
  };

  return (
    <div className="flex flex-col justify-between rounded-md border shadow-md shadow-black/[0.1] dark:shadow-white/[0.1]">
      <div className="flex flex-col items-center gap-2 p-4">
        <span className="text-3xl" role="img">
          {category.icon}
        </span>
        <span>{category.name}</span>
      </div>
      <DeleteCategoryDialog
        category={category}
        onConfirm={handleConfirm} // Pass the onConfirm handler
        trigger={
          <Button
            className="flex w-full items-center gap-2 rounded-t-none text-muted-foreground hover:bg-red-500/20"
            variant="secondary"
          >
            <TrashIcon className="h-4 w-4" />
            Remove
          </Button>
        }
      />
    </div>
  );
}

export default CategoryCard;