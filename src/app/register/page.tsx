"use client";

import { registerUser } from "@/actions/auth.actions";
import {
  Button,
  Card,
  Form,
  Input,
  Label,
  Link,
  TextField,
} from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  RegisterFormdata,
  registerSchema,
} from "@/validations/auth.schema";

const Register = () => {
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterFormdata>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormdata) => {
    setIsLoading(true);
    setMessage("");

    try {
      const result = await registerUser(data);

      setMessage(result.message);

      if (result.success) {
        reset();
        router.push("/login");
      }
    } catch (error) {
      console.error("Registration failed:", error);
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
            Get Started
          </p>

          <h1 className="mt-2 text-4xl font-bold tracking-tight">
            Create your Care.xyz account
          </h1>

          <p className="mt-3 text-default-500">
            Create an account to book and manage your care services.
          </p>
        </div>

        {/* Registration Card */}
        <Card className="mt-8 w-full shadow-sm">
          <Card.Header>
            <Card.Title>Create Account</Card.Title>

            <Card.Description>
              Enter your information to create your account.
            </Card.Description>
          </Card.Header>

          <Form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full"
          >
            <Card.Content className="w-full">
              <div className="flex w-full flex-col gap-5">
                {/* NID */}
                <TextField
                  name="nid"
                  type="text"
                  isInvalid={!!errors.nid}
                  className="w-full"
                >
                  <Label>National ID (NID)</Label>

                  <Input
                    placeholder="Enter your NID"
                    {...register("nid")}
                  />

                  {errors.nid && (
                    <p className="text-sm text-danger">
                      {errors.nid.message}
                    </p>
                  )}
                </TextField>

                {/* Name */}
                <TextField
                  name="name"
                  type="text"
                  isInvalid={!!errors.name}
                  className="w-full"
                >
                  <Label>Full Name</Label>

                  <Input
                    placeholder="Enter your full name"
                    {...register("name")}
                  />

                  {errors.name && (
                    <p className="text-sm text-danger">
                      {errors.name.message}
                    </p>
                  )}
                </TextField>

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

                {/* Phone */}
                <TextField
                  name="phone"
                  type="tel"
                  isInvalid={!!errors.phone}
                  className="w-full"
                >
                  <Label>Phone Number</Label>

                  <Input
                    type="tel"
                    placeholder="Enter your mobile number"
                    {...register("phone")}
                  />

                  {errors.phone && (
                    <p className="text-sm text-danger">
                      {errors.phone.message}
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
                    placeholder="Create a password"
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
                  className="w-full rounded-lg bg-default-100 px-4 py-3 text-sm"
                  role="status"
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
                {isLoading ? "Creating account..." : "Create Account"}
              </Button>
            </Card.Footer>
          </Form>

          <div className="px-6 pb-6 text-center text-sm text-default-500">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium"
            >
              Sign in
            </Link>
          </div>
        </Card>
      </div>
    </main>
  );
};

export default Register;