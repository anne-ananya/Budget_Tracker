import React from "react";
import { useMutation } from "@tanstack/react-query";
import CreateCategoryDialog from "../_components/CreateCategoryDialog";

interface CreateCategoryProps {
  type: "income" | "expense";
  successCallback: () => void;
  onSuccess?: () => void;
}

export default function CreateCategory({
  type,
  successCallback,
  onSuccess,
}: CreateCategoryProps) {
  const mutation = useMutation({
    mutationFn: async (newCategory: { type: string; name: string; icon: string }) => {
      const response = await fetch("/api/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCategory),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create category");
      }

      return response.json();
    },
    onSuccess: () => {
      successCallback();
      if (onSuccess) onSuccess();
    },
    onError: (error: Error) => {
      console.error("Failed to create category:", error.message);
    },
  });

  const handleCreateCategory = (name: string, icon: string) => {
    mutation.mutate({ type, name, icon });
  };

  return (
    <div className="flex justify-end gap-2">
      <CreateCategoryDialog
        type={type}
        successCallback={successCallback}
        trigger={
          <button
            className="gap-2 text-sm px-4 py-2 rounded-md bg-green-500 text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 ml-auto mr-4"
          >
            <span className="h-4 w-4">+</span> Create category
          </button>
        }
      />
    </div>
  );
}
