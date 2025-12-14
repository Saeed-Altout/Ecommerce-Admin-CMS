"use client";

import { useState } from "react";
import { toast } from "sonner";
import axios from "axios";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useStoreModal } from "@/hooks/use-store-modal";

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
import { Modal } from "@/components/ui/modal";
import { Spinner } from "@/components/ui/spinner";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
});

export function StoreModal() {
  const isOpen = useStoreModal((state) => state.isOpen);
  const onClose = useStoreModal((state) => state.onClose);

  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);

      const response = await axios.post("/api/stores", values);
      toast.success("Store created successfully");
      window.location.href = `/${response.data.id}`;
    } catch {
      toast.error("Something went wrong!!");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Modal
      title="Create Store"
      description="Add a new store to manage products and categories"
      isOpen={isOpen}
      onClose={onClose}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="E-Commerce"
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center justify-end gap-x-2">
            <Button
              type="button"
              variant="outline"
              disabled={loading}
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              Continue {loading && <Spinner />}
            </Button>
          </div>
        </form>
      </Form>
    </Modal>
  );
}
