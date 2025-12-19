"use client";

import axios from "axios";
import { toast } from "sonner";
import { EditIcon, MoreHorizontal, CopyIcon, TrashIcon } from "lucide-react";
import { useRouter, useParams } from "next/navigation";

import { CategoryColumn } from "./columns";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { AlertModal } from "@/components/modals/alert-modal";

export function CellAction({ data }: { data: CategoryColumn }) {
  const router = useRouter();
  const params = useParams();

  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  function onCopy(id: string) {
    if (!id) {
      toast.error("Category ID not found");
      return;
    }
    navigator.clipboard.writeText(id);
    toast.success("Category ID copied to clipboard");
  }

  async function onConfirm() {
    try {
      setIsDeleting(true);
      await axios.delete(`/api/${params.storeId}/categories/${data.id}`);
      toast.success("Category deleted successfully");
      setIsOpen(false);
      router.refresh();
    } catch {
      toast.error("Make sure you removed all categories using this Category");
    } finally {
      setIsDeleting(false);
    }
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
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() =>
              router.push(`/${params.storeId}/categories/${data.id}`)
            }
          >
            <EditIcon className="size-4" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onCopy(data.id)}>
            <CopyIcon className="size-4" />
            Copy ID
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setIsOpen(true)}
            variant="destructive"
          >
            <TrashIcon className="size-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
