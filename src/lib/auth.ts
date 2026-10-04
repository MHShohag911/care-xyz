import { getUserByEmail } from "@/models/user";
import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                email: {},
                password: {},
            },

            async authorize(credentials) {
                console.log(credentials);

                const email = credentials?.email as string;
                const password = credentials?.password as string;

                if (!email || !password) {
                    return null;
                }

                const user = await getUserByEmail(email);

                if (!user || !user.password) {
                    return null;
                }

                const isPasswordValid = await bcrypt.compare(
                    password,
                    user.password
                );

                if (!isPasswordValid) {
                    return null;
                }

                return {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                }
            }
        }),

        Google({
            clientId: process.env.AUTH_GOOGLE_ID,
            clientSecret: process.env.AUTH_GOOGLE_SECRET,
        }),
    ],
})