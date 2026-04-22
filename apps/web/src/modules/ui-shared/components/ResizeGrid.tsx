import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState, useRef, useCallback, useEffect } from "react";

//

export function ResizeGrid({ 
    initialColSpan = 12, 
    initialRowSpan = 3, 
    onResize, 
    maxCols = 24,
    maxRows = 6
}: ResizeGridProps) {
    const [colSpan, setColSpan] = useState(initialColSpan);
    const [rowSpan, setRowSpan] = useState(initialRowSpan);
    const [resizeMode, setResizeMode] = useState<ResizeMode>("both");
    const [isResizing, setIsResizing] = useState(false);
    const startPosRef = useRef({ x: 0, y: 0 });
    const startSpanRef = useRef({ col: 0, row: 0 });

    const CELL_SIZE = 20;
    const CELL_GAP = 2;

    const handleResizeStart = useCallback((mode: ResizeMode, e: React.MouseEvent) => {
        e.stopPropagation();
        setIsResizing(true);
        setResizeMode(mode);
        startPosRef.current = { x: e.clientX, y: e.clientY };
        startSpanRef.current = { col: colSpan, row: rowSpan };
    }, [colSpan, rowSpan]);

    const handleResizeMove = useCallback((e: MouseEvent) => {
        if (!isResizing) return;

        const deltaX = e.clientX - startPosRef.current.x;
        const deltaY = e.clientY - startPosRef.current.y;
        
        const deltaCols = Math.round(deltaX / (CELL_SIZE + CELL_GAP));
        const deltaRows = Math.round(deltaY / (CELL_SIZE + CELL_GAP));

        let newColSpan = startSpanRef.current.col;
        let newRowSpan = startSpanRef.current.row;

        if (resizeMode === "horizontal" || resizeMode === "both") {
            newColSpan = Math.min(maxCols, Math.max(4, startSpanRef.current.col + deltaCols));
        }
        if (resizeMode === "vertical" || resizeMode === "both") {
            newRowSpan = Math.min(maxRows, Math.max(3, startSpanRef.current.row + deltaRows));
        }

        setColSpan(newColSpan);
        setRowSpan(newRowSpan);
        
        onResize(newColSpan, newRowSpan);
    }, [isResizing, resizeMode, maxCols, maxRows, onResize, CELL_SIZE, CELL_GAP]);

    const handleResizeEnd = useCallback(() => {
        setIsResizing(false);
    }, []);

    useEffect(() => {
        if (isResizing) {
            window.addEventListener("mousemove", handleResizeMove);
            window.addEventListener("mouseup", handleResizeEnd);

            return () => {
                window.removeEventListener("mousemove", handleResizeMove);
                window.removeEventListener("mouseup", handleResizeEnd);
            };
        }
    }, [isResizing, handleResizeMove, handleResizeEnd]);

    return (
        <Box sx={{ 
            backgroundColor: "rgba(0, 0, 0, 0.5)", 
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(255,255,255,0.2)",
            opacity: 0.5,
        }}>
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: `repeat(${maxCols}, ${CELL_SIZE}px)`,
                    gridTemplateRows: `repeat(${maxRows}, ${CELL_SIZE}px)`,
                    gap: `${CELL_GAP}px`,
                    backgroundColor: "rgba(255,255,255,0.05)",
                    padding: 1,
                    borderRadius: 1,
                    position: "relative",
            }}>
                {Array.from({ length: maxRows }).map((_, row) =>
                    Array.from({ length: maxCols }).map((_, col) => (
                        <Box
                            key={`${row}-${col}`}
                            sx={{
                                width: CELL_SIZE,
                                height: CELL_SIZE,
                                backgroundColor: "rgba(255,255,255,0.1)",
                                borderRadius: 0.5,
                            }}
                        />
                    ))
                )}

                <Box
                    sx={{
                        position: "absolute",
                        top: 1,
                        left: 1,
                        width: colSpan * (CELL_SIZE + CELL_GAP),
                        height: rowSpan * (CELL_SIZE + CELL_GAP),
                        backgroundColor: "rgba(100, 150, 255, 0.3)",
                        border: "2px solid rgba(100, 150, 255, 0.8)",
                        borderRadius: 1,
                        pointerEvents: "none",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Typography sx={{ 
                        color: "white", 
                        fontSize: 12, 
                        fontWeight: "bold",
                        textShadow: "0 0 4px black",
                        pointerEvents: "none",
                        userSelect: "none"
                    }}>
                        {colSpan} x {rowSpan}
                    </Typography>

                    <Box
                        onMouseDown={(e) => handleResizeStart("horizontal", e)}
                        sx={{
                            position: "absolute",
                            right: -4,
                            top: "50%",
                            transform: "translateY(-50%)",
                            width: 8,
                            height: 40,
                            backgroundColor: "rgba(100, 150, 255, 0.8)",
                            borderRadius: 1,
                            cursor: "ew-resize",
                            pointerEvents: "auto",
                            "&:hover": { backgroundColor: "rgba(100, 150, 255, 1)" }
                        }}
                    />
                    
                    <Box
                        onMouseDown={(e) => handleResizeStart("vertical", e)}
                        sx={{
                            position: "absolute",
                            bottom: -4,
                            left: "50%",
                            transform: "translateX(-50%)",
                            width: 40,
                            height: 8,
                            backgroundColor: "rgba(100, 150, 255, 0.8)",
                            borderRadius: 1,
                            cursor: "ns-resize",
                            pointerEvents: "auto",
                            "&:hover": { backgroundColor: "rgba(100, 150, 255, 1)" }
                        }}
                    />
                    
                    <Box
                        onMouseDown={(e) => handleResizeStart("both", e)}
                        sx={{
                            position: "absolute",
                            right: -4,
                            bottom: -4,
                            width: 12,
                            height: 12,
                            backgroundColor: "rgba(100, 150, 255, 0.9)",
                            borderRadius: "50%",
                            cursor: "nw-resize",
                            pointerEvents: "auto",
                            "&:hover": { 
                                backgroundColor: "rgba(100, 150, 255, 1)",
                                transform: "scale(1.2)"
                            }
                        }}
                    />
                </Box>
            </Box>
        </Box>
    );
}

interface ResizeGridProps {
    initialColSpan?: number;
    initialRowSpan?: number;
    onResize: (colSpan: number, rowSpan: number) => void;
    maxCols?: number;
    maxRows?: number;
}

type ResizeMode = "horizontal" | "vertical" | "both";
