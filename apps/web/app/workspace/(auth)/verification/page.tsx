"use client";

import { isAwaitingVerification, isVerifySuccessed } from "@/src/states/auth/auth.machine";
import { useAuthContext } from "@/src/ui/hooks/states/auth/useAuthContext";
import { useAuthHashParams } from "@/src/ui/hooks/states/auth/useAuthHashParams";
import { Card, CircularProgress, Typography } from "@mui/material";
import { useEffect, useState } from "react";

export default function VerificationPage() {
    const authHash = useAuthHashParams();

    const { state, send } = useAuthContext();
    const [email, setEmail] = useState("");

    useEffect(() => {
        if (state.context.registration) {
            setEmail(state.context.registration.email);
        }
    }, [state.context.registration]);

    useEffect(() => {
        const handleFocus = () => {
            if (isAwaitingVerification(state)) {
                send({ type: "VERIFY_EMAIL" });
            }
        };

        window.addEventListener('focus', handleFocus);
        
        return () => {
            window.removeEventListener('focus', handleFocus);
        };
    }, [state, send]);

    if(authHash) {
        return (
            <CircularProgress />
        )
    }

    if(isVerifySuccessed(state)) {
        return (
            <Card sx={{ 
                padding: 4, 
                maxWidth: 450, 
                borderRadius: 3,
                boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
                textAlign: "center"
            }}>
                <Typography variant="h4" component="h1" sx={{ 
                    mb: 3, 
                    fontWeight: 600,
                    color: "success.main"
                }}>
                    ✓ Email Verified
                </Typography>
                <Typography sx={{ 
                    mb: 2, 
                    fontSize: "1.1rem",
                    color: "text.secondary"
                }}>
                    Your email has been successfully verified.
                </Typography>
                <Typography sx={{ 
                    fontSize: "0.95rem",
                    color: "text.secondary"
                }}>
                    You can now close this page.
                </Typography>
            </Card>
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