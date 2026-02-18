"use client";
import { createContext, forwardRef, useContext, useEffect, useRef } from "react";
import styles from "./dayboard.module.css";
import mergeRefs from "merge-refs";
import { useReadyRef } from "../hooks";
import { DayboardData, DayboardFieldData, DayboardGridData, DayboardLayoutData } from "@/src/data/dayboard";

export default function Dayboard(props: DayboardProps) {
    const [dayboardRef, ready] = useReadyRef<HTMLDivElement>();

    const register = useRef<DayboardRegister>({
        dayboardRef,
        dayboardLayout: null,
    });
        
    const layout = props.data.layout;

    return (
        <div ref={dayboardRef} className={styles.body}>
            { 
                ready &&
                <DayboardContext.Provider value={register.current}>
                    <DayboardLayout data={layout} />
                </DayboardContext.Provider>
            }
        </div>
    );
}

interface DayboardProps {
    data: DayboardData;
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
        const layoutRef = useRef<HTMLDivElement>(null);

        const register = useRef<DayboardLayoutRegister>({
            layoutRef
        });

        const context = useContext(DayboardContext)!;
        const data = props.data;

        useEffect(() => {
            context.dayboardLayout = register.current;
        }, []);

        return (
            <div ref={mergeRefs(forwardedRef, layoutRef)} className={styles.layout}>
                {
                    data.fields.map((field) => (
                        <DayboardField key={field.id} data={field}/>
                    ))
                }
            </div>
        );
    }
);

type DayboardLayoutProps = {
    data: DayboardLayoutData
}

type DayboardLayoutRegister = {
    layoutRef: React.RefObject<HTMLDivElement | null>;
}

//

const DayboardField = forwardRef<HTMLDivElement, DayboardFieldProps>(
    function DayboardField(props, forwardedRef) {
        const context = useContext(DayboardContext);
        const register = useRef<DayboardFieldRegister>({
        });

        if (!context) {
            throw new Error("DayboardField must be used within a DayboardContext.Provider");
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
                const possibleWidth = gridWidth / data.grid.cols;
                const possibleHeight = gridHeight / data.grid.rows;
                const fieldSize = Math.min(possibleWidth, possibleHeight);

                const gridGap = fieldSize * 0.2;
                const cellSize = fieldSize - (gridGap);

                style.setProperty("--gridColumns", `${data.grid.cols}`);
                style.setProperty("--gridRows", `${data.grid.rows}`);
                style.setProperty("--gridGap", `${Math.floor(gridGap)}px`);
                style.setProperty("--cellSize", `${Math.floor(cellSize)}px`);
            });

            observer.observe(context.dayboardRef.current!);

            return () => {
                observer.disconnect();
            };
        }, [context.dayboardRef, data.grid.cols, data.grid.rows]);

        return (
            <div ref={mergeRefs(forwardedRef, ref)} className={styles.field} style={{
                left: `${data.bounds.x1}%`,
                top: `${data.bounds.y1}%`,
                right: `${100 - data.bounds.x2}%`,
                bottom: `${100 - data.bounds.y2}%`,
                alignContent: data.placement?.horizontal || "center",
                justifyItems: data.placement?.vertical || "center"
            }}>
                <DayboardGrid data={data.grid}/>
            </div>
        );
    }
);

interface DayboardFieldProps {
    data: DayboardFieldData;
}

type DayboardFieldRegister = {
}

//

export const DayboardGrid = forwardRef<HTMLDivElement, DayboardGridProps>(
    function DayboardGrid(props, forwardedRef) {
        const ref = useRef<HTMLDivElement>(null);
        const data = props.data;

        return (
            <div ref={mergeRefs(forwardedRef, ref)} className={styles.grid}>
                {Array.from({ length: data.cols * data.rows }).map((_, i) => (
                    <DayboardCell key={i} x={i % data.cols} y={Math.floor(i / data.cols)} />
                ))} 
            </div>
        );
    }
);

interface DayboardGridProps {
    data: DayboardGridData;
}

//

export const DayboardCell = forwardRef<HTMLDivElement, DayboardCellProps>(
    function DayboardCell(props, forwardedRef) {
        const ref = useRef<HTMLDivElement>(null);

        return (
            <div ref={mergeRefs(forwardedRef, ref)} className={styles.cell} />
        );
    }
);

interface DayboardCellProps {
    x: number;
    y: number;
}