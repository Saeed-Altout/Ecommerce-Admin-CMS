"use client";

import { Button } from "@/components/ui/button";
import { logout } from "@/actions/logout";

export function LogoutButton({
  ...props
}: React.ComponentProps<typeof Button>) {
  const onClick = () => {
    logout();
  };

  return <span onClick={onClick} {...props} className="cursor-pointer" />;
}
