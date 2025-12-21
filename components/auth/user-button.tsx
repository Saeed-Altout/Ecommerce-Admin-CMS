"use client";

import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import { LogOutIcon, SettingsIcon } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logout } from "@/actions/logout";
import { Button } from "@/components/ui/button";

export function UserButton() {
  const { data: session } = useSession();
  const router = useRouter();
  const params = useParams();
  const user = session?.user;

  if (!user) {
    return null;
  }

  // Generate user initials for avatar fallback
  const userInitials = user.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : user.email?.[0].toUpperCase() || "U";

  const handleLogout = async () => {
    await logout();
  };

  const handleSettings = () => {
    // Navigate to store settings if storeId is available, otherwise to getting started
    if (params?.storeId) {
      router.push(`/dashboard/${params.storeId}/settings`);
    } else {
      router.push("/getting-started");
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative size-8 rounded-full"
          aria-label="User menu"
        >
          <Avatar className="size-8">
            <AvatarImage src={user.image || undefined} alt={user.name || ""} />
            <AvatarFallback className="bg-primary text-primary-foreground">
              {userInitials}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm leading-none font-medium">
              {user.name || "User"}
            </p>
            {user.email && (
              <p className="text-muted-foreground text-xs leading-none">
                {user.email}
              </p>
            )}
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer" onClick={handleSettings}>
          <SettingsIcon className="mr-2 size-4" />
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          variant="destructive"
          className="cursor-pointer"
          onClick={handleLogout}
        >
          <LogOutIcon className="mr-2 size-4" />
          <span>Sign out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
