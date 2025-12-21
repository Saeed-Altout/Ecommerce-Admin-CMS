import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { createCategory, deleteCategory, updateCategory } from "./api";

export const useDeleteCategory = () => {
  return useMutation({
    mutationKey: ["delete-category"],
    mutationFn: deleteCategory,
    onSuccess: () => {
      toast.success("Category deleted successfully");
    },
    onError: () => {
      toast.error(
        "Unable to delete category. Please remove all products from this category first.",
      );
    },
  });
};

export const useCreateCategory = () => {
  return useMutation({
    mutationKey: ["create-category"],
    mutationFn: createCategory,
    onSuccess: () => {
      toast.success("Category created successfully");
    },
    onError: () => {
      toast.error("Failed to create category. Please try again.");
    },
  });
};

export const useUpdateCategory = () => {
  return useMutation({
    mutationKey: ["update-category"],
    mutationFn: updateCategory,
    onSuccess: () => {
      toast.success("Category updated successfully");
    },
    onError: () => {
      toast.error("Failed to update category. Please try again.");
    },
  });
};
