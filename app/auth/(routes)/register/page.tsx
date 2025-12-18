import { Suspense } from "react";

import { RegisterForm } from "@/components/auth/register-form";
import { LoadingPage } from "@/components/loading-page";

export default function RegisterPage() {
  return (
    <Suspense fallback={<LoadingPage />}>
      <RegisterForm />
    </Suspense>
  );
}
