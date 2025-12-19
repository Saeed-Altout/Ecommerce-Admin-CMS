"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";

import { EditIcon, MoreHorizontal, CopyIcon, TrashIcon } from "lucide-react";

import { ColorColumn } from "./columns";
import { useDeleteColor } from "@/services/color/mutation";
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

export function CellAction({ data }: { data: ColorColumn }) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const router = useRouter();
  const params = useParams<{ storeId: string }>();

  const { mutate: remove, isPending: isDeleting } = useDeleteColor();

  async function onConfirm() {
    remove(
      { storeId: params.storeId, colorId: data.id },
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
          <Button variant="ghost" size="icon-sm" disabled={isDeleting}>
            <span className="sr-only">Open menu</span>
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            disabled={isDeleting}
            onClick={() =>
              router.push(`/dashboard/${params.storeId}/colors/${data.id}`)
            }
          >
            <EditIcon />
            <span>Edit</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            disabled={isDeleting}
            onClick={() => onCopy(data.id, "", "")}
          >
            <CopyIcon />
            <span>Copy ID</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            disabled={isDeleting}
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
