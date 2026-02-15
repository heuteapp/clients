"use client";
import { createContext, forwardRef, useContext, useEffect, useLayoutEffect, useRef, useState } from "react";
import styles from "./dayboard.module.css";

var mounted = false;

const context = createContext<DayboardContext | null>(null);

type DayboardContext = {
    panelRef : React.RefObject<HTMLDivElement | null>;
};

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

    return (
        <div ref={panelRef} className={styles.body}>
            {ready && (
                <context.Provider value={{ panelRef }}>
                    <DayboardLayout />
                </context.Provider>
            )}
        </div>
    );
}

//

const DayboardLayout = forwardRef<HTMLDivElement>(
    function DayboardLayout(props, ref) {
        return (
            <div ref={ref} className="dayboard-layout" style={{ display: "flex", width: "100%", height: "100%" }}>
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
        const c = useContext(context);

        return (
            <div ref={ref} className={styles.grid}>
                {Array.from({ length: props.w * props.h }).map((_, i) => (
                    <div key={i} className={styles.cell} >
                        {c?.panelRef?.current?.getBoundingClientRect()?.width ?? "sdf"}
                    </div>
                ))}
            </div>
        );
    }
);