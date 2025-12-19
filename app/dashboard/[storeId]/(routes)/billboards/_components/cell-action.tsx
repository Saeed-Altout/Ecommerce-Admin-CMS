"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";

import { EditIcon, MoreHorizontal, CopyIcon, TrashIcon } from "lucide-react";

import { BillboardColumn } from "./columns";
import { onCopy } from "@/helpers/on-copy";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { AlertModal } from "@/components/modals/alert-modal";
import { useDeleteBillboard } from "@/services/billboard/mutation";

export function CellAction({ data }: { data: BillboardColumn }) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const router = useRouter();
  const params = useParams<{ storeId: string }>();

  const { mutate, isPending: isDeleting } = useDeleteBillboard();

  async function onConfirm() {
    mutate(
      {
        storeId: params.storeId,
        billboardId: data.id,
      },
      {
        onSuccess: () => {
          setIsOpen(false);
          router.refresh();
        },
      },
    );
  }

  return (
    <>
      <AlertModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        loading={isDeleting}
        onConfirm={onConfirm}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon-sm">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() =>
              router.push(`/dashboard/${params.storeId}/billboards/${data.id}`)
            }
          >
            <EditIcon />
            <span>Edit</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              onCopy(
                data.id,
                "Billboard ID copied to clipboard",
                "Billboard ID not found",
              )
            }
          >
            <CopyIcon />
            <span>Copy ID</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setIsOpen(true)}
            variant="destructive"
          >
            <TrashIcon />
            <span>Delete</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
