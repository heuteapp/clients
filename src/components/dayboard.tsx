"use client";
import { createContext, forwardRef, use, useContext, useEffect, useLayoutEffect, useRef } from "react";
import styles from "./dayboard.module.css";
import mergeRefs from "merge-refs";
import { useReadyRef } from "../hooks";
import { DayboardData, DayboardFieldData, DayboardGridData, DayboardLayoutData } from "@/src/data/dayboard";

function Dayboard(props: DayboardProps) {
    const [ref, ready] = useReadyRef<HTMLDivElement>();

    const register = useRef<DayboardRegister>({
        ref,
        layout: null,
    });

    useLayoutEffect(() => {
        register.current.layout = null;
    });
        
    const layout = props.data.layout;

    return (
        <div ref={ref} className={styles.body}>
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

const DayboardContext = createContext<DayboardRegister | null>(null);

type DayboardRegister = {
    ref : React.RefObject<HTMLDivElement | null>;
    layout: DayboardLayoutRegister | null;
};

export default Dayboard;

//

const DayboardLayout = forwardRef<HTMLDivElement, DayboardLayoutProps>(
    function DayboardLayout(props, forwardedRef) {
        const dayboardRegistry = useContext(DayboardContext)!;

        const ref = useRef<HTMLDivElement>(null);
        const register = useRef<DayboardLayoutRegister>({
            ref,
            fields: null
        });
        
        useLayoutEffect(() => {
            dayboardRegistry.layout = register.current;
            register.current.fields = [];

        });

        const data = props.data;

        return (
            <div ref={mergeRefs(forwardedRef, ref)} className={styles.layout}>
                <DayboardLayoutContext.Provider value={register.current}>
                {
                    data.fields.map((field) => (
                        <DayboardField key={field.id} data={field}/>
                    ))
                }
                </DayboardLayoutContext.Provider>
            </div>
        );
    }
);

type DayboardLayoutProps = {
    data: DayboardLayoutData
}

const DayboardLayoutContext = createContext<DayboardLayoutRegister | null>(null);

type DayboardLayoutRegister = {
    ref: React.RefObject<HTMLDivElement | null>;
    fields: DayboardFieldRegister[] | null;
}

//

const DayboardField = forwardRef<HTMLDivElement, DayboardFieldProps>(
    function DayboardField(props, forwardedRef) {
        const layoutRegistry = useContext(DayboardLayoutContext)!;

        const ref = useRef<HTMLDivElement>(null);
        const register = useRef<DayboardFieldRegister>({
            ref,
            grids: null
        });

        useLayoutEffect(() => {
            layoutRegistry.fields!.push(register.current);
            register.current.grids = [];
        });
        
        const data = props.data;

        useEffect(() => {
            const observer = new ResizeObserver(() => {
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

            observer.observe(layoutRegistry.ref.current!);
            return () => {
                observer.disconnect();
            };
        }, []);

        return (
            <div ref={mergeRefs(forwardedRef, ref)} className={styles.field} style={{
                left: `${data.bounds.x1}%`,
                top: `${data.bounds.y1}%`,
                right: `${100 - data.bounds.x2}%`,
                bottom: `${100 - data.bounds.y2}%`,
                alignContent: data.placement?.horizontal || "center",
                justifyItems: data.placement?.vertical || "center"
            }}>
                <DayboardFieldContext.Provider value={register.current}>
                    <DayboardGrid data={data.grid}/>
                </DayboardFieldContext.Provider>
            </div>
        );
    }
);

interface DayboardFieldProps {
    data: DayboardFieldData;
}

const DayboardFieldContext = createContext<DayboardFieldRegister | null>(null);

type DayboardFieldRegister = {
    ref: React.RefObject<HTMLDivElement | null>;
    grids: DayboardGridRegister[] | null;
}

//

export const DayboardGrid = forwardRef<HTMLDivElement, DayboardGridProps>(
    function DayboardGrid(props, forwardedRef) {
        const fieldRegistry = useContext(DayboardFieldContext)!;

        const ref = useRef<HTMLDivElement>(null);
        const register = useRef<DayboardGridRegister>({
            ref
        });

        useLayoutEffect(() => {
            fieldRegistry.grids!.push(register.current);
        });

        const data = props.data;

        return (
            <div ref={mergeRefs(forwardedRef, ref)} className={styles.grid}>
                <DayboardGridContext.Provider value={register.current}>
                    {Array.from({ length: data.cols * data.rows }).map((_, i) => (
                        <DayboardCell key={i} x={i % data.cols} y={Math.floor(i / data.cols)} />
                    ))} 
                </DayboardGridContext.Provider>
            </div>
        );
    }
);

interface DayboardGridProps {
    data: DayboardGridData;
}

const DayboardGridContext = createContext<DayboardGridRegister | null>(null);

interface DayboardGridRegister {
    ref: React.RefObject<HTMLDivElement | null>;
}

//

export const DayboardCell = forwardRef<HTMLDivElement, DayboardCellProps>(
    function DayboardCell(props, forwardedRef) {

        const ref = useRef<HTMLDivElement>(null);
        const register = useRef<DayboardCellRegister>({
            ref
        });

        return (
            <div ref={mergeRefs(forwardedRef, ref)} className={styles.cell} />
        );
    }
);

interface DayboardCellProps {
    x: number;
    y: number;
}

interface DayboardCellRegister {
    ref: React.RefObject<HTMLDivElement | null>;
}