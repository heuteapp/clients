"use client";
import { useBoardContext } from '@/src/domain/board/board.hooks';
import style from '../body.module.css';

function Sidebar() {
  const context = useBoardContext();

  return (
    <div className={style.sidebar}>
      <div
        style={{
          width:48,
          height:48,
          backgroundColor: '#ffffff',
          border: '1px solid #cccccc',
        }}
        onClick={() => {
          context.interaction.startCardCreate({ colSpan: 9, rowSpan: 2 });
        }}
      >

      </div>
    </div>
  )
}

export default Sidebar;