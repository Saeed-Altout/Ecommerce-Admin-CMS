import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { createSize, deleteSize, updateSize } from "./api";

export const useDeleteSize = () => {
  return useMutation({
    mutationKey: ["delete-size"],
    mutationFn: deleteSize,
    onSuccess: () => {
      toast.success("Size deleted successfully");
    },
    onError: () => {
      toast.error("Make sure you removed all categories using this size");
    },
  });
};

export const useCreateSize = () => {
  return useMutation({
    mutationKey: ["create-size"],
    mutationFn: createSize,
    onSuccess: () => {
      toast.success("Size created successfully");
    },
    onError: () => {
      toast.error("Failed create size!");
    },
  });
};

export const useUpdateSize = () => {
  return useMutation({
    mutationKey: ["update-size"],
    mutationFn: updateSize,
    onSuccess: () => {
      toast.success("Size updated successfully");
    },
    onError: () => {
      toast.error("Failed update size!");
    },
  });
};
