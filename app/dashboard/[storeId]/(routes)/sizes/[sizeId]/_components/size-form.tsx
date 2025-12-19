"use client";
import { useRouter, useParams } from "next/navigation";
import { useState } from "react";

import { TrashIcon } from "lucide-react";
import { toast } from "sonner";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  useCreateSize,
  useDeleteSize,
  useUpdateSize,
} from "@/services/size/mutation";
import { Size } from "@/lib/prisma/client";
import { sizeSchema } from "@/schemas";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Heading } from "@/components/ui/heading";
import { Spinner } from "@/components/ui/spinner";
import { Separator } from "@/components/ui/separator";
import { AlertModal } from "@/components/modals/alert-modal";

export function SizeForm({ initialData }: { initialData: Size | null }) {
  const router = useRouter();
  const params = useParams<{ sizeId: string; storeId: string }>();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { mutate: remove, isPending: isDeleting } = useDeleteSize();
  const { mutate: create, isPending: isCreating } = useCreateSize();
  const { mutate: update, isPending: isUpdating } = useUpdateSize();

  const isPending = isCreating || isUpdating;

  const title = initialData ? "Edit size" : "Create size";
  const description = initialData ? "Edit size" : "Add a new size";
  const toastMessage = initialData
    ? "Size updated successfully"
    : "Size created successfully";
  const action = initialData ? "Save changes" : "Create";

  const form = useForm<z.infer<typeof sizeSchema>>({
    resolver: zodResolver(sizeSchema),
    defaultValues: initialData ?? {
      name: "",
      value: "",
    },
  });

  const onSuccess = () => {
    toast.success(toastMessage);
    router.push(`/dashboard/${params.storeId}/sizes`);
    router.refresh();
  };

  async function onSubmit(values: z.infer<typeof sizeSchema>) {
    if (initialData) {
      update(
        {
          ...values,
          storeId: params.storeId,
          sizeId: params.sizeId,
        },
        {
          onSuccess: () => {
            onSuccess();
          },
        },
      );
    } else {
      create(
        { ...values, storeId: params.storeId },
        {
          onSuccess: () => {
            onSuccess();
          },
        },
      );
    }
  }

  async function onConfirm() {
    remove(
      {
        storeId: params.storeId,
        sizeId: params.sizeId,
      },
      {
        onSuccess: () => {
          setIsOpen(false);
          router.push(`/dashboard/${params.storeId}/sizes`);
          router.refresh();
        },
      },
    );
  }

  return (
    <>
      {initialData && (
        <AlertModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          loading={isDeleting}
          onConfirm={onConfirm}
        />
      )}
      <Heading title={title} description={description}>
        {initialData && (
          <Button
            variant="destructive"
            size="icon"
            disabled={isPending}
            onClick={() => setIsOpen(true)}
          >
            <TrashIcon />
          </Button>
        )}
      </Heading>
      <Separator />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Size name"
                      disabled={isPending}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Value</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Size value"
                      disabled={isPending}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex items-center gap-x-2">
            <Button type="submit" disabled={isPending}>
              {action} {isPending && <Spinner />}
            </Button>
            <Button
              type="button"
              disabled={isPending}
              variant="outline"
              onClick={() => router.back()}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
