import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@mood/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@mood/components/ui/form";
import { Input } from "@mood/components/ui/input";
import { toast } from "sonner";
import { useSbClient } from "@mood/hooks/useSbClient";

const FormSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export function SignInForm() {
  const client = useSbClient();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit({ email, password }: z.infer<typeof FormSchema>) {
    client.auth.signInWithPassword({ email, password }).catch((error) => {
      console.error(error);
      toast.error((error as Error).message);
    });
  }

  return (
    <Form {...form}>
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="you@hello.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="password" placeholder="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" variant="default" className="w-full">
          Sign in
        </Button>
      </form>
    </Form>
  );
}
