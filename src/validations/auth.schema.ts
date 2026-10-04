import z from "zod";

export const registerSchema = z.object({
    nid: z.string().min(1, "NID is required."),

    name: z.string().min(2, "Name must be at least 2 characters."),

    email: z.string().email("Please enter a valid email address."),

    phone: z.string().min(10, "Please enter a valid phone number"),

    password: z.string().min(6, "Password must be at least 6 Characters.").regex(/[A-Z]/, "Password must contain at least one uppercase letter.").regex(/[a-z]/, "Password must contain at least one lowercase letter.")
});

export type RegisterFormdata = z.infer<typeof registerSchema>