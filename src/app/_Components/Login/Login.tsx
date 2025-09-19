"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { signIn } from "next-auth/react";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useSearchParams } from "next/navigation";
import { Badge } from "@/components/ui/badge";

const formSchema = z.object({
    email: z
        .string()
        .email("Invalid email address")
        .nonempty("Email is required")
        .trim(),
    password: z
        .string()
        .min(6, "Password must be at least 6 characters")
        .nonempty("Password is required"),
});

export default function LoginForm() {
    const searchParams = useSearchParams();
    const error = searchParams.get("error");
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        await signIn("credentials", {
            email: values.email,
            password: values.password,
            redirect: true,
            callbackUrl: "/products",
        });
    }

    return (
        <Card>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6 p-6 "
                >
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="you@example.com"
                                        {...field}
                                    />
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
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input
                                        type="password"
                                        placeholder="••••••••"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {error && (
                        <Badge
                            variant={"destructive"}
                            className="text-destructive-foreground w-full p-2"
                        >
                            Invalid email or password. Please try again.
                        </Badge>
                    )}
                    <Button type="submit" className="w-full">
                        Login
                    </Button>
                </form>
            </Form>
        </Card>
    );
}
