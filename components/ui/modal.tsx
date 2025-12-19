"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

export function Modal({
  title,
  description,
  isOpen,
  onClose,
  children,
  className,
}: {
  title?: string;
  description?: string;
  isOpen: boolean;
  onClose?: () => void;
  children?: React.ReactNode;
  className?: string;
}) {
  const onOpenChange = (open: boolean) => {
    if (!open) {
      onClose?.();
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className={cn("sm:max-w-[425px]", className)}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div>{children}</div>
      </DialogContent>
    </Dialog>
  );
}
