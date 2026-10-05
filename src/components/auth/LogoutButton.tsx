"use client"

import { Button } from '../ui/Button';
import { signOut } from 'next-auth/react';

const LogoutButton =  () => {
    return (
        <div>
            <Button
                onPress={() => signOut({ redirectTo: "/login" })}
                variant="secondary"
            >
                Logout
            </Button>
        </div>
    );
};

export default LogoutButton;