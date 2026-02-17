"use client";
import { createContext, forwardRef, useContext, useEffect, useRef } from "react";
import styles from "./dayboard.module.css";
import mergeRefs from "merge-refs";
import { useReadyRef } from "../hooks";

export default function Dayboard() {
    const [dayboardRef, ready] = useReadyRef<HTMLDivElement>();

    const register = useRef<DayboardRegister>({
        dayboardRef,
        dayboardLayout: null,
    });

    return (
        <div ref={dayboardRef} className={styles.body}>
            { 
                ready &&
                <DayboardContext.Provider value={register.current}>
                    <DayboardLayout />
                </DayboardContext.Provider>
            }
        </div>
    );
}

//

const DayboardContext = createContext<DayboardRegister | null>(null);

type DayboardRegister = {
    dayboardRef : React.RefObject<HTMLDivElement | null>;
    dayboardLayout: DayboardLayoutRegister | null;
};

//

const DayboardLayout = forwardRef<HTMLDivElement, DayboardLayoutProps>(
    function DayboardLayout(props, forwardedRef) {
        const ref = useRef<HTMLDivElement>(null);

        const register = useRef<DayboardLayoutRegister>({
        });

        const context = useContext(DayboardContext)!;

        useEffect(() => {
            context.dayboardLayout = register.current;
        }, []);

        return (
            <div ref={mergeRefs(forwardedRef, ref)} className={styles.layout}>
                <DayboardGrid w={18} h={4} />
                <DayboardGrid w={18} h={4} />
            </div>
        );
    }
);

type DayboardLayoutProps = {

}

type DayboardLayoutRegister = {

}

//

const DayboardGrid = forwardRef<HTMLDivElement, DayboardGridProps>(
    function DayboardGrid(props, forwardedRef) {
        const context = useContext(DayboardContext);
        const register = useRef<DayboardGridRegister>({
        });

        if (!context) {
            throw new Error("DayboardGrid must be used within a DayboardContext.Provider");
        }

        const ref = useRef<HTMLDivElement>(null);

        useEffect(() => {
            const observer = new ResizeObserver(() => {
                if(!context.dayboardRef.current) return;
                if(!ref.current) return;

                const gridElm = ref.current;
                const gridSize = gridElm.getBoundingClientRect();
                const gridWidth = gridSize.width;
                const gridHeight = gridSize.height;

                const style = ref.current.style;
                const possibleWidth = gridWidth / props.w;
                const possibleHeight = gridHeight / props.h;
                const fieldSize = Math.min(possibleWidth, possibleHeight);

                const gridGap = fieldSize * 0.2;
                const cellSize = fieldSize - (gridGap);

                style.setProperty("--gridColumns", `${props.w}`);
                style.setProperty("--gridRows", `${props.h}`);
                style.setProperty("--gridGap", `${Math.floor(gridGap)}px`);
                style.setProperty("--cellSize", `${Math.floor(cellSize)}px`);
            });

            observer.observe(context.dayboardRef.current!);

            return () => {
                observer.disconnect();
            };
        }, [context.dayboardRef, props.w, props.h]);

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

type DayboardGridRegister = {
}