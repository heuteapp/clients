"use client";
import style from "@/src/ui/styles/main.module.css"
import Sidebar from './Sidebar';
import Monitor from './Monitor';
import { useRef } from 'react';
import BoardProvider from '@/src/ui/components/board/BoardProvider';

interface PanelProps {
    children: React.ReactNode;
}

function Panel({ children }: PanelProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);

  return (
    <div ref={rootRef} className={style.panel}>
      <BoardProvider rootRef={rootRef}>
        <Sidebar />
        <Monitor>
            {children}
        </Monitor>
      </BoardProvider>
    </div>
  )
}

export default Panel