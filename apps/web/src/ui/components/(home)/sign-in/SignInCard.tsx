import React, { useState } from "react";
import { Card, Typography, TextField, Button, Link } from "@mui/material";
import { server } from "@/src/api/server";

export default function SignInCard() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    server.auth.signIn({ identifier, password }).then((response) => {
      console.log("Sign in successful:", response);
    }).catch((error) => {
      console.error("Sign in failed:", error);
    });
  };

  return (
    <Card sx={{ padding: 3, maxWidth: 400, margin: "auto" }}>
      <Typography variant="h4" component="h1" sx={{ mb: 2, textAlign: "center" }}>
        Sign in
      </Typography>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <TextField
          label="Username"
          type="username"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          placeholder="your.username"
          required
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••"
          required
        />
        <Button type="submit" variant="contained">
          Sign in
        </Button>
      </form>
      <Typography sx={{ mt: 2, textAlign: "center" }}>
        Don’t have an account?{" "}
        <Link href="#" underline="hover">
          Sign up
        </Link>
      </Typography>
    </Card>
  );
}