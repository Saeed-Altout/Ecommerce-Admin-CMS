"use client";
import { useRouter, useParams } from "next/navigation";
import { useState } from "react";

import { TrashIcon } from "lucide-react";
import { toast } from "sonner";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  useCreateColor,
  useDeleteColor,
  useUpdateColor,
} from "@/services/color/mutation";
import { Color } from "@/lib/prisma/client";
import { colorSchema } from "@/schemas";

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

export function ColorForm({ initialData }: { initialData: Color | null }) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const router = useRouter();
  const params = useParams<{ storeId: string; colorId: string }>();

  const { mutate: remove, isPending: isDeleting } = useDeleteColor();
  const { mutate: create, isPending: isCreating } = useCreateColor();
  const { mutate: update, isPending: isUpdating } = useUpdateColor();

  const isPending = isCreating || isUpdating;

  const title = initialData ? "Edit color" : "Create color";
  const description = initialData ? "Edit color" : "Add a new color";
  const toastMessage = initialData
    ? "Color updated successfully"
    : "Color created successfully";
  const action = initialData ? "Save changes" : "Create";

  const form = useForm<z.infer<typeof colorSchema>>({
    resolver: zodResolver(colorSchema),
    defaultValues: initialData ?? {
      name: "",
      value: "",
    },
  });

  const onSuccess = () => {
    toast.success(toastMessage);
    router.push(`/dashboard/${params.storeId}/colors`);
    router.refresh();
  };

  async function onSubmit(values: z.infer<typeof colorSchema>) {
    if (initialData) {
      update(
        {
          ...values,
          storeId: params.storeId,
          colorId: params.colorId,
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
        colorId: params.colorId,
      },
      {
        onSuccess: () => {
          setIsOpen(false);
          router.push(`/dashboard/${params.storeId}/colors`);
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
                    <div className="flex items-center gap-x-2">
                      <Input
                        placeholder="Size value"
                        disabled={isPending}
                        {...field}
                      />
                      <span
                        className="size-8 rounded-full border"
                        style={{ backgroundColor: field.value }}
                      />
                    </div>
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
              onClick={() => router.back()}
              variant="outline"
            >
              Cancel
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
