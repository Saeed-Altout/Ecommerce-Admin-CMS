"use client";
import { FaGithub } from "react-icons/fa";

import { signIn } from "next-auth/react";

import { Button } from "@/components/ui/button";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { useSearchParams } from "next/navigation";

export function Github() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  const onClick = () => {
    signIn("github", { redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT });
  };
  return (
    <Button className="flex-1" variant="outline" onClick={onClick}>
      <FaGithub /> Github
    </Button>
  );
}
