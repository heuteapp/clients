"use client";
import React, { useState } from "react";
import { Card, Typography, TextField, Button, Link, CircularProgress, Box } from "@mui/material";
import { useAuthContext } from "@/src/ui/hooks/useAuthContext";
import NextLink from 'next/link';

export default function SignUpPage() {
  const { manager: authManager } = useAuthContext();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    if (!authManager.current) {
      console.error("Auth manager is not initialized.");
      setError("Authentication system is not available. Please try again later.");
      setLoading(false);
      return;
    }

    try {
      await authManager.current.signUp({ username, email, password });
    } catch (err) {
      console.error("Sign-up error:", err);
      setError("Failed to sign up.");
    } finally {
      setLoading(false);
    }
  };

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
          error={!!error}
          disabled={loading}
        />
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email@example.com"
          required
          error={!!error}
          disabled={loading}
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••"
          required
          error={!!error}
          disabled={loading}
        />
        <TextField
          label="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="••••••"
          required
          error={!!error}
          disabled={loading}
        />
        <Button type="submit" variant="contained" disabled={loading} sx={{ position: "relative" }}>
          {loading ? <CircularProgress size={24} sx={{ color: "white" }} /> : "Sign up"}
        </Button>
      </form>
      <Box sx={{ mt: 2, textAlign: "center", minHeight: 24 }}>
        {error && (
          <Typography color="error" >
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
    </Card>
  );
}