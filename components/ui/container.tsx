import { cn } from "@/lib/utils";

export function Container({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return <div className={cn("mx-auto max-w-7xl", className)} {...props} />;
}
