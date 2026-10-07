"use client";

import { signOut } from "next-auth/react";
import { Button } from "@heroui/react";

export default function LogoutButton() {
  return (
    <Button
      type="button"
      variant="danger"
      onPress={() => signOut({ redirectTo: "/login" })}
    >
      Logout
    </Button>
  );
}