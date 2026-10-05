"use client";

import { registerUser } from "@/actions/auth.actions";
import { RegisterFormdata, registerSchema } from "@/validations/auth.schema";
import { Button, Card, Form, Input, Label, TextField } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

const Register = () => {
    const [message, setMessage] = useState("");
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
        const result = await registerUser(data);

        console.log(result);
        setMessage(result.message);

        if(result.success){
            reset();
            router.push("/login")
        }
    };

    return (
        <div className="py-12">
            <h1 className="text-3xl text-center font-bold">Create an Account</h1>
            <Card className="w-full max-w-md mx-auto my-6 shadow-xl">
                <Card.Header>
                    <Card.Title>Register</Card.Title>
                    <Card.Description>Enter your credentials to access your account</Card.Description>
                </Card.Header>
                <Form
                    onSubmit={handleSubmit(onSubmit)}
                    className="mt-8 space-y-5"
                >
                    <Card.Content>
                        <div className="flex flex-col gap-4">
                            <TextField name="nid" type="text">
                                <Label htmlFor="nid" className="block font-medium">
                                    NID
                                </Label>

                                <Input
                                    placeholder="Enter Your NID"
                                    variant="secondary"
                                    id="nid"
                                    // type="text"
                                    {...register("nid")}
                                    className="mt-2 w-full rounded-lg border px-4 py-3"
                                />

                                {errors.nid && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {errors.nid.message}
                                    </p>
                                )}
                            </TextField>

                            <TextField name="name" type="text">
                                <Label htmlFor="name" className="block font-medium">
                                    Name
                                </Label>

                                <Input
                                    id="name"
                                    placeholder="Enter Your Name"
                                    variant="secondary"
                                    // type="text"
                                    {...register("name")}
                                    className="mt-2 w-full rounded-lg border px-4 py-3"
                                />

                                {errors.name && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {errors.name.message}
                                    </p>
                                )}
                            </TextField>

                            <TextField name="email" type="email">
                                <Label htmlFor="email" className="block font-medium">
                                    Email
                                </Label>

                                <Input
                                    id="email"
                                    placeholder="youremail@example.com"
                                    variant="secondary"
                                    // type="email"
                                    {...register("email")}
                                    className="mt-2 w-full rounded-lg border px-4 py-3"
                                />

                                {errors.email && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {errors.email.message}
                                    </p>
                                )}
                            </TextField>

                            <TextField name="phone" type="tel">
                                <Label htmlFor="phone" className="block font-medium">
                                    Contact
                                </Label>

                                <Input
                                    id="phone"
                                    placeholder="Your Mobile Number"
                                    variant="secondary"
                                    // type="tel"
                                    {...register("phone")}
                                    className="mt-2 w-full rounded-lg border px-4 py-3"
                                />

                                {errors.phone && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {errors.phone.message}
                                    </p>
                                )}
                            </TextField>

                            <TextField type="password" name="password">
                                <Label htmlFor="password" className="block font-medium">
                                    Password
                                </Label>

                                <Input
                                    id="password"
                                    placeholder="********"
                                    variant="secondary"
                                    // type="password"
                                    {...register("password")}
                                    className="mt-2 w-full rounded-lg border px-4 py-3"
                                />

                                {errors.password && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {errors.password.message}
                                    </p>
                                )}
                            </TextField>
                        </div>
                    </Card.Content>

                    {message && (
                        <p className="text-sm" role="status">
                            {message}
                        </p>
                    )}

                    <Button
                        type="submit"
                        className="w-full"
                    >
                        Register
                    </Button>
                </Form>
                <p className="mt-6 text-center text-sm text-gray-500"> Already have an account?{" "} <a href="/login" className="font-medium text-black underline"> Login </a> </p>
            </Card>
        </div>
    );
};

export default Register;