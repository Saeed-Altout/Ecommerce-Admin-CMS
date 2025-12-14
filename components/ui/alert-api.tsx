"use client";
import { useState } from "react";
import { toast } from "sonner";
import { CheckIcon, CopyIcon, ServerIcon } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ApiAlertProps {
  title: string;
  description: string;
  variant: "admin" | "public";
}

const textMap: Record<ApiAlertProps["variant"], "Admin" | "Public"> = {
  admin: "Admin",
  public: "Public",
};

const variantMap: Record<ApiAlertProps["variant"], "default" | "secondary"> = {
  admin: "default",
  public: "secondary",
};

export function ApiAlert({ title, description, variant }: ApiAlertProps) {
  const [copied, setCopied] = useState<boolean>(false);

  const onCopy = () => {
    navigator.clipboard.writeText(description);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
    toast.success("Copied to clipboard");
  };

  return (
    <Alert className="group">
      <ServerIcon />
      <AlertTitle className="flex items-center gap-x-2">
        {title}
        <Badge variant={variantMap[variant]}>{textMap[variant]}</Badge>
      </AlertTitle>
      <AlertDescription className="flex items-center justify-between gap-x-2">
        <code>
          <Badge variant="secondary">{description}</Badge>
        </code>
        <Button
          variant="outline"
          size="icon-sm"
          onClick={onCopy}
          className="opacity-0 transition-opacity group-hover:opacity-100"
        >
          <span className="sr-only">{copied ? "Copied" : "Copy"}</span>
          {copied ? (
            <CheckIcon className="size-3" />
          ) : (
            <CopyIcon className="size-3" />
          )}
        </Button>
      </AlertDescription>
    </Alert>
  );
}
