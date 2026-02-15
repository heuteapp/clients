"use client";
import { createContext, forwardRef, use, useContext, useEffect, useLayoutEffect, useRef, useState } from "react";
import styles from "./dayboard.module.css";

var mounted = false;

export default function Dayboard() {
    useEffect(() => {
        if (!mounted) {
            mounted = true;
        }
        else {
            throw new Error("Dayboard component is already mounted. This should never happen.");
        }
    }, [])

    const panelRef = useRef<HTMLDivElement>(null);
    const [ready, setReady] = useState(false);

    useLayoutEffect(() => {
        if (panelRef.current) {
            setReady(true);
        }
    }, []);

    const [panelSize, setPanelSize] = useState({ width: 0, height: 0 });

    useEffect(() => {
        const el = panelRef.current;
        if (!el) return;

        const observer = new ResizeObserver((entries) => {
            for (let entry of entries) {
                setPanelSize({
                    width: entry.contentRect.width,
                    height: entry.contentRect.height,
                });
            }
        });

        observer.observe(el);

        return () => observer.disconnect();
    }, []);

    const context : DayboardContextProps = {
        panelRef,
        panelSize
    };

    return (
        <div ref={panelRef} className={styles.body}>
            {ready && (
                <DayboardContext.Provider value={context}>
                    <DayboardLayout />
                {panelSize.width} {panelSize.height}
                </DayboardContext.Provider>
            )}
        </div>
    );
}

//

const DayboardContext = createContext<DayboardContextProps | null>(null);

type DayboardContextProps = {
    panelRef : React.RefObject<HTMLDivElement | null>;
    panelSize: { width: number; height: number };
};

//

const DayboardLayout = forwardRef<HTMLDivElement>(
    function DayboardLayout(props, ref) {
        return (
            <div ref={ref} className={styles.layout}>
                <DayboardGrid w={12} h={3} />
            </div>
        );
    }
);

const DayboardGrid = forwardRef<HTMLDivElement, DayboardGridProps>(
    function DayboardGrid(props, ref) {
        const context = useContext(DayboardContext);

        if (!context) {
            throw new Error("DayboardGrid must be used within a DayboardContext.Provider");
        }

        const panelWidth = context.panelSize.width;
        const panelHeight = context.panelSize.height;

        const possibleWidth = (panelWidth) / props.w;
        const possibleHeight = (panelHeight) / props.h;
        const fieldSize = Math.min(possibleWidth, possibleHeight);
        const cellSize = fieldSize * 0.9;

        return (
            <div ref={ref} className={styles.grid}>
                {Array.from({ length: props.w * props.h }).map((_, i) => (
                    <div key={i} className={styles.cell} style={{ display:"flex", flexDirection:"column" }}>
                        <div>{Math.floor(possibleWidth)}</div>
                        <div>{Math.floor(possibleHeight)}</div>
                        <div>{Math.floor(fieldSize)}</div>
                        <div>{Math.floor(cellSize)}</div>
                    </div>
                ))} 
            </div>
        );
    }
);

type DayboardGridProps = {
    w: number;
    h: number;
}

type DayboardGridDimensions = {
    posibleWidth: number;
    posibleHeight: number;
    fieldSize: number;
    cellSize: number;
}