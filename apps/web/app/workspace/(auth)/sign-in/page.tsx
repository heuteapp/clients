"use client";
import React, { useState, useEffect } from "react";
import { Card, Typography, TextField, Button, Link, CircularProgress, Box } from "@mui/material";
import NextLink from 'next/link';
import { useRouter } from "next/navigation";
import { useAuthService } from "@/src/ui/hooks/states/auth/useAuthService";

export default function SignInPage() {
  const router = useRouter();
  const [state, send] = useAuthService();
  
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const isLoading = state.matches("signing in");
  const isAuthenticated = state.matches("authenticated");
  const error = state.context.error;

  useEffect(() => {
    /*if (isAuthenticated) {
      router.push("/workspace/dashboard");
    }*/
  }, [isAuthenticated, router]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    send({ 
      type: "SIGN_IN", 
      identifier, 
      password 
    });
  };

  return (
    <Card sx={{ padding: 3, maxWidth: 400, margin: 16 }}>
      <Typography variant="h4" component="h1" sx={{ mb: 2, textAlign: "center" }}>
        Sign in
      </Typography>
      
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <TextField
          label="Username or Email"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          placeholder="username or email"
          required
          error={!!error}
          disabled={isLoading}
        />
        
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••"
          required
          error={!!error}
          disabled={isLoading}
        />
        
        <Button 
          type="submit" 
          variant="contained" 
          disabled={isLoading} 
          sx={{ position: "relative", height: 36 }}
        >
          {isLoading ? (
            <CircularProgress size={24} sx={{ color: "white" }} />
          ) : (
            "Sign in"
          )}
        </Button>
      </form>

      <Box sx={{ mt: 2, textAlign: "center", minHeight: 24 }}>
        {error && (
          <Typography color="error">
            {error}
          </Typography>
        )}
      </Box>

      <Typography sx={{ mt: 2, textAlign: "center" }}>
        Don’t have an account?{" "}
        <Link component={NextLink} href="/workspace/sign-up" underline="hover">
          Sign up
        </Link>
      </Typography>

      {process.env.NODE_ENV === 'development' && (
        <Box sx={{ mt: 4, p: 2, bgcolor: '#f5f5f523', borderRadius: 1 }}>
          <Typography variant="caption" component="pre" sx={{ fontSize: 10 }}>
            {JSON.stringify({ 
              state: state.value, 
              auth: state.context.auth,
              error: state.context.error 
            }, null, 2)}
          </Typography>
        </Box>
      )}
    </Card>
  );
}