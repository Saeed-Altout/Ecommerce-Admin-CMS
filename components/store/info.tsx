"use client";
import { MouseEventHandler } from "react";
import { ShoppingCartIcon } from "lucide-react";

import { Currency } from "@/components/ui/currency";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { useCart } from "@/hooks/use-cart";
import { ProductType } from "./product-list";

export function Info({ data }: { data: ProductType }) {
  const cart = useCart();

  const onAddToCart: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    cart.addItem(data);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">{data.name}</h1>
      <p className="text-2xl">
        <Currency value={+data?.price} />
      </p>
      <Separator />
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-x-4">
          <h3 className="font-semibold">Size:</h3>
          <div className="text-muted-foreground">{data?.size?.value}</div>
        </div>
        <div className="flex items-center gap-x-4">
          <h3 className="font-semibold">Color:</h3>
          <div
            className="text-muted-foreground h-6 w-6 rounded-full border"
            style={{ backgroundColor: data?.color?.value }}
          />
        </div>
      </div>
      <Button className="w-full" onClick={onAddToCart}>
        <span>Add To Cart</span>
        <ShoppingCartIcon />
      </Button>
    </div>
  );
}
