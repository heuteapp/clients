'use client';

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/src/stores/auth.store";
import Monitor from "@/src/ui/components/workspace/Monitor";
import Sidebar from "@/src/ui/components/workspace/Sidebar";
import BoardProvider from "@/src/ui/components/workspace/board/BoardProvider";

export default function WorkspaceLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { profile, loadAuth, setAuth } = useAuthStore();
  const router = useRouter();
  const rootRef = useRef<HTMLDivElement | null>(null);
  
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

  return (
    <div ref={rootRef} style= {{
      display: "flex",
      height: "100vh",
      width: "100vw",
      overflow: "hidden",
    }}>
      <BoardProvider rootRef={rootRef}>
        <Sidebar />
        <Monitor>
            {children}
        </Monitor>
      </BoardProvider>
    </div>
  )
}