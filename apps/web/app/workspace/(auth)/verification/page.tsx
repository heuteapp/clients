"use client";

import { useAuthContext } from "@/src/modules/ui-auth/hooks/useAuthContext";
import { useAuthHashParams } from "@/src/modules/ui-auth/hooks/useAuthHashParams";
import { Box, Button, Card, CircularProgress, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { isAwaitingRegistrationDone, isAwaitingRegistrationExpired, isAwaitingRegistrationPending } from "@/src/modules/auth/state/auth.machine";

export default function VerificationPage() {
    const authHash = useAuthHashParams();
    const router = useRouter();
    const { state, send } = useAuthContext();
    const [email, setEmail] = useState("");
    const [countdown, setCountdown] = useState(20);

    useEffect(() => {
        if (state.context.registration) {
            setEmail(state.context.registration.email);
        }
    }, [state.context.registration]);

    useEffect(() => {
        const handleFocus = () => {
            if (isAwaitingRegistrationPending(state)) {
                send({ type: "VERIFY_EMAIL_REQUEST" });
            }
        };

        window.addEventListener('focus', handleFocus);
        
        return () => {
            window.removeEventListener('focus', handleFocus);
        };
    }, [state, send]);

    useEffect(() => {
        if (isAwaitingRegistrationExpired(state)) {
            const timer = setInterval(() => {
                setCountdown((prev) => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        router.push('/workspace/sign-up');
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);

            return () => clearInterval(timer);
        }
    }, [state, router]);

    const handleAssume = () => {
        send({ type: "VERIFY_EMAIL_ASSUME" });
    };

    if(isAwaitingRegistrationDone(state)) {
        return (
            <Card sx={{ 
                padding: 4, 
                maxWidth: 450, 
                borderRadius: 3,
                boxShadow: 3,
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

    if(isAwaitingRegistrationExpired(state)) {
        return (
            <Card sx={{ padding: 3, maxWidth: 400, margin: 16 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 2 }}>
                    <ErrorOutlineIcon sx={{ fontSize: 40, color: 'error.main' }} />
                    <Typography variant="h4" component="h1" sx={{ 
                        fontWeight: 600
                    }}>
                        Verification Expired
                    </Typography>
                </Box>
                
                <Typography sx={{ mb: 2, textAlign: "center" }}>
                    The verification link for <strong>{email}</strong> has expired.
                </Typography>
                
                <Typography sx={{ 
                    mb: 3, 
                    textAlign: "center",
                    color: "text.secondary"
                }}>
                    Please sign up again.
                </Typography>

                <Typography sx={{ 
                    mb: 2, 
                    textAlign: "center",
                    color: "text.secondary",
                    fontWeight: "bold"
                }}>
                    Redirecting in {countdown} second{countdown !== 1 ? 's' : ''}...
                </Typography>
                
                <Button 
                    variant="contained" 
                    fullWidth
                    onClick={() => send({ type: "VERIFY_EMAIL_FINALIZE" })}
                    sx={{
                        borderRadius: 2,
                        textTransform: "none"
                    }}
                >
                    Sign Up Now
                </Button>
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

            <Button 
                variant="outlined" 
                fullWidth
                onClick={handleAssume}
                sx={{
                    mt: 2,
                    borderRadius: 2,
                    textTransform: "none"
                }}
            >
                Already verified? Sign In
            </Button>
        </Card>
    );
}