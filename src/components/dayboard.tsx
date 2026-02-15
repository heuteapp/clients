import { forwardRef } from "react";

export default function Dayboard() {

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
            <div ref={ref} className="dayboard-grid">
                {Array.from({ length: props.h }).map((_, i) => (
                    <div key={i} className="dayboard-row">
                        {Array.from({ length: props.w }).map((_, j) => (
                            <div key={j} className="dayboard-cell" />
                        ))}
                    </div>
                ))}
            </div>
        );
    }
);