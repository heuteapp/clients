"use client";
import style from '../body.module.css';

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