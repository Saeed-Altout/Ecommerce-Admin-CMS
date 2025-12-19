import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { createOrder, deleteOrder, updateOrder } from "./api";

export const useDeleteOrder = () => {
  return useMutation({
    mutationKey: ["delete-order"],
    mutationFn: deleteOrder,
    onSuccess: () => {
      toast.success("Order deleted successfully");
    },
    onError: () => {
      toast.error("Make sure you removed all categories using this order");
    },
  });
};

export const useCreateOrder = () => {
  return useMutation({
    mutationKey: ["create-order"],
    mutationFn: createOrder,
    onSuccess: () => {
      toast.success("Order created successfully");
    },
    onError: () => {
      toast.error("Failed create order!");
    },
  });
};

export const useUpdateOrder = () => {
  return useMutation({
    mutationKey: ["update-order"],
    mutationFn: updateOrder,
    onSuccess: () => {
      toast.success("Order updated successfully");
    },
    onError: () => {
      toast.error("Failed update order!");
    },
  });
};
