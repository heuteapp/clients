"use client";
import React, { useState, useEffect } from "react";
import { Typography, TextField, Button, Link, CircularProgress, Box } from "@mui/material";
import NextLink from 'next/link';
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/src/features/auth/hooks/useAuthContext";
import { isAuthenticated, isSigningUp } from "@/src/features/auth/state/auth.machine";

export default function SignUpPage() {
  const router = useRouter();
  const { state, send } = useAuthContext();
  
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const isLoading = isSigningUp(state);
  const error = state.context.error;

  useEffect(() => {
    if (isAuthenticated(state)) {
      router.push("/workspace");
    }
  }, [isAuthenticated(state), router]);

  const validatePasswords = () => {
    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return false;
    }
    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      return false;
    }
    if (!username.trim()) {
      setPasswordError("Username is required");
      return false;
    }
    if (!email.trim()) {
      setPasswordError("Email is required");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setPasswordError("Please enter a valid email address");
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

  return (
    <Box sx={{ width: 328, padding: 2 }}>
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
          helperText={error && !email ? error : ""}
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
            <CircularProgress size={24} sx={{ color: "common.white" }} />
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
    </Box>
  );
}