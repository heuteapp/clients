"use client";
import style from '../main.module.css';

interface MonitorProps {
    children: React.ReactNode;
}

function Monitor({ children }: MonitorProps) {
  return (
    <div className={style.monitor}>
      {children}
    </div>
  )
}

export default Monitor