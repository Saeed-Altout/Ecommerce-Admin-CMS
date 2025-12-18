import { Suspense } from "react";

import { NewPasswordForm } from "@/components/auth/new-password-form";
import { LoadingPage } from "@/components/loading-page";

export default function NewPasswordPage() {
  return (
    <Suspense fallback={<LoadingPage />}>
      <NewPasswordForm />
    </Suspense>
  );
}
