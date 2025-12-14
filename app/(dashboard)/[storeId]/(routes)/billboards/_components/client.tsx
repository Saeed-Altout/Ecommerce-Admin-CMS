"use client";
import { PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

export function BillboardsClient() {
  const params = useParams();
  const router = useRouter();

  return (
    <>
      <Heading title="Billboards (0)" description="Manage your billboards">
        <Button
          onClick={() => router.push(`/${params.storeId}/billboards/new`)}
        >
          <PlusIcon className="size-4" />
          Add New
        </Button>
      </Heading>
      <Separator />
    </>
  );
}
