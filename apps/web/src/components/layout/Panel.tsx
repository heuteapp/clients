"use client";
import style from '@/src/styles/layout/Panel.module.css';
import Sidebar from './Sidebar';
import Monitor from './Monitor';

interface PanelProps {
    children: React.ReactNode;
}

function Panel({ children }: PanelProps) {
  return (
    <div className={style.panel}>
        <Sidebar />
        <Monitor>
            {children}
        </Monitor>
    </div>
  )
}

export default Panel