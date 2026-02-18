"use client";
import { createContext, forwardRef, use, useContext, useEffect, useLayoutEffect, useRef } from "react";
import styles from "./dayboard.module.css";
import mergeRefs from "merge-refs";
import { useReadyRef } from "../hooks";
import { DayboardData, DayboardFieldData, DayboardGridData, DayboardLayoutData } from "@/src/data/dayboard";
import { GridSize } from "../data/core";

function Dayboard(props: DayboardProps) {
    const [ref, ready] = useReadyRef<HTMLDivElement>();

    const register = useRef<DayboardRegister>({
        ref,
        layout: null,
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
            fields: []
        });
            
        useLayoutEffect(() => {
            dayboardRegistry.layout = register.current;

            return () => {
                if (dayboardRegistry.layout === register.current) {
                    dayboardRegistry.layout = null;
                }
            };
        }, [dayboardRegistry]);


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
            grid: null
        });

        useLayoutEffect(() => {
            layoutRegistry.fields!.push(register.current);

            return () => {
                layoutRegistry.fields = layoutRegistry.fields!.filter(
                    (x) => x !== register.current
                );
            };
        }, [layoutRegistry]);

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

            observer.observe(ref.current!);
            return () => {
                observer.disconnect();
            };
        }, [data.grid]);

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
    grid: DayboardGridRegister | null;
}

//

export const DayboardGrid = forwardRef<HTMLDivElement, DayboardGridProps>(
    function DayboardGrid(props, forwardedRef) {
        const fieldRegistry = useContext(DayboardFieldContext)!;

        const ref = useRef<HTMLDivElement>(null);
        const register = useRef<DayboardGridRegister>({
            ref,
            cells: []
        });

        useLayoutEffect(() => {
            fieldRegistry.grid = register.current;

            return () => {
                fieldRegistry.grid = null;
            };
        }, [fieldRegistry]);

        const data = props.data;

function mouseToGridCell(e: React.MouseEvent, size: GridSize) {
  const gridEl = ref.current;
  if (!gridEl) return null;

  const rect = gridEl.getBoundingClientRect();

  // mouse px (grid içinde)
  const mx = e.clientX - rect.left;
  const my = e.clientY - rect.top;

  // hücre px boyutu
  const cellW = rect.width / data.cols;
  const cellH = rect.height / data.rows;

  // kart px boyutu
  const cardW = size.cols * cellW;
  const cardH = size.rows * cellH;

  // ⭐ soft snap:
  // kartı mouse'a ortala ama hücre merkezine daha yumuşak otursun
  const pxLeft = mx - cardW / 2 + cellW / 2;
  const pxTop  = my - cardH / 2 + cellH / 2;

  // px -> grid cell (1-based)
  let x = Math.floor(pxLeft / cellW) + 1;
  let y = Math.floor(pxTop / cellH) + 1;

  // clamp (kart taşmasın)
  const maxX = data.cols - size.cols + 1;
  const maxY = data.rows - size.rows + 1;

  x = clamp(x, 1, maxX);
  y = clamp(y, 1, maxY);

  return { x, y };
}


        function clamp(n: number, min: number, max: number) {
            return Math.max(min, Math.min(max, n));
        }

        function mouseMove(e: React.MouseEvent) {
                const cardSize = { cols: 5, rows: 2 };
                const point = mouseToGridCell(e, cardSize);

                if (point) {
                    for (const cell of register.current.cells) {
                        const isHighlighted =
                        cell.props.x + 1 >= point.x && cell.props.x + 1 < point.x + cardSize.cols &&
                        cell.props.y + 1 >= point.y && cell.props.y + 1 < point.y + cardSize.rows;


                        if (isHighlighted) {
                            cell.ref.current?.classList.add(styles.highlighted);
                        } else {
                            cell.ref.current?.classList.remove(styles.highlighted);
                        }
                    }
                }
            }

        return (
            <div ref={mergeRefs(forwardedRef, ref)} className={styles.grid} onPointerMove={mouseMove} onPointerDown={() => {
                const randomColor = `hsl(${Math.floor(Math.random() * 360)}, 90%, 55%)`;
                
                for (const cell of register.current.cells) {
                    const element = cell.ref.current;

                    if(element?.classList.contains(styles.highlighted)) {
                        element.classList.remove(styles.highlighted);
                        element.style.borderColor = randomColor;

                        // 1 artsın borderWidth
                        element.style.borderWidth = `${parseInt(getComputedStyle(element).borderWidth) + 1}px`;
                    }
                }
            }}
            onMouseLeave={() => {
                requestAnimationFrame(() => {
                    for (const cell of register.current.cells) {
                        const element = cell.ref.current;
                        element?.classList.remove(styles.highlighted);
                    }
                });
            }}>
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
    cells: DayboardCellRegister[];
}

//

export const DayboardCell = forwardRef<HTMLDivElement, DayboardCellProps>(
    function DayboardCell(props, forwardedRef) {
        const gridRegistry = useContext(DayboardGridContext)!;

        const ref = useRef<HTMLDivElement>(null);
        const register = useRef<DayboardCellRegister>({
            props,
            ref
        });

        useLayoutEffect(() => {
            gridRegistry.cells.push(register.current);
            return () => {
                gridRegistry.cells = gridRegistry.cells.filter(x => x !== register.current);
            };
        }, []);

        return (
            <div ref={mergeRefs(forwardedRef, ref)} className={styles.cell}>

            </div>
        );
    }
);

interface DayboardCellProps {
    x: number;
    y: number;
}

interface DayboardCellRegister {
    props: DayboardCellProps;
    ref: React.RefObject<HTMLDivElement | null>;
}