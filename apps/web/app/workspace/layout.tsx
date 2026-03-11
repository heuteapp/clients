'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Panel from "@/src/ui/components/main/Panel";
import { useAuthStore } from "@/src/stores/auth.store";

export default function WorkspaceLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { profile, isLoaded } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded && !profile) {
      router.push("/login");
    }
  }, [profile, isLoaded, router]);

  if (isLoaded && !profile) return null;

  return <Panel>{children}</Panel>;
}