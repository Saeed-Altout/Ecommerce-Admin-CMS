"use client";
import Link from "next/link";
import { usePathname, useParams } from "next/navigation";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function MainNav({ className, ...props }: React.ComponentProps<"nav">) {
  const pathname = usePathname();
  const params = useParams();

  const routes = [
    {
      href: `/dashboard/${params.storeId}`,
      label: "Overview",
      active: pathname === `/dashboard/${params.storeId}`,
    },
    {
      href: `/dashboard/${params.storeId}/billboards`,
      label: "Billboards",
      active: pathname === `/dashboard/${params.storeId}/billboards`,
    },
    {
      href: `/dashboard/${params.storeId}/categories`,
      label: "Categories",
      active: pathname === `/dashboard/${params.storeId}/categories`,
    },
    {
      href: `/dashboard/${params.storeId}/sizes`,
      label: "Sizes",
      active: pathname === `/dashboard/${params.storeId}/sizes`,
    },
    {
      href: `/dashboard/${params.storeId}/colors`,
      label: "Colors",
      active: pathname === `/dashboard/${params.storeId}/colors`,
    },
    {
      href: `/dashboard/${params.storeId}/products`,
      label: "Products",
      active: pathname === `/dashboard/${params.storeId}/products`,
    },
    {
      href: `/dashboard/${params.storeId}/orders`,
      label: "Orders",
      active: pathname === `/dashboard/${params.storeId}/orders`,
    },
    {
      href: `/dashboard/${params.storeId}/settings`,
      label: "Settings",
      active: pathname === `/dashboard/${params.storeId}/settings`,
    },
  ];

  return (
    <nav {...props} className={cn("flex items-center space-x-4", className)}>
      {routes.map((route) => (
        <Button
          asChild
          key={route.href}
          size="sm"
          variant="link"
          className={cn(
            "text-muted-foreground px-0",
            route.active && "text-foreground underline",
          )}
        >
          <Link href={route.href}>{route.label}</Link>
        </Button>
      ))}
    </nav>
  );
}
