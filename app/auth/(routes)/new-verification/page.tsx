import { Suspense } from "react";

import { NewVerificationForm } from "@/components/auth/new-verification-form";
import { LoadingPage } from "@/components/loading-page";

export default function NewVerificationPage() {
  return (
    <Suspense fallback={<LoadingPage />}>
      <NewVerificationForm />
    </Suspense>
  );
}
