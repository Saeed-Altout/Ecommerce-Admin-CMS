import { Spinner } from "@/components/ui/spinner";

export function LoadingPage() {
  return (
    <div className="flex h-screen items-center justify-center">
      <Spinner className="size-6" />
    </div>
  );
}
