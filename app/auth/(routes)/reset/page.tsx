import { Suspense } from "react";

import { ResetForm } from "@/components/auth/reset-form";
import { LoadingPage } from "@/components/loading-page";

export default function ResetPage() {
  return (
    <Suspense fallback={<LoadingPage />}>
      <ResetForm />
    </Suspense>
  );
}
