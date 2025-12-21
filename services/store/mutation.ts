import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { deleteStore, updateStore } from "./api";

export const useDeleteStore = () => {
  return useMutation({
    mutationKey: ["delete-store"],
    mutationFn: deleteStore,
    onSuccess: () => {
      toast.success("Store deleted successfully");
    },
    onError: () => {
      toast.error("Unable to delete store.");
    },
  });
};

export const useUpdateStore = () => {
  return useMutation({
    mutationKey: ["update-store"],
    mutationFn: updateStore,
    onSuccess: () => {
      toast.success("Store updated successfully");
    },
    onError: () => {
      toast.error("Failed to update store. Please try again.");
    },
  });
};
