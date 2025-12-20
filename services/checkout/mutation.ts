import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { checkout } from "./api";

export const useCheckout = () => {
  return useMutation({
    mutationKey: ["checkout"],
    mutationFn: checkout,
    onSuccess: (data) => {
      toast.success("Checkout successful");
      window.location.href = data.url;
    },
    onError: () => {
      toast.error("Failed checkout!");
    },
  });
};
