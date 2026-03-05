import style from '@/src/styles/layout/Panel.module.css';

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