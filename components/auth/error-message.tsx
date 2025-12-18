import { AlertCircleIcon } from "lucide-react";

export function ErrorMessage({
  message,
  ...props
}: React.ComponentProps<"div"> & {
  message: string;
}) {
  return (
    <div
      className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive"
      {...props}
    >
      <AlertCircleIcon className="h-4 w-4" />
      <span className="truncate">{message}</span>
    </div>
  );
}
