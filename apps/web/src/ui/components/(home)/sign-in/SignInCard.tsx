import React, { useState } from "react";
import { Card, Typography, TextField, Button, Link } from "@mui/material";

export default function SignInCard() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log({ name, password });
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
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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