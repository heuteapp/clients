"use client";
import { createContext, forwardRef, useContext, useEffect, useRef } from "react";
import styles from "./dayboard.module.css";
import mergeRefs from "merge-refs";
import { useReadyRef } from "../hooks";
import { heuteApp } from "@/src/heute/app";
import { DayboardGridData } from "@/src/data/dayboard";

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
        const layout = heuteApp.dayboard.layouts.get("default");

        useEffect(() => {
            context.dayboardLayout = register.current;
        }, []);

        return (
            <div ref={mergeRefs(forwardedRef, ref)} className={styles.layout}>
                {
                    layout?.grids.map((grid) => (
                        <DayboardGrid key={grid.id} data={grid}/>
                    ))
                }
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
        const data = props.data;

        useEffect(() => {
            const observer = new ResizeObserver(() => {
                if(!context.dayboardRef.current) return;
                if(!ref.current) return;

                const gridElm = ref.current;
                const gridSize = gridElm.getBoundingClientRect();
                const gridWidth = gridSize.width;
                const gridHeight = gridSize.height;

                const style = ref.current.style;
                const possibleWidth = gridWidth / data.size.cols;
                const possibleHeight = gridHeight / data.size.rows;
                const fieldSize = Math.min(possibleWidth, possibleHeight);

                const gridGap = fieldSize * 0.2;
                const cellSize = fieldSize - (gridGap);

                style.setProperty("--gridColumns", `${data.size.cols}`);
                style.setProperty("--gridRows", `${data.size.rows}`);
                style.setProperty("--gridGap", `${Math.floor(gridGap)}px`);
                style.setProperty("--cellSize", `${Math.floor(cellSize)}px`);
            });

            observer.observe(context.dayboardRef.current!);

            return () => {
                observer.disconnect();
            };
        }, [context.dayboardRef, data.size.cols, data.size.rows]);

        return (
            <div ref={mergeRefs(forwardedRef, ref)} className={styles.grid} style={{
                left: `${data.bounds.x1}%`,
                top: `${data.bounds.y1}%`,
                right: `${100 - data.bounds.x2}%`,
                bottom: `${100 - data.bounds.y2}%`,
                alignContent: data.contentPlacement?.align || "center",
                justifyContent: data.contentPlacement?.justify || "center",
            }}>
                {Array.from({ length: data.size.cols * data.size.rows }).map((_, i) => (
                    <div key={i} className={styles.cell} />
                ))} 
            </div>
        );
    }
);

interface DayboardGridProps {
    data: DayboardGridData;
}

type DayboardGridRegister = {
}