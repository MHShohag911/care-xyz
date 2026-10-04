export type UserRole = "user" | "admin";

export interface User {
    id?: string;
    name: string;
    email: string;
    password?: string;
    nid: string;
    phone: string;
    role: UserRole;
    photo?: string;
    createdAt: Date;
    updatedAt: Date;
}