"use client";
import style from "@/src/ui/styles/main.module.css"

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