"use client";

import { XIcon } from "lucide-react";
import Image from "next/image";

import { useCart } from "@/hooks/use-cart";

import { Currency } from "@/components/ui/currency";
import { Button } from "@/components/ui/button";

import { ProductType } from "@/components/store/product-list";

export function CartItem({ data }: { data: ProductType }) {
  const cart = useCart();

  const onRemove = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    cart.removeItem(data.id);
  };

  return (
    <li className="flex border-b py-6">
      <div className="relative h-24 w-24 overflow-hidden rounded-md sm:h-48 sm:w-48">
        <Image
          fill
          src={data.images[0].url}
          alt="image-cart-item"
          className="rounded-md object-cover object-center"
        />
      </div>
      <div className="relative ml-4 flex flex-1 flex-col justify-between sm:ml-6">
        <div className="absolute top-0 right-0 z-10">
          <Button onClick={onRemove} size="icon-sm" variant="destructive">
            <span className="sr-only">Remove</span>
            <XIcon />
          </Button>
        </div>
        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
          <div className="flex justify-between">
            <p className="text-lg font-semibold">{data.name}</p>
          </div>
          <div className="mt-1 flex text-sm">
            <p className="text-muted-foreground">{data.color.name}</p>
            <p className="text-muted-foreground ml-4 border-l pl-4">
              {data.size.name}
            </p>
          </div>
          <Currency value={+data.price} />
        </div>
      </div>
    </li>
  );
}
