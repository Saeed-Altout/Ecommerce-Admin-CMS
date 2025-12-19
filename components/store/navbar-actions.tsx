"use client";

import Link from "next/link";
import { ShoppingBagIcon } from "lucide-react";

import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";

export function NavbarActions() {
  const cart = useCart();

  return (
    <div className="ml-auto">
      <Button asChild className="rounded-full px-4!">
        <Link href="/cart">
          <ShoppingBagIcon />
          <span className="ml-2">{cart?.items?.length}</span>
        </Link>
      </Button>
    </div>
  );
}
