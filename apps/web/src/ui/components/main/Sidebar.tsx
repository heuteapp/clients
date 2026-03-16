"use client";
import { useAuthStore } from '@/src/stores/auth.store';
import { useBoardContext } from '@/src/ui/hooks/board/useBoardContext';
import style from "@/src/ui/styles/main.module.css"
import { BoardContextValue } from '@/src/ui/types/board/board.context';

function Sidebar() {
  const profile = useAuthStore(state => state.profile);
  const logout = useAuthStore(state => state.logout);

  return (
    <div className={style.sidebar}>
      <div>
        <SidebarCardItem onPointerDown={(context) => {
            context.interaction.startCardCreate({
              colSpan: 9,
              rowSpan: 4,
            });
        }} />
        <SidebarCardItem onPointerDown={(context) => {
            context.interaction.startCardCreate({
              colSpan: 6,
              rowSpan: 4,
            });
        }} />
        <SidebarCardItem onPointerDown={(context) => {
            context.interaction.startCardCreate({
              colSpan: 9,
              rowSpan: 2,
            });
        }} />
        <SidebarCardItem onPointerDown={(context) => {
            context.interaction.startCardCreate({
              colSpan: 6,
              rowSpan: 2,
            });
        }} />
      </div>
      <div>
        <button
          style={{
            width: "100%",
            padding: "8px",
            backgroundColor: "#1890ff",
            color: "#ffffff",
            borderRadius: "4px",
          }}
        >
          {profile?.name}
        </button>
        <button 
          style={{
            width: "100%",
            padding: "8px",
            backgroundColor: "#ff4d4f",
            color: "#ffffff",
            border: "none",
            borderRadius: "4px",
          }}
          onPointerUp={() => {
            logout();
          }}
        >
          Log Out
        </button>
      </div>
    </div>
  )
}

export default Sidebar;

function SidebarCardItem({ onPointerDown } : { onPointerDown: (context: BoardContextValue) => void }) {
    const context = useBoardContext();

  return (
    <div
      style={{
        width:36,
        height:36,
        margin: 12,
        backgroundColor: '#ffffff',
        border: '1px solid #cccccc',
        userSelect: 'none',
        cursor: context.interaction.type === "creation" ? "default" : "pointer",
      }}
      onPointerDown={() => { onPointerDown(context); }}
    >
    </div>
  )
}