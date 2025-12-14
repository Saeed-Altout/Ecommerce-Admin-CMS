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
import { useOrigin } from "@/hooks/use-origin";

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

const formSchema = z.object({
  label: z.string().min(2, {
    message: "Label must be at least 2 characters.",
  }),
  imageUrl: z.url({
    message: "Image URL must be a valid URL.",
  }),
});

export function BillboardForm({ initialData }: { initialData: Billboard }) {
  const [loading, setLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const router = useRouter();
  const params = useParams();
  const origin = useOrigin();

  const title = initialData ? "Edit billboard" : "Create billboard";
  const description = initialData ? "Edit billboard" : "Add a new billboard";
  const toastMessage = initialData
    ? "Billboard updated successfully"
    : "Billboard created successfully";
  const action = initialData ? "Save changes" : "Create";

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData ?? {
      label: "",
      imageUrl: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);

      await axios.patch(`/api/billboards/${params.billboardId}`, values);
      toast.success(toastMessage);
      router.refresh();
    } catch {
      toast.error("Something went wrong!!");
    } finally {
      setLoading(false);
    }
  }

  async function onConfirm() {
    try {
      setLoading(true);
      await axios.delete(`/api/billboards/${params.billboardId}`);
      toast.success("Billboard deleted successfully");
      router.refresh();
      router.push("/");
    } catch {
      toast.error("Something went wrong!!");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {initialData && (
        <AlertModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          loading={loading}
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
              name="label"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Label</FormLabel>
                  <FormControl>
                    <Input placeholder="label" disabled={loading} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex items-center gap-x-2">
            <Button type="submit" disabled={loading}>
              {action} {loading && <Spinner />}
            </Button>
          </div>
        </form>
      </Form>
      <ApiAlert
        title="NEXT_PUBLIC_API_URL"
        description={`${origin}/api/billboards/${params.billboardId}`}
        variant="public"
      />
      <ApiAlert
        title="NEXT_PUBLIC_ADMIN_API_URL"
        description={`${origin}/api/billboards/${params.billboardId}`}
        variant="admin"
      />
    </>
  );
}
