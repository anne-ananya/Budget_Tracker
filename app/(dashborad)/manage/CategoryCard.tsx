"use client";

import type { Category } from "@prisma/client";
import RemoveCategory from "./RemoveCategory";

function CategoryCard({ category }: { category: Category }) {
  return (
    <div className="flex flex-col justify-between rounded-md border shadow-md shadow-black/[0.1] dark:shadow-white/[0.1]">
      <div className="flex flex-col items-center gap-2 p-4">
        <span className="text-3xl" role="img">
          {category.icon}
        </span>
        <span>{category.name}</span>
      </div>
      <RemoveCategory category={category} />
    </div>
  );
}

export default CategoryCard;
