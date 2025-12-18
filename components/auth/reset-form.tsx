"use client";

import { useTransition } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { ResetSchema } from "@/schemas";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

import { Wrapper } from "./wrapper";
import { EmailInput } from "./email-input";

import { reset } from "@/actions/reset";
import { toast } from "sonner";

export function ResetForm() {
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values: z.infer<typeof ResetSchema>) => {
    startTransition(async () => {
      const result = await reset(values);
      if (result?.error) {
        toast.error(result.error);
      }
      if (result?.success) {
        toast.success(result.success);
      }
    });
  };

  return (
    <Wrapper
      title="Forgot your password?"
      description="Enter your email below to receive a password reset link"
      redirectTo={{ href: "/auth/login", label: "Back to login" }}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <EmailInput disabled={isPending} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending && <Spinner />}
            Reset
          </Button>
        </form>
      </Form>
    </Wrapper>
  );
}
