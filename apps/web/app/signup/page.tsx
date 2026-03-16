"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/src/stores/auth.store";
import { server } from "@/src/api/client";
import axios from "axios";

export default function SignupPage() {
  const router = useRouter();
  const { profile, accessToken, setAuth } = useAuthStore();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    useAuthStore.getState().hydrate();
  }, []);

  useEffect(() => {
    if (profile && accessToken) {
      router.push("/workspace/board/mihr");
    }
  }, [profile, accessToken, router]);

  const handleSignup = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      const res = await server.auth.signup({ name, email, password });

      // Eğer signup başarılı ise mail gönderildi mesajı
      setMessage("Ok! Mailine bir aktivasyon linki gönderildi.");
      
      // Eğer accessToken dönüyorsa otomatik login yapmak için:
      if (res.data.accessToken && res.data.profile) {
        const { accessToken, profile } = res.data;
        setAuth(accessToken, profile);
        router.push("/workspace");
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Signup işlemi sırasında hata oluştu");
      } else {
        setError("Signup işlemi sırasında hata oluştu");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "auto", padding: "2rem" }}>
      <h1>Sign Up</h1>
      <form
        onSubmit={handleSignup}
        style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
      >
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{ padding: "0.5rem", fontSize: "1rem" }}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ padding: "0.5rem", fontSize: "1rem" }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ padding: "0.5rem", fontSize: "1rem" }}
        />
        <button
          type="submit"
          disabled={loading}
          style={{ padding: "0.5rem", fontSize: "1rem" }}
        >
          {loading ? "Signing up..." : "Sign Up"}
        </button>
        {message && <p style={{ color: "green" }}>{message}</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
}