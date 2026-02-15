import { forwardRef } from "react";
import styles from "./dayboard.module.css";

export default function Dayboard() {
    return (
        <div className={styles.body}>
            <DayboardLayout />
        </div>
    );
}

const DayboardLayout = forwardRef<HTMLDivElement>(
    function DayboardLayout(props, ref) {
        return (
            <div ref={ref} className="dayboard-layout">
                <DayboardGrid w={12} h={6} />
            </div>
        );
    }
);

type DayboardGridProps = {
    w: number;
    h: number;
}

const DayboardGrid = forwardRef<HTMLDivElement, DayboardGridProps>(
    function DayboardGrid(props, ref) {
        return (
            <div ref={ref} className={styles.grid}>
                {Array.from({ length: props.w * props.h }).map((_, i) => (
                    <div key={i} className={styles.cell} />
                ))}
            </div>
        );
    }
);