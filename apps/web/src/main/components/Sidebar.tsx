"use client";
import { useBoardContext } from '@/src/core/domain/board/board.hooks';
import style from '../main.module.css';
import { BoardContextValue } from '@/src/core/domain/board/board.context';

function Sidebar() {

  return (
    <div className={style.sidebar}>
      <SidebarItem onPointerDown={(context) => {
          context.interaction.startCardCreate({
            colSpan: 9,
            rowSpan: 4,
          });
      }} />
      <SidebarItem onPointerDown={(context) => {
          context.interaction.startCardCreate({
            colSpan: 6,
            rowSpan: 4,
          });
      }} />
      <SidebarItem onPointerDown={(context) => {
          context.interaction.startCardCreate({
            colSpan: 9,
            rowSpan: 2,
          });
      }} />
      <SidebarItem onPointerDown={(context) => {
          context.interaction.startCardCreate({
            colSpan: 6,
            rowSpan: 2,
          });
      }} />
    </div>
  )
}

export default Sidebar;

function SidebarItem({ onPointerDown } : { onPointerDown: (context: BoardContextValue) => void }) {
    const context = useBoardContext();

  return (
    <div
      style={{
        width:48,
        height:48,
        backgroundColor: '#ffffff',
        border: '1px solid #cccccc',
        userSelect: 'none',
        cursor: context.interaction.eventType === "create" ? "default" : "pointer",
      }}
      onPointerDown={() => { onPointerDown(context); }}
    >
    </div>
  )
}