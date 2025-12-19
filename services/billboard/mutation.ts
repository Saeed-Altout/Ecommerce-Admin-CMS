import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { createBillboard, deleteBillboard, updateBillboard } from "./api";

export const useDeleteBillboard = () => {
  return useMutation({
    mutationKey: ["delete-billboard"],
    mutationFn: deleteBillboard,
    onSuccess: () => {
      toast.success("Billboard deleted successfully");
    },
    onError: () => {
      toast.error("Make sure you removed all categories using this billboard");
    },
  });
};

export const useCreateBillboard = () => {
  return useMutation({
    mutationKey: ["create-billboard"],
    mutationFn: createBillboard,
    onSuccess: () => {
      toast.success("Billboard created successfully");
    },
    onError: () => {
      toast.error("Failed create billboard!");
    },
  });
};

export const useUpdateBillboard = () => {
  return useMutation({
    mutationKey: ["update-billboard"],
    mutationFn: updateBillboard,
    onSuccess: () => {
      toast.success("Billboard updated successfully");
    },
    onError: () => {
      toast.error("Failed update billboard!");
    },
  });
};
