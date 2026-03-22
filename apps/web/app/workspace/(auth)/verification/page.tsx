"use client";

import { isAwaitingVerification } from "@/src/states/auth/auth.machine";
import { useAuthContext } from "@/src/ui/hooks/states/auth/useAuthContext";
import { Card, Typography, Button, CircularProgress, Alert } from "@mui/material";
import { useEffect, useState } from "react";

export default function VerificationPage() {
    const { state, send } = useAuthContext();
    const [email, setEmail] = useState("");
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (state.context.registration) {
            setEmail(state.context.registration.email);
        }
    }, [state.context.registration]);

    useEffect(() => {
        if (state.matches('awaiting verification') && state.context.error) {
            setError(state.context.error);
        }
        
        if (state.matches('unauthenticated') && state.context.error?.includes('expired')) {
            setError("Verification link has expired. Please sign up again.");
        }
        
        if (state.matches('authenticated')) {
            window.location.href = "/workspace/sign-in";
        }
    }, [state]);

    useEffect(() => {
        const handleFocus = () => {
            console.log("Window focused, checking verification status...");
            if (isAwaitingVerification(state)) {
                send({ type: "VERIFY_EMAIL" });
            }
        };

        window.addEventListener('focus', handleFocus);
        
        return () => {
            window.removeEventListener('focus', handleFocus);
        };
    }, [state, send]);

    if(!isAwaitingVerification(state)) {
        return (
            <CircularProgress />
        )
    }

    return (
        <Card sx={{ padding: 3, maxWidth: 400, margin: 16 }}>
            <Typography variant="h4" component="h1" sx={{ mb: 2, textAlign: "center" }}>
                Verify Your Email
            </Typography>
            
            <Typography sx={{ mb: 2, textAlign: "center" }}>
                We've sent a verification email to <strong>{email}</strong>. 
                Please check your inbox and verify your email address to complete the registration.
            </Typography>
            
            <Typography sx={{ mb: 2, textAlign: "center", color: "text.secondary" }}>
                After verification, you can sign in to your account.
            </Typography>
        </Card>
    );
}