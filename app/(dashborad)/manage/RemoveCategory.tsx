import React from "react";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";
import DeleteCategoryDialog from "../_components/DeleteCategoryDialog";
import { Category } from "@prisma/client";

interface RemoveCategoryProps {
  category: Category;
  onRemove: (categoryId: string) => void;
}

const RemoveCategory = ({ category, onRemove }: RemoveCategoryProps) => {
  const handleRemove = () => {
    onRemove(category.name); // Ensure the callback is triggered only on confirmation
  };

  return (
    <DeleteCategoryDialog
      category={category}
      onConfirm={handleRemove} // Pass the callback to be invoked on confirmation
      trigger={
        <Button className="text-red-500 hover:bg-red-100 flex items-center gap-1">
          <TrashIcon className="h-4 w-4" />
          Remove
        </Button>
      }
    />
  );
};

export default RemoveCategory;
