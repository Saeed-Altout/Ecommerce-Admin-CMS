"use client";
import { TrashIcon } from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import axios from "axios";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Billboard, Category } from "@/lib/generated/prisma/client";

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

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  billboardId: z.string().min(1, {
    message: "Billboard is required.",
  }),
});

export function CategoryForm({
  initialData,
  billboards,
}: {
  initialData: Category | null;
  billboards: Billboard[];
}) {
  const [loading, setLoading] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const router = useRouter();
  const params = useParams();

  const title = initialData ? "Edit category" : "Create category";
  const description = initialData ? "Edit category" : "Add a new category";
  const toastMessage = initialData
    ? "Category updated successfully"
    : "Category created successfully";
  const action = initialData ? "Save changes" : "Create";

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData ?? {
      name: "",
      billboardId: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);

      if (initialData) {
        await axios.patch(
          `/api/${params.storeId}/categories/${params.categoryId}`,
          values,
        );
      } else {
        await axios.post(`/api/${params.storeId}/categories`, values);
      }

      toast.success(toastMessage);
      router.push(`/${params.storeId}/categories`);
      router.refresh();
    } catch {
      toast.error("Something went wrong!!");
    } finally {
      setLoading(false);
    }
  }

  async function onConfirm() {
    try {
      setIsDeleting(true);
      await axios.delete(
        `/api/${params.storeId}/categories/${params.categoryId}`,
      );
      toast.success("Category deleted successfully");
      router.push(`/${params.storeId}/categories`);
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
                      disabled={loading || isDeleting}
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
                      disabled={loading || isDeleting}
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
            <Button type="submit" disabled={loading || isDeleting}>
              {action} {loading && <Spinner />}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
