"use client";
import { Box, Divider } from '@mui/material';
import styles from '@/src/ui/styles/layout/sidebar.module.css';

export default function HeuteSidebar() {
  return (
    <Box id="heute-sidebar" className={styles.body}>
        <div className={styles.container}>
            <SidebarItem text="Home" />
            {/*<SidebarItem text="6x2" onMouse={() => heuteApp.cardSize = { cols: 6, rows: 2 }} />
            <SidebarItem text="6x4" onMouse={() => heuteApp.cardSize = { cols: 6, rows: 4 }} />
            <SidebarItem text="3x2" onMouse={() => heuteApp.cardSize = { cols: 3, rows: 2 }} />
            <SidebarItem text="3x4" onMouse={() => heuteApp.cardSize = { cols: 3, rows: 4 }} />
            <SidebarItem text="9x2" onMouse={() => heuteApp.cardSize = { cols: 9, rows: 2 }} />
            <SidebarItem text="9x4" onMouse={() => heuteApp.cardSize = { cols: 9, rows: 4 }} />*/}
        </div>
        <Divider orientation="vertical" flexItem />
    </Box>
  );
}

//

const SidebarItem : React.FC<{text: string, onMouse?: (e: React.MouseEvent) => void}> = ({text, onMouse}) => {
    return (
        <div className={styles.item} onMouseDown={onMouse}>
            {text}
        </div>
    );
}