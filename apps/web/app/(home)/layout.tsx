'use client';

import { useRef } from "react";
import { StickyNavbar } from "@/src/ui/components/StickyNavbar";

export default function WorkspaceLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const rootRef = useRef<HTMLDivElement | null>(null);

    return (
        <div ref={rootRef}>
            <StickyNavbar />
            {children}
        </div>
    )
}