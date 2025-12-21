"use client";
import { useCart } from "@/hooks/use-cart";

import { CartItem } from "./_components/cart-item";
import { Summary } from "./_components/summary";

export default function CartPage() {
  const cart = useCart();

  return (
    <div className="px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold">Shopping Cart</h1>
      <div className="mt-12 gap-x-12 lg:grid lg:grid-cols-12 lg:items-start">
        <div className="lg:col-span-7">
          {cart?.items?.length === 0 && (
            <p className="text-muted-foreground">No items added to cart</p>
          )}
          <ul>
            {cart?.items?.map((item) => (
              <CartItem key={item.id} data={item} />
            ))}
          </ul>
        </div>
        <Summary />
      </div>
    </div>
  );
}
