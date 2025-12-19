import { cn } from "@/lib/utils";

export function Heading({
  title,
  description,
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  title: string;
  description: string;
}) {
  return (
    <div
      className={cn("flex items-center justify-between", className)}
      {...props}
    >
      <div className="flex flex-col">
        <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
        <p className="text-muted-foreground max-w-2xl">{description}</p>
      </div>
      {children}
    </div>
  );
}
