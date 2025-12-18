"use client";

import { useCurrentRole } from "@/hooks/use-current-role";
import { ErrorMessage } from "./error-message";
import { UserRole } from "@/lib/prisma/enums";

export function RoleGate({
  allowedRoles,
  children,
}: {
  allowedRoles: UserRole[];
  children: React.ReactNode;
}) {
  const role = useCurrentRole();

  if (!allowedRoles.includes(role)) {
    return (
      <ErrorMessage message="You are not authorized to access this page" />
    );
  }

  return children;
}
