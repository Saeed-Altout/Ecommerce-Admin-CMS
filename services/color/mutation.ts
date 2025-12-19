import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { createColor, deleteColor, updateColor } from "./api";

export const useDeleteColor = () => {
  return useMutation({
    mutationKey: ["delete-color"],
    mutationFn: deleteColor,
    onSuccess: () => {
      toast.success("Color deleted successfully");
    },
    onError: () => {
      toast.error("Make sure you removed all categories using this color");
    },
  });
};

export const useCreateColor = () => {
  return useMutation({
    mutationKey: ["create-color"],
    mutationFn: createColor,
    onSuccess: () => {
      toast.success("Color created successfully");
    },
    onError: () => {
      toast.error("Failed create color!");
    },
  });
};

export const useUpdateColor = () => {
  return useMutation({
    mutationKey: ["update-color"],
    mutationFn: updateColor,
    onSuccess: () => {
      toast.success("Color updated successfully");
    },
    onError: () => {
      toast.error("Failed update color!");
    },
  });
};
