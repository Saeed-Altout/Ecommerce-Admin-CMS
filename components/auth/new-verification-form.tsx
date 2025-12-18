"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { newVerification } from "@/actions/new-verification";

import { Spinner } from "@/components/ui/spinner";

import { Wrapper } from "./wrapper";
import { toast } from "sonner";

export function NewVerificationForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter();

  useEffect(() => {
    let isMounted = true;

    async function verify() {
      if (!token) return;

      try {
        const result = await newVerification(token);
        if (!isMounted) return;

        if (result?.error) {
          toast.error(result.error);
        } else if (result?.success) {
          toast.success(result.success);
          setTimeout(() => {
            router.push("/auth/login");
          }, 1500);
        }
      } catch {
        toast.error("Something went wrong!");
      }
    }

    verify();

    return () => {
      isMounted = false;
    };
  }, [token, router]);

  return (
    <Wrapper
      title="Confirm your verification"
      redirectTo={{ href: "/auth/login", label: "Back to login" }}
    >
      <div className="flex flex-col items-center justify-center">
        <Spinner />
      </div>
    </Wrapper>
  );
}
