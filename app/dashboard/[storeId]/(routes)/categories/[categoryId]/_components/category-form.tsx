"use client";
import { useRouter, useParams } from "next/navigation";
import { useState } from "react";

import { TrashIcon } from "lucide-react";
import { toast } from "sonner";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  useCreateCategory,
  useDeleteCategory,
  useUpdateCategory,
} from "@/services/category/mutation";
import { Billboard, Category } from "@/lib/prisma/client";
import { categorySchema } from "@/schemas";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Heading } from "@/components/ui/heading";
import { Spinner } from "@/components/ui/spinner";
import { Separator } from "@/components/ui/separator";
import { AlertModal } from "@/components/modals/alert-modal";

export function CategoryForm({
  initialData,
  billboards,
}: {
  initialData: Category | null;
  billboards: Billboard[];
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const router = useRouter();
  const params = useParams<{ storeId: string; categoryId: string }>();

  const { mutate: remove, isPending: isDeleting } = useDeleteCategory();
  const { mutate: create, isPending: isCreating } = useCreateCategory();
  const { mutate: update, isPending: isUpdating } = useUpdateCategory();

  const isPending = isCreating || isUpdating;

  const title = initialData ? "Edit category" : "Create category";
  const description = initialData ? "Edit category" : "Add a new category";
  const toastMessage = initialData
    ? "Category updated successfully"
    : "Category created successfully";
  const action = initialData ? "Save changes" : "Create";

  const form = useForm<z.infer<typeof categorySchema>>({
    resolver: zodResolver(categorySchema),
    defaultValues: initialData ?? {
      name: "",
      billboardId: "",
    },
  });

  const onSuccess = () => {
    toast.success(toastMessage);
    router.push(`/dashboard/${params.storeId}/categories`);
    router.refresh();
  };

  async function onSubmit(values: z.infer<typeof categorySchema>) {
    if (initialData) {
      update(
        {
          ...values,
          storeId: params.storeId,
          categoryId: params.categoryId,
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
        categoryId: params.categoryId,
      },
      {
        onSuccess: () => {
          setIsOpen(false);
          router.push(`/dashboard/${params.storeId}/categories`);
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
            size="icon"
            disabled={isPending}
            variant="destructive"
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
                      placeholder="Category name"
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
              name="billboardId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Billboard</FormLabel>
                  <FormControl>
                    <Select
                      disabled={isPending}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <SelectTrigger
                        className="w-full"
                        disabled={billboards.length === 0}
                      >
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select a billboard"
                        />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Billboards</SelectLabel>
                          {billboards.map((billboard) => (
                            <SelectItem key={billboard.id} value={billboard.id}>
                              {billboard.label}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
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
