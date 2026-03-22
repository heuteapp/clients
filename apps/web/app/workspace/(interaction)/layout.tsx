'use client';

import { useRef } from "react";
import Monitor from "@/src/ui/components/workspace/Monitor";
import BoardProvider from "@/src/ui/components/workspace/BoardProvider";

export default function WorkspaceLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const rootRef = useRef<HTMLDivElement | null>(null);

  return (
    <div ref={rootRef} style= {{
      display: "flex",
      height: "100%",
      width: "100%",
      overflow: "hidden",
      touchAction: "none",
      userSelect: "none",
    }}>
      <BoardProvider rootRef={rootRef}>
        <Monitor>
            {children}
        </Monitor>
      </BoardProvider>
    </div>
  )
}