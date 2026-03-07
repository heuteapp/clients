"use client";
import style from '../body.module.css';
import Sidebar from './Sidebar';
import Monitor from './Monitor';
import { useRef } from 'react';
import BoardProvider from '@/src/domain/board/components/BoardProvider';

interface PanelProps {
    children: React.ReactNode;
}

function Panel({ children }: PanelProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className={style.panel}>
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