import { toast } from "sonner";

export function onCopy(id: string, success?: string, error?: string) {
  if (!id) {
    toast.error(error || "Something went wrong!");
    return;
  }
  navigator.clipboard.writeText(id);
  toast.success(success || "ID copied to clipboard");
}
