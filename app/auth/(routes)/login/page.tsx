import { Suspense } from "react";

import { LoadingPage } from "@/components/loading-page";
import { LoginForm } from "@/components/auth/login-form";

export default function LoginPage() {
  return (
    <Suspense fallback={<LoadingPage />}>
      <LoginForm />
    </Suspense>
  );
}
