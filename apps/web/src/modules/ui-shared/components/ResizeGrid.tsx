import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState, useRef, useCallback, useEffect } from "react";

interface ResizeGridProps {
    initialColSpan?: number;
    initialRowSpan?: number;
    initialCol?: number;
    initialRow?: number;
    onResize: (colSpan: number, rowSpan: number, col: number, row: number) => void;
    maxCols?: number;
    maxRows?: number;
}

type ResizeMode = "move" | "top" | "bottom" | "left" | "right" | "topLeft" | "topRight" | "bottomLeft" | "bottomRight";

export function ResizeGrid({ 
    initialColSpan = 12, 
    initialRowSpan = 3,
    initialCol = 0,
    initialRow = 0,
    onResize, 
    maxCols = 24,
    maxRows = 6
}: ResizeGridProps) {
    const [colSpan, setColSpan] = useState(initialColSpan);
    const [rowSpan, setRowSpan] = useState(initialRowSpan);
    const [col, setCol] = useState(initialCol);
    const [row, setRow] = useState(initialRow);
    const [resizeMode, setResizeMode] = useState<ResizeMode>("move");
    const [isResizing, setIsResizing] = useState(false);
    const startPosRef = useRef({ x: 0, y: 0 });
    const startSpanRef = useRef({ colSpan: 0, rowSpan: 0, col: 0, row: 0 });

    const CELL_SIZE = 20;
    const CELL_GAP = 2;
    const MIN_COL_SPAN = 4;
    const MIN_ROW_SPAN = 3;

    const handleResizeStart = useCallback((mode: ResizeMode, e: React.PointerEvent) => {
        e.stopPropagation();
        e.preventDefault();
        setIsResizing(true);
        setResizeMode(mode);
        startPosRef.current = { x: e.clientX, y: e.clientY };
        startSpanRef.current = { 
            colSpan: colSpan, 
            rowSpan: rowSpan,
            col: col,
            row: row
        };
    }, [colSpan, rowSpan, col, row]);

    const handleResizeMove = useCallback((e: PointerEvent) => {
        if (!isResizing) return;

        const deltaX = e.clientX - startPosRef.current.x;
        const deltaY = e.clientY - startPosRef.current.y;
        
        const deltaCols = Math.round(deltaX / (CELL_SIZE + CELL_GAP));
        const deltaRows = Math.round(deltaY / (CELL_SIZE + CELL_GAP));

        let newColSpan = startSpanRef.current.colSpan;
        let newRowSpan = startSpanRef.current.rowSpan;
        let newCol = startSpanRef.current.col;
        let newRow = startSpanRef.current.row;

        switch (resizeMode) {
            case "move":
                newCol = Math.min(maxCols - startSpanRef.current.colSpan, Math.max(0, startSpanRef.current.col + deltaCols));
                newRow = Math.min(maxRows - startSpanRef.current.rowSpan, Math.max(0, startSpanRef.current.row + deltaRows));
                break;
            case "right":
                newColSpan = Math.min(maxCols - newCol, Math.max(MIN_COL_SPAN, startSpanRef.current.colSpan + deltaCols));
                break;
            case "left":
                newColSpan = Math.max(MIN_COL_SPAN, startSpanRef.current.colSpan - deltaCols);
                newCol = startSpanRef.current.col + (startSpanRef.current.colSpan - newColSpan);
                // Col sınırını kontrol et
                if (newCol < 0) {
                    newCol = 0;
                    newColSpan = startSpanRef.current.col + startSpanRef.current.colSpan;
                }
                if (newCol + newColSpan > maxCols) {
                    newCol = maxCols - newColSpan;
                }
                break;
            case "bottom":
                newRowSpan = Math.min(maxRows - newRow, Math.max(MIN_ROW_SPAN, startSpanRef.current.rowSpan + deltaRows));
                break;
            case "top":
                newRowSpan = Math.max(MIN_ROW_SPAN, startSpanRef.current.rowSpan - deltaRows);
                newRow = startSpanRef.current.row + (startSpanRef.current.rowSpan - newRowSpan);
                if (newRow < 0) {
                    newRow = 0;
                    newRowSpan = startSpanRef.current.row + startSpanRef.current.rowSpan;
                }
                if (newRow + newRowSpan > maxRows) {
                    newRow = maxRows - newRowSpan;
                }
                break;
            case "bottomRight":
                newColSpan = Math.min(maxCols - newCol, Math.max(MIN_COL_SPAN, startSpanRef.current.colSpan + deltaCols));
                newRowSpan = Math.min(maxRows - newRow, Math.max(MIN_ROW_SPAN, startSpanRef.current.rowSpan + deltaRows));
                break;
            case "bottomLeft":
                newColSpan = Math.max(MIN_COL_SPAN, startSpanRef.current.colSpan - deltaCols);
                newCol = startSpanRef.current.col + (startSpanRef.current.colSpan - newColSpan);
                if (newCol < 0) {
                    newCol = 0;
                    newColSpan = startSpanRef.current.col + startSpanRef.current.colSpan;
                }
                if (newCol + newColSpan > maxCols) {
                    newCol = maxCols - newColSpan;
                }
                
                newRowSpan = Math.max(MIN_ROW_SPAN, startSpanRef.current.rowSpan + deltaRows);
                if (newRow + newRowSpan > maxRows) {
                    newRowSpan = maxRows - newRow;
                }
                break;
            case "topRight":
                newRowSpan = Math.max(MIN_ROW_SPAN, startSpanRef.current.rowSpan - deltaRows);
                newRow = startSpanRef.current.row + (startSpanRef.current.rowSpan - newRowSpan);
                if (newRow < 0) {
                    newRow = 0;
                    newRowSpan = startSpanRef.current.row + startSpanRef.current.rowSpan;
                }
                if (newRow + newRowSpan > maxRows) {
                    newRow = maxRows - newRowSpan;
                }
                
                newColSpan = Math.max(MIN_COL_SPAN, startSpanRef.current.colSpan + deltaCols);
                if (newCol + newColSpan > maxCols) {
                    newColSpan = maxCols - newCol;
                }
                break;
            case "topLeft":
                newColSpan = Math.max(MIN_COL_SPAN, startSpanRef.current.colSpan - deltaCols);
                newCol = startSpanRef.current.col + (startSpanRef.current.colSpan - newColSpan);
                if (newCol < 0) {
                    newCol = 0;
                    newColSpan = startSpanRef.current.col + startSpanRef.current.colSpan;
                }
                if (newCol + newColSpan > maxCols) {
                    newCol = maxCols - newColSpan;
                }
                
                newRowSpan = Math.max(MIN_ROW_SPAN, startSpanRef.current.rowSpan - deltaRows);
                newRow = startSpanRef.current.row + (startSpanRef.current.rowSpan - newRowSpan);
                if (newRow < 0) {
                    newRow = 0;
                    newRowSpan = startSpanRef.current.row + startSpanRef.current.rowSpan;
                }
                if (newRow + newRowSpan > maxRows) {
                    newRow = maxRows - newRowSpan;
                }
                break;
        }

        // Son güvenlik kontrolleri
        newColSpan = Math.min(maxCols - newCol, Math.max(MIN_COL_SPAN, newColSpan));
        newRowSpan = Math.min(maxRows - newRow, Math.max(MIN_ROW_SPAN, newRowSpan));

        // Değişiklik varsa güncelle
        if (newColSpan !== colSpan || newRowSpan !== rowSpan || newCol !== col || newRow !== row) {
            setColSpan(newColSpan);
            setRowSpan(newRowSpan);
            setCol(newCol);
            setRow(newRow);
            onResize(newColSpan, newRowSpan, newCol, newRow);
        }
    }, [isResizing, resizeMode, maxCols, maxRows, colSpan, rowSpan, col, row, onResize, CELL_SIZE, CELL_GAP]);

    const handleResizeEnd = useCallback(() => {
        setIsResizing(false);
    }, []);

    useEffect(() => {
        if (isResizing) {
            window.addEventListener("pointermove", handleResizeMove);
            window.addEventListener("pointerup", handleResizeEnd);

            return () => {
                window.removeEventListener("pointermove", handleResizeMove);
                window.removeEventListener("pointerup", handleResizeEnd);
            };
        }
    }, [isResizing, handleResizeMove, handleResizeEnd]);

    return (
        <Box sx={{ 
            backgroundColor: "rgba(0, 0, 0, 0.5)", 
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(255,255,255,0.2)",
            borderRadius: 2,
            p: 1,
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
                    touchAction: "none",
                }}
            >
                {Array.from({ length: maxRows }).map((_, rowIdx) =>
                    Array.from({ length: maxCols }).map((_, colIdx) => (
                        <Box
                            key={`${rowIdx}-${colIdx}`}
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
                        top: 1 + row * (CELL_SIZE + CELL_GAP),
                        left: 1 + col * (CELL_SIZE + CELL_GAP),
                        width: colSpan * (CELL_SIZE + CELL_GAP),
                        height: rowSpan * (CELL_SIZE + CELL_GAP),
                        backgroundColor: "rgba(100, 150, 255, 0.3)",
                        border: "2px solid rgba(100, 150, 255, 0.8)",
                        borderRadius: 1,
                        pointerEvents: "none",
                    }}
                >
                    <Box
                        onPointerDown={(e) => handleResizeStart("move", e)}
                        sx={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            width: 16,
                            height: 16,
                            backgroundColor: "rgba(100, 150, 255, 0.9)",
                            borderRadius: "50%",
                            cursor: "move",
                            pointerEvents: "auto",
                            boxShadow: "0 1px 4px rgba(0,0,0,0.3)",
                            zIndex: 10,
                            border: "1px solid rgba(255,255,255,0.5)",
                            touchAction: "none",
                            "&:hover": { 
                                backgroundColor: "rgba(100, 150, 255, 1)",
                                transform: "translate(-50%, -50%) scale(1.2)"
                            }
                        }}
                    />

                    <Typography sx={{ 
                        position: "absolute",
                        top: -20,
                        left: "50%",
                        transform: "translateX(-50%)",
                        color: "white", 
                        fontSize: 11, 
                        fontWeight: "bold",
                        textShadow: "0 0 4px black",
                        pointerEvents: "none",
                        userSelect: "none",
                        whiteSpace: "nowrap",
                        backgroundColor: "rgba(0,0,0,0.6)",
                        padding: "2px 6px",
                        borderRadius: 1
                    }}>
                        {colSpan} x {rowSpan}
                    </Typography>

                    <Box
                        onPointerDown={(e) => handleResizeStart("top", e)}
                        sx={{
                            position: "absolute",
                            top: -4,
                            left: "50%",
                            transform: "translateX(-50%)",
                            width: 40,
                            height: 8,
                            backgroundColor: "rgba(100, 150, 255, 0.8)",
                            borderRadius: 1,
                            cursor: "ns-resize",
                            pointerEvents: "auto",
                            touchAction: "none",
                            "&:hover": { backgroundColor: "rgba(100, 150, 255, 1)" }
                        }}
                    />

                    <Box
                        onPointerDown={(e) => handleResizeStart("bottom", e)}
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
                            touchAction: "none",
                            "&:hover": { backgroundColor: "rgba(100, 150, 255, 1)" }
                        }}
                    />

                    <Box
                        onPointerDown={(e) => handleResizeStart("left", e)}
                        sx={{
                            position: "absolute",
                            left: -4,
                            top: "50%",
                            transform: "translateY(-50%)",
                            width: 8,
                            height: 40,
                            backgroundColor: "rgba(100, 150, 255, 0.8)",
                            borderRadius: 1,
                            cursor: "ew-resize",
                            pointerEvents: "auto",
                            touchAction: "none",
                            "&:hover": { backgroundColor: "rgba(100, 150, 255, 1)" }
                        }}
                    />

                    <Box
                        onPointerDown={(e) => handleResizeStart("right", e)}
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
                            touchAction: "none",
                            "&:hover": { backgroundColor: "rgba(100, 150, 255, 1)" }
                        }}
                    />

                    <Box
                        onPointerDown={(e) => handleResizeStart("topLeft", e)}
                        sx={{
                            position: "absolute",
                            top: -4,
                            left: -4,
                            width: 12,
                            height: 12,
                            backgroundColor: "rgba(100, 150, 255, 0.9)",
                            borderRadius: "50%",
                            cursor: "nw-resize",
                            pointerEvents: "auto",
                            touchAction: "none",
                            "&:hover": { 
                                backgroundColor: "rgba(100, 150, 255, 1)",
                                transform: "scale(1.2)"
                            }
                        }}
                    />

                    <Box
                        onPointerDown={(e) => handleResizeStart("topRight", e)}
                        sx={{
                            position: "absolute",
                            top: -4,
                            right: -4,
                            width: 12,
                            height: 12,
                            backgroundColor: "rgba(100, 150, 255, 0.9)",
                            borderRadius: "50%",
                            cursor: "ne-resize",
                            pointerEvents: "auto",
                            touchAction: "none",
                            "&:hover": { 
                                backgroundColor: "rgba(100, 150, 255, 1)",
                                transform: "scale(1.2)"
                            }
                        }}
                    />

                    <Box
                        onPointerDown={(e) => handleResizeStart("bottomLeft", e)}
                        sx={{
                            position: "absolute",
                            bottom: -4,
                            left: -4,
                            width: 12,
                            height: 12,
                            backgroundColor: "rgba(100, 150, 255, 0.9)",
                            borderRadius: "50%",
                            cursor: "sw-resize",
                            pointerEvents: "auto",
                            touchAction: "none",
                            "&:hover": { 
                                backgroundColor: "rgba(100, 150, 255, 1)",
                                transform: "scale(1.2)"
                            }
                        }}
                    />

                    <Box
                        onPointerDown={(e) => handleResizeStart("bottomRight", e)}
                        sx={{
                            position: "absolute",
                            bottom: -4,
                            right: -4,
                            width: 12,
                            height: 12,
                            backgroundColor: "rgba(100, 150, 255, 0.9)",
                            borderRadius: "50%",
                            cursor: "nw-resize",
                            pointerEvents: "auto",
                            touchAction: "none",
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