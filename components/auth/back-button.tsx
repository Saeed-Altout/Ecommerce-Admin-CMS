"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

export function BackButton({
  redirectTo,
  ...props
}: React.ComponentProps<typeof Button> & {
  redirectTo?: {
    href: string;
    label: string;
  };
}) {
  const router = useRouter();

  const onClick = () => {
    if (!redirectTo?.href) return;
    router.push(redirectTo?.href);
  };

  return (
    <Button variant="link" size="sm" onClick={onClick} {...props}>
      {redirectTo?.label}
    </Button>
  );
}
