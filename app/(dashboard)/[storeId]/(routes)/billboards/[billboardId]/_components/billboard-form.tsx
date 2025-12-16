"use client";
import { TrashIcon } from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import axios from "axios";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Billboard } from "@/lib/generated/prisma/client";

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

const formSchema = z.object({
  label: z.string().min(2, {
    message: "Label must be at least 2 characters.",
  }),
  imageUrl: z.url({
    message: "Image URL must be a valid URL.",
  }),
});

export function BillboardForm({
  initialData,
}: {
  initialData: Billboard | null;
}) {
  const [loading, setLoading] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const router = useRouter();
  const params = useParams();

  const title = initialData ? "Edit billboard" : "Create billboard";
  const description = initialData ? "Edit billboard" : "Add a new billboard";
  const toastMessage = initialData
    ? "Billboard updated successfully"
    : "Billboard created successfully";
  const action = initialData ? "Save changes" : "Create";

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? {
          label: initialData.label,
          imageUrl: initialData.image,
        }
      : {
          label: "",
          imageUrl: "",
        },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);

      if (initialData) {
        await axios.patch(
          `/api/${params.storeId}/billboards/${params.billboardId}`,
          values,
        );
      } else {
        await axios.post(`/api/${params.storeId}/billboards`, values);
      }

      toast.success(toastMessage);
      router.push(`/${params.storeId}/billboards`);
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
        `/api/${params.storeId}/billboards/${params.billboardId}`,
      );
      toast.success("Billboard deleted successfully");
      router.push(`/${params.storeId}/billboards`);
      router.refresh();
    } catch {
      toast.error("Make sure you removed all categories using this billboard");
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
                    disabled={loading || isDeleting}
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
                      disabled={loading || isDeleting}
                      {...field}
                    />
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
