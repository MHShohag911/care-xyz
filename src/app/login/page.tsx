"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Button,
  Card,
  Form,
  Input,
  Label,
  Link,
  TextField,
} from "@heroui/react";
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
    const callbackUrl = searchParams.get("callbackUrl") || "/";

    setIsLoading(true);
    setMessage("");

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

      router.push(callbackUrl);
      router.refresh();
    } catch (error) {
      console.error("Login failed:", error);
      setMessage("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-[calc(100vh-4rem)] bg-default-50 px-6 py-12">
      <div className="mx-auto flex max-w-md flex-col items-center">
        {/* Header */}
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            Welcome Back
          </p>

          <h1 className="mt-2 text-4xl font-bold tracking-tight">
            Sign in to Care.xyz
          </h1>

          <p className="mt-3 text-default-500">
            Access your account and manage your care bookings.
          </p>
        </div>

        {/* Login Card */}
        <Card className="mt-8 w-full shadow-sm">
          <Card.Header>
            <Card.Title>Login</Card.Title>

            <Card.Description>
              Enter your email and password to continue.
            </Card.Description>
          </Card.Header>

          <Form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full"
          >
            <Card.Content className="w-full">
              <div className="flex w-full flex-col gap-5">
                {/* Email */}
                <TextField
                  name="email"
                  type="email"
                  isInvalid={!!errors.email}
                  className="w-full"
                >
                  <Label>Email Address</Label>

                  <Input
                    placeholder="email@example.com"
                    {...register("email")}
                  />

                  {errors.email && (
                    <p className="text-sm text-danger">
                      {errors.email.message}
                    </p>
                  )}
                </TextField>

                {/* Password */}
                <TextField
                  name="password"
                  type="password"
                  isInvalid={!!errors.password}
                  className="w-full"
                >
                  <Label>Password</Label>

                  <Input
                    type="password"
                    placeholder="Enter your password"
                    {...register("password")}
                  />

                  {errors.password && (
                    <p className="text-sm text-danger">
                      {errors.password.message}
                    </p>
                  )}
                </TextField>
              </div>
            </Card.Content>

            <Card.Footer className="flex w-full flex-col gap-4">
              {message && (
                <p
                  className="w-full rounded-lg bg-danger-soft px-4 py-3 text-sm text-danger"
                  role="alert"
                >
                  {message}
                </p>
              )}

              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full my-5"
                isDisabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>

              <Link
                href="#"
                className="text-sm"
              >
                Forgot password?
              </Link>
            </Card.Footer>
          </Form>

          <div className="px-6 pb-6 text-center text-sm text-default-500">
            Don't have an account?{" "}
            <Link
              href="/register"
              className="font-medium"
            >
              Create an account
            </Link>
          </div>
        </Card>
      </div>
    </main>
  );
};

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
          <p className="text-default-500">Loading login...</p>
        </main>
      }
    >
      <LoginForm />
    </Suspense>
  );
}