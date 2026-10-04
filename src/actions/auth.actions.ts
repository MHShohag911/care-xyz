"use server";

import { getDatabase } from "@/lib/mongodb";
import { registerSchema } from "@/validations/auth.schema";
import bcrypt from "bcryptjs";

export async function registerUser(data: unknown){
    const result = registerSchema.safeParse(data);

    if(!result.success){
        return {
            success: false,
            message: "Please check your registration information.",
            errors: result.error.flatten().fieldErrors,
        };
    }

    const {nid, name, email, phone, password} = result.data;

    const db = await getDatabase();

    const existingUser = await db.collection("users").findOne({
        email: email.toLowerCase(),
    });

    if(existingUser){
        return {
            success: false,
            message: "An account with this email already exists.",
        };
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await db.collection("users").insertOne({
        nid,
        name,
        email: email.toLowerCase(),
        phone, 
        password: hashedPassword,
        role: "user",
        createdAt: new Date(),
        updatedAt: new Date(),
    });

    return {
        success: true,
        message: "Registration successful."
    }
}