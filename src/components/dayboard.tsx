"use client";
import { createContext, forwardRef, use, useContext, useEffect, useImperativeHandle, useLayoutEffect, useRef, useState } from "react";
import styles from "./dayboard.module.css";
import mergeRefs from "merge-refs";

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
                    <div>
                        {panelRef.current?.getBoundingClientRect()?.width}
                    </div>
                    <div>
                        {panelRef.current?.getBoundingClientRect()?.height}
                    </div>
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
                <DayboardGrid w={18} h={4} />
                <DayboardGrid w={18} h={4} />
            </div>
        );
    }
);

const DayboardGrid = forwardRef<HTMLDivElement, DayboardGridProps>(
    function DayboardGrid(props, forwardedRef) {
        const context = useContext(DayboardContext);

        if (!context) {
            throw new Error("DayboardGrid must be used within a DayboardContext.Provider");
        }

        const ref = useRef<HTMLDivElement>(null);

        useEffect(() => {
            const observer = new ResizeObserver(() => {
                if(!context.panelRef.current) return;
                if(!ref.current) return;

                const gridElm = ref.current;
                const gridSize = gridElm.getBoundingClientRect();
                const gridWidth = gridSize.width;
                const gridHeight = gridSize.height;

                const style = ref.current.style;
                const possibleWidth = gridWidth / props.w;
                const possibleHeight = gridHeight / props.h;
                const fieldSize = Math.min(possibleWidth, possibleHeight);

                const gridGap = fieldSize * 0.5;
                const cellSize = fieldSize - (gridGap);

                style.setProperty("--gridColumns", `${props.w}`);
                style.setProperty("--gridRows", `${props.h}`);
                style.setProperty("--gridGap", `${Math.floor(gridGap)}px`);
                style.setProperty("--cellSize", `${Math.floor(cellSize)}px`);
            });

            observer.observe(context.panelRef.current!);

            return () => {
                observer.disconnect();
            };
        }, []);

        return (
            <div ref={mergeRefs(forwardedRef, ref)} className={styles.grid}>
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