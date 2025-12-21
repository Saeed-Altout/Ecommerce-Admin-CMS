"use client";
import { TrashIcon } from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Store } from "@/lib/prisma/client";
import { useOrigin } from "@/hooks/use-origin";

import { useDeleteStore, useUpdateStore } from "@/services/store/mutation";
import { storeSchema } from "@/schemas";

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
import { ApiAlert } from "@/components/ui/alert-api";

export function SettingsForm({ initialData }: { initialData: Store }) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const router = useRouter();
  const params = useParams<{ storeId: string }>();
  const origin = useOrigin();

  const { mutate: remove, isPending: isDeleting } = useDeleteStore();
  const { mutate: update, isPending } = useUpdateStore();

  const form = useForm<z.infer<typeof storeSchema>>({
    resolver: zodResolver(storeSchema),
    defaultValues: initialData ?? {
      name: "",
    },
  });

  async function onSubmit(values: z.infer<typeof storeSchema>) {
    update(
      { ...values, storeId: params.storeId },
      {
        onSuccess: () => {
          router.refresh();
        },
      },
    );
  }

  async function onConfirm() {
    remove(
      { storeId: params.storeId },
      {
        onSuccess: () => {
          router.refresh();
          router.push("/");
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
      <Heading title="Settings" description="Manage store preferences">
        <Button
          variant="destructive"
          size="icon"
          disabled={isPending}
          onClick={() => setIsOpen(true)}
        >
          <TrashIcon />
        </Button>
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
                  <FormLabel>Store name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="store name"
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
              Save changes {isPending && <Spinner />}
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
      <ApiAlert
        title="NEXT_PUBLIC_API_URL"
        description={`${origin}/api/${params.storeId}`}
        variant="public"
      />
    </>
  );
}
