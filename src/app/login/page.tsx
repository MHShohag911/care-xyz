"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button, Card, Form, Input, Label, Link, TextField } from "@heroui/react";
import { Suspense, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

const loginSchema = z.object({
    email: z.string().email("Please enter a valid email address."),
    password: z.string().min(1, "Password is required."),
});
type LoginFormData = z.infer<typeof loginSchema>;

const LoginForm = () => {
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();
    
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: LoginFormData) => {
        // console.log(data);
        const callbackUrl = searchParams.get("callbackUrl") || "/";

        setIsLoading(true);
        setMessage("");
        router.push(callbackUrl);

        try {
            const result = await signIn("credentials", {
                email: data.email,
                password: data.password,
                redirect: false,
            });

            if (result?.error) {
                setMessage("Invalid email or password.");
                return;
            }

            router.push(callbackUrl)
        } catch (error) {
            setMessage("Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <div className="py-12">
            <h1 className="text-3xl text-center font-bold">Login </h1>
            <Card className="w-full max-w-md mx-auto my-6 shadow-xl">
                <Card.Header>
                    <Card.Title>Login</Card.Title>
                    <Card.Description>Enter your credentials to access your account</Card.Description>
                </Card.Header>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Card.Content>
                        <div className="flex flex-col gap-4">
                            <TextField name="email" type="email">
                                <Label>Email</Label>
                                <Input placeholder="email@example.com" variant="secondary" {...register("email")} />

                                {errors.email && (<p className="mt-1 text-sm text-red-500"> {errors.email.message} </p>)}
                            </TextField>
                            <TextField name="password" type="password">
                                <Label>Password</Label>
                                <Input placeholder="••••••••" variant="secondary" {...register("password")} />

                                {errors.password && (<p className="mt-1 text-sm text-red-500"> {errors.password.message} </p>)}
                            </TextField>
                        </div>
                    </Card.Content>
                    <Card.Footer className="mt-4 flex flex-col gap-2">
                        {message && (
                            <p className="text-sm text-red-500" role="alert">
                                {message}
                            </p>
                        )}
                        <Button type="submit" className="w-full" isDisabled={isLoading}>
                            {isLoading ? "Signing in..." : "Sign In"}
                        </Button>
                        <Link className="text-center text-sm" href="#">
                            Forgot password?
                        </Link>
                    </Card.Footer>
                </Form>
                <p className="mt-6 text-center text-sm text-gray-500"> Don't have an account?{" "} <a href="/register" className="font-medium text-black underline"> Register </a> </p>
            </Card>
        </div>
    );
};

// export default LoginForm;

export default function LoginPage() {
  return (
    <Suspense fallback={<p>Loading login...</p>}>
      <LoginForm />
    </Suspense>
  );
}