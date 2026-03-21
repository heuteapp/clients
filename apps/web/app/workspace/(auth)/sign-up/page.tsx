"use client";
import React, { useState, useEffect } from "react";
import { Card, Typography, TextField, Button, Link, CircularProgress, Box } from "@mui/material";
import NextLink from 'next/link';
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/src/ui/hooks/states/auth/useAuthContext";

export default function SignUpPage() {
  const router = useRouter();
  const { state, send } = useAuthContext();
  
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const isCheckingAuth = state.matches("checking auth") || state.matches("after checking auth done");
  const isLoading = state.matches("signing up");
  const isAuthenticated = state.matches("authenticated");
  const error = state.context.error;

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/workspace");
    }
  }, [isAuthenticated, router]);

  const validatePasswords = () => {
    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return false;
    }
    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      return false;
    }
    setPasswordError("");
    return true;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    if (!validatePasswords()) {
      return;
    }
    
    send({ 
      type: "SIGN_UP", 
      username,
      email,
      password 
    });
  };

  if (isCheckingAuth || isAuthenticated) {
    return <CircularProgress />;
  }

  return (
    <Card sx={{ padding: 3, maxWidth: 400, margin: 16 }}>
      <Typography variant="h4" component="h1" sx={{ mb: 2, textAlign: "center" }}>
        Sign up
      </Typography>
      
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <TextField
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="username"
          required
          error={!!error && !username}
          disabled={isLoading}
        />
        
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email@example.com"
          required
          error={!!error && !email}
          disabled={isLoading}
        />
        
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••"
          required
          error={!!passwordError}
          disabled={isLoading}
        />
        
        <TextField
          label="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="••••••"
          required
          error={!!passwordError}
          helperText={passwordError}
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
            "Sign up"
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
        Already have an account?{" "}
        <Link component={NextLink} href="/workspace/sign-in" underline="hover">
          Sign in
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