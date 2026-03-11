'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Panel from "@/src/ui/components/main/Panel";
import { useAuthStore } from "@/src/stores/auth.store";

export default function WorkspaceLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { profile, loadAuth, setAuth } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if(profile) return;
    const auth = loadAuth();
    
    if(!auth || !auth.accessToken || !auth.profile) {
      router.push("/login");
      return;
    }

    setAuth(auth.accessToken, auth.profile);
  }, []);

  if (!profile) return null;

  return <Panel>{children}</Panel>;
}