"use client";
import { createContext, forwardRef, use, useContext, useEffect, useImperativeHandle, useLayoutEffect, useRef, useState } from "react";
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

    const context : DayboardContextProps = {
        panelRef
    };

    return (
        <div ref={panelRef} className={styles.body}>
            {ready && (
                <DayboardContext.Provider value={context}>
                    <DayboardLayout />
                    {panelRef.current?.getBoundingClientRect().width}
                </DayboardContext.Provider>
            )}
        </div>
    );
}

//

const DayboardContext = createContext<DayboardContextProps | null>(null);

type DayboardContextProps = {
    panelRef : React.RefObject<HTMLDivElement | null>;
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

        const innerRef = useRef<HTMLDivElement>(null);
        useImperativeHandle(ref, () => innerRef.current!, []);

        useEffect(() => {
            const observer = new ResizeObserver(() => {
                if(!context.panelRef.current) return;
                if(!innerRef.current) return;

                const panelElm = context.panelRef.current;
                const panelSize = panelElm.getBoundingClientRect();
                const panelWidth = panelSize.width;
                const panelHeight = panelSize.height;

                const style = innerRef.current.style;
                const possibleWidth = Math.floor(panelWidth / props.w);
                const possibleHeight = Math.floor(panelHeight / props.h);
                const fieldSize = Math.min(possibleWidth, possibleHeight);
                const cellSize = Math.floor(fieldSize * 0.8);

                style.setProperty("--cellSize", `${fieldSize}px`);
                console.log(cellSize);
            });

            observer.observe(context.panelRef.current!);

            return () => {
                observer.disconnect();
            };
        }, []);

        return (
            <div ref={innerRef} className={styles.grid}>
                {Array.from({ length: props.w * props.h }).map((_, i) => (
                    <div key={i} className={styles.cell} />
                ))} 
            </div>
        );
    }
);

type DayboardGridProps = {
    w: number;
    h: number;
}