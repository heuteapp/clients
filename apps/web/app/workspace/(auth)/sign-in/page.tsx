import React, { useState } from "react";
import { Card, Typography, TextField, Button, Link, CircularProgress, Box } from "@mui/material";
import { useAuthContext } from "@/src/ui/hooks/useAuthContext";
import NextLink from 'next/link';

export default function SignInPage() {
  const { manager: authManager } = useAuthContext();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    if (!authManager.current) {
      console.error("Auth manager is not initialized.");
      setError("Authentication system is not available. Please try again later.");
      setLoading(false);
      return;
    }

    try {
      await authManager.current.signIn({ identifier, password });
    } catch (err) {
      console.error("Sign-in error:", err);
      setError("Failed to sign in.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card sx={{ padding: 3, maxWidth: 400, margin: 16 }}>
      <Typography variant="h4" component="h1" sx={{ mb: 2, textAlign: "center" }}>
        Sign in
      </Typography>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <TextField
          label="Username"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          placeholder="username or email"
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
        <Button type="submit" variant="contained" disabled={loading} sx={{ position: "relative" }}>
          {loading ? <CircularProgress size={24} sx={{ color: "white" }} /> : "Sign in"}
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
        Don’t have an account?{" "}
        <Link component={NextLink} href="/workspace/sign-up" underline="hover">
          Sign up
        </Link>
      </Typography>
    </Card>
  );
}