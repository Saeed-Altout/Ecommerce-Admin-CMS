"use client";

import { useEffect } from "react";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";

import { useCart } from "@/hooks/use-cart";
import { useCheckout } from "@/services/checkout/mutation";

import { Button } from "@/components/ui/button";
import { Currency } from "@/components/ui/currency";
import { Spinner } from "@/components/ui/spinner";

export function Summary() {
  const searchParams = useSearchParams();
  const { mutate: checkout, isPending } = useCheckout();

  const items = useCart((state) => state.items);
  const removeAll = useCart((state) => state.removeAll);
  const totalPrice = items.reduce(
    (total, item) => total + Number(item.price),
    0,
  );

  useEffect(() => {
    if (searchParams.get("success")) {
      toast.success("Payment completed.");
      removeAll();
    }
    if (searchParams.get("canceled")) {
      toast.error("Something went wrong.");
    }
  }, [searchParams, removeAll]);

  const onCheckout = () => {
    checkout(items.map((item) => item.id));
  };

  return (
    <div className="mt-16 rounded-xl bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
      <h2 className="text-lg font-medium text-gray-900">Order Summary</h2>
      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between border-t pt-4">
          <div className="text-muted-foreground text-base font-medium">
            Order Total
          </div>
          <Currency value={totalPrice} />
        </div>
      </div>
      <Button
        disabled={items.length === 0 || isPending}
        className="mt-6 w-full"
        onClick={onCheckout}
      >
        Checkout {isPending && <Spinner />}
      </Button>
    </div>
  );
}
