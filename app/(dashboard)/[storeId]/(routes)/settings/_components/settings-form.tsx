"use client";
import { TrashIcon } from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import axios from "axios";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Store } from "@/lib/generated/prisma/client";
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
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
});

export function SettingsForm({ initialData }: { initialData: Store }) {
  const [loading, setLoading] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const router = useRouter();
  const params = useParams();
  const origin = useOrigin();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData ?? {
      name: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);

      await axios.patch(`/api/stores/${params.storeId}`, values);
      toast.success("Store updated successfully");
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
      await axios.delete(`/api/stores/${params.storeId}`);
      toast.success("Store deleted successfully");
      router.refresh();
      router.push("/");
    } catch {
      toast.error("Something went wrong!!");
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
      <Heading title="Settings" description="Manage store preferences">
        <Button
          variant="destructive"
          size="icon"
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
              Save changes {loading && <Spinner />}
            </Button>
          </div>
        </form>
      </Form>
      <ApiAlert
        title="NEXT_PUBLIC_API_URL"
        description={`${origin}/api/stores/${params.storeId}`}
        variant="public"
      />
    </>
  );
}
