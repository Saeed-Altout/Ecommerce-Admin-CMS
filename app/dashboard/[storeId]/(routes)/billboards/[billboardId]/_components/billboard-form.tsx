"use client";
import { useRouter, useParams } from "next/navigation";
import { useState } from "react";

import { TrashIcon } from "lucide-react";
import { toast } from "sonner";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  useCreateBillboard,
  useDeleteBillboard,
  useUpdateBillboard,
} from "@/services/billboard/mutation";
import { Billboard } from "@/lib/prisma/client";
import { billboardSchema } from "@/schemas";

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
import { ImageUpload } from "@/components/ui/image-upload";

export function BillboardForm({
  initialData,
}: {
  initialData: Billboard | null;
}) {
  const router = useRouter();
  const params = useParams<{ billboardId: string; storeId: string }>();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { mutate: remove, isPending: isDeleting } = useDeleteBillboard();
  const { mutate: create, isPending: isCreating } = useCreateBillboard();
  const { mutate: update, isPending: isUpdating } = useUpdateBillboard();

  const isPending = isCreating || isUpdating;

  const title = initialData ? "Edit billboard" : "Create billboard";
  const description = initialData ? "Edit billboard" : "Add a new billboard";
  const toastMessage = initialData
    ? "Billboard updated successfully"
    : "Billboard created successfully";
  const action = initialData ? "Save changes" : "Create";

  const form = useForm<z.infer<typeof billboardSchema>>({
    resolver: zodResolver(billboardSchema),
    defaultValues: initialData ?? {
      label: "",
      imageUrl: "",
    },
  });

  const onSuccess = () => {
    toast.success(toastMessage);
    router.push(`/dashboard/${params.storeId}/billboards`);
    router.refresh();
  };

  async function onSubmit(values: z.infer<typeof billboardSchema>) {
    if (initialData) {
      update(
        {
          ...values,
          storeId: params.storeId,
          billboardId: params.billboardId,
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
        billboardId: params.billboardId,
      },
      {
        onSuccess: () => {
          setIsOpen(false);
          router.push(`/dashboard/${params.storeId}/billboards`);
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
            onClick={() => setIsOpen(true)}
            disabled={isPending}
          >
            <TrashIcon />
          </Button>
        )}
      </Heading>
      <Separator />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Background Image</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value ? [field.value] : []}
                    onChange={(url) => field.onChange(url)}
                    onRemove={() => field.onChange("")}
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <FormField
              control={form.control}
              name="label"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Label</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Billboard label"
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
              {isPending && <Spinner />}
              {action}
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
