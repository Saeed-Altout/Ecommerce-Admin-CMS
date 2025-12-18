"use client";

import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { LoginForm } from "./login-form";

export function LoginButton({
  mode = "redirect",
  asChild,
  ...props
}: React.ComponentProps<"div"> & {
  mode?: "modal" | "redirect";
  asChild?: boolean;
}) {
  const router = useRouter();

  const onClick = () => {
    router.push("/auth/login");
  };

  if (mode === "modal") {
    return (
      <Dialog>
        <DialogTrigger asChild>{props.children}</DialogTrigger>
        <DialogContent className="p-0">
          <DialogHeader className="sr-only">
            <DialogTitle>Login</DialogTitle>
            <DialogDescription>
              Login to your account to continue
            </DialogDescription>
          </DialogHeader>
          <LoginForm />
        </DialogContent>
      </Dialog>
    );
  }

  return <div onClick={onClick} {...props} />;
}
