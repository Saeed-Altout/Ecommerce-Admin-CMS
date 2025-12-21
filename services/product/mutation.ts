import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { createProduct, deleteProduct, updateProduct } from "./api";

export const useDeleteProduct = () => {
  return useMutation({
    mutationKey: ["delete-product"],
    mutationFn: deleteProduct,
    onSuccess: () => {
      toast.success("Product deleted successfully");
    },
    onError: () => {
      toast.error(
        "Unable to delete product. Please remove it from all active orders first.",
      );
    },
  });
};

export const useCreateProduct = () => {
  return useMutation({
    mutationKey: ["create-product"],
    mutationFn: createProduct,
    onSuccess: () => {
      toast.success("Product created successfully");
    },
    onError: () => {
      toast.error("Failed to create product. Please try again.");
    },
  });
};

export const useUpdateProduct = () => {
  return useMutation({
    mutationKey: ["update-product"],
    mutationFn: updateProduct,
    onSuccess: () => {
      toast.success("Product updated successfully");
    },
    onError: () => {
      toast.error("Failed to update product. Please try again.");
    },
  });
};
