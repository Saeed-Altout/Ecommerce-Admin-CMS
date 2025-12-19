"use client";

import ImageNext from "next/image";
import { MouseEventHandler } from "react";
import { useRouter } from "next/navigation";
import { ExpandIcon, ShoppingCartIcon } from "lucide-react";

import { useCart } from "@/hooks/use-cart";
import { usePreviewModal } from "@/hooks/use-preview-modal";

import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Currency } from "@/components/ui/currency";

import { ProductType } from "./product-list";

export function ProductCard({ data }: { data: ProductType }) {
  const cart = useCart();
  const previewModal = usePreviewModal();
  const router = useRouter();

  const handleClick = () => {
    router.push(`/product/${data?.id}`);
  };

  const onPreview: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    previewModal.onOpen(data);
  };

  const onAddToCart: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    cart.addItem(data);
  };

  return (
    <Card onClick={handleClick} className="group gap-1 p-1">
      <div className="relative aspect-square overflow-hidden rounded-xl">
        <ImageNext
          fill
          src={data?.images?.[0]?.url}
          alt="cover-product"
          className="aspect-square rounded-xl object-cover"
        />
        <div className="absolute bottom-5 w-full opacity-0 transition group-hover:opacity-100">
          <div className="flex justify-center gap-x-6">
            <Button onClick={onPreview} size="icon" variant="secondary">
              <ExpandIcon />
              <span className="sr-only">Preview</span>
            </Button>
            <Button onClick={onAddToCart} size="icon" variant="secondary">
              <ShoppingCartIcon />
              <span className="sr-only">Add to cart</span>
            </Button>
          </div>
        </div>
      </div>
      <CardHeader className="gap-0 p-2">
        <CardTitle className="text-xl">{data.name}</CardTitle>
        <CardDescription>{data.category.name}</CardDescription>
      </CardHeader>
      <CardFooter className="p-2">
        <Currency value={+data?.price} />
      </CardFooter>
    </Card>
  );
}
