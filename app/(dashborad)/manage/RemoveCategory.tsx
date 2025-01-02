'use client';
import React from "react";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";
import type { Category } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DeleteCategory } from "../_actions/categories";
import { toast } from "sonner";
import type { TransactionType } from "@/lib/types";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface RemoveCategoryProps {
  category: Category;
}

const RemoveCategory = ({ category }: RemoveCategoryProps) => {
  const categoryIdentifier = `${category.name}-${category.type}`;
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: DeleteCategory,
    onSuccess: async () => {
      toast.success("Category deleted successfully", {
        id: categoryIdentifier,
      });
      await queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
    },
    onError: () => {
      toast.error("Something went wrong", {
        id: categoryIdentifier,
      });
    },
  });

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          className="flex items-center gap-2 text-muted-foreground hover:bg-red-500/20"
          variant="ghost"
          size="sm"
        >
          <TrashIcon className="h-4 w-4" />
          Remove
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            category.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              toast.loading("Deleting category...", {
                id: categoryIdentifier,
              });
              deleteMutation.mutate({
                name: category.name,
                type: category.type as TransactionType,
              });
            }}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default RemoveCategory;