"use client";
import React, { useState } from "react";
import { Typography, TextField, Button, Link, CircularProgress, Box } from "@mui/material";
import NextLink from 'next/link';
import { useAuthContext } from "@/src/modules/ui-auth/hooks/useAuthContext";
import { isSigningIn } from "@/src/modules/d-auth/state/auth.machine";

export default function SignInPage() {
  const { state, send } = useAuthContext();
  
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const isLoading = isSigningIn(state);
  const error = state.context.error?.id == "signIn" ? state.context.error : null;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    send({ 
      type: "SIGN_IN_REQUEST", 
      input: { identifier, password }
    });
  };

  return (
    <Box sx={{ 
      width: 328, padding: 2,
    }}>
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
            <CircularProgress size={24} sx={{ color: "common.white" }} />
          ) : (
            "Sign in"
          )}
        </Button>
      </form>

      <Box sx={{ mt: 2, textAlign: "center", minHeight: 24 }}>
        {error && (
          <Typography color="error">
            {error.message}
          </Typography>
        )}
      </Box>

      <Typography sx={{ mt: 2, textAlign: "center" }}>
        Don’t have an account?{" "}
        <Link component={NextLink} href="/workspace/sign-up" underline="hover">
          Sign up
        </Link>
      </Typography>
    </Box>
  );
}