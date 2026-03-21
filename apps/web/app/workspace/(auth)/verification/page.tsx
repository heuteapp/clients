"use client";

import { Card, Typography, Button } from "@mui/material";
import router from "next/router";
import { useState } from "react";

export default function VerificationPage() {
    const [email, setEmail] = useState("");

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
                variant="contained" 
                onClick={() => router.push("/workspace/sign-in")}
                fullWidth
            >
                Go to Sign In
            </Button>
        </Card>
    );
}