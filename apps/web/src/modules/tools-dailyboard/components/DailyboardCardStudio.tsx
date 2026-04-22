import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState, useRef, useCallback, useEffect } from "react";
import { DailyboardCardStudioProps, ResizeMode } from "../type/t-dailyboard.card-studio.types";

//

export function DailyboardCardStudio({ 
    initialColSpan = 12, 
    initialRowSpan = 3,
    initialCol = 0,
    initialRow = 0,
    onResize, 
    maxCols = 24,
    maxRows = 6,
    minColSpan = 4,
    minRowSpan = 3,
    cellSize = 20,
    cellGap = 2,
}: DailyboardCardStudioProps) {
    // State
    const [colSpan, setColSpan] = useState(initialColSpan);
    const [rowSpan, setRowSpan] = useState(initialRowSpan);
    const [col, setCol] = useState(initialCol);
    const [row, setRow] = useState(initialRow);
    const [resizeMode, setResizeMode] = useState<ResizeMode>("move");
    const [isResizing, setIsResizing] = useState(false);
    
    // Refs
    const startPosRef = useRef({ x: 0, y: 0 });
    const startSpanRef = useRef({ colSpan: 0, rowSpan: 0, col: 0, row: 0 });

    // Handle Sizes
    const HANDLE_SIZE = 8;
    const CORNER_SIZE = 12;
    const MOVE_DOT_SIZE = 16;
    const SIZE_LABEL_OFFSET = 20;

    const handleResizeStart = useCallback((mode: ResizeMode, e: React.PointerEvent) => {
        e.stopPropagation();
        e.preventDefault();
        setIsResizing(true);
        setResizeMode(mode);
        startPosRef.current = { x: e.clientX, y: e.clientY };
        startSpanRef.current = { colSpan, rowSpan, col, row };
    }, [colSpan, rowSpan, col, row]);

    const handleResizeMove = useCallback((e: PointerEvent) => {
        if (!isResizing) return;

        const deltaX = e.clientX - startPosRef.current.x;
        const deltaY = e.clientY - startPosRef.current.y;
        
        const deltaCols = Math.round(deltaX / (cellSize + cellGap));
        const deltaRows = Math.round(deltaY / (cellSize + cellGap));

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
                newColSpan = Math.min(maxCols - newCol, Math.max(minColSpan, startSpanRef.current.colSpan + deltaCols));
                break;
            case "left":
                newColSpan = Math.max(minColSpan, startSpanRef.current.colSpan - deltaCols);
                newCol = startSpanRef.current.col + (startSpanRef.current.colSpan - newColSpan);
                if (newCol < 0) {
                    newCol = 0;
                    newColSpan = startSpanRef.current.col + startSpanRef.current.colSpan;
                }
                if (newCol + newColSpan > maxCols) {
                    newCol = maxCols - newColSpan;
                }
                break;
            case "bottom":
                newRowSpan = Math.min(maxRows - newRow, Math.max(minRowSpan, startSpanRef.current.rowSpan + deltaRows));
                break;
            case "top":
                newRowSpan = Math.max(minRowSpan, startSpanRef.current.rowSpan - deltaRows);
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
                newColSpan = Math.min(maxCols - newCol, Math.max(minColSpan, startSpanRef.current.colSpan + deltaCols));
                newRowSpan = Math.min(maxRows - newRow, Math.max(minRowSpan, startSpanRef.current.rowSpan + deltaRows));
                break;
            case "bottomLeft":
                newColSpan = Math.max(minColSpan, startSpanRef.current.colSpan - deltaCols);
                newCol = startSpanRef.current.col + (startSpanRef.current.colSpan - newColSpan);
                if (newCol < 0) {
                    newCol = 0;
                    newColSpan = startSpanRef.current.col + startSpanRef.current.colSpan;
                }
                if (newCol + newColSpan > maxCols) {
                    newCol = maxCols - newColSpan;
                }
                newRowSpan = Math.max(minRowSpan, startSpanRef.current.rowSpan + deltaRows);
                if (newRow + newRowSpan > maxRows) {
                    newRowSpan = maxRows - newRow;
                }
                break;
            case "topRight":
                newRowSpan = Math.max(minRowSpan, startSpanRef.current.rowSpan - deltaRows);
                newRow = startSpanRef.current.row + (startSpanRef.current.rowSpan - newRowSpan);
                if (newRow < 0) {
                    newRow = 0;
                    newRowSpan = startSpanRef.current.row + startSpanRef.current.rowSpan;
                }
                if (newRow + newRowSpan > maxRows) {
                    newRow = maxRows - newRowSpan;
                }
                newColSpan = Math.max(minColSpan, startSpanRef.current.colSpan + deltaCols);
                if (newCol + newColSpan > maxCols) {
                    newColSpan = maxCols - newCol;
                }
                break;
            case "topLeft":
                newColSpan = Math.max(minColSpan, startSpanRef.current.colSpan - deltaCols);
                newCol = startSpanRef.current.col + (startSpanRef.current.colSpan - newColSpan);
                if (newCol < 0) {
                    newCol = 0;
                    newColSpan = startSpanRef.current.col + startSpanRef.current.colSpan;
                }
                if (newCol + newColSpan > maxCols) {
                    newCol = maxCols - newColSpan;
                }
                newRowSpan = Math.max(minRowSpan, startSpanRef.current.rowSpan - deltaRows);
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

        // Final safety checks
        newColSpan = Math.min(maxCols - newCol, Math.max(minColSpan, newColSpan));
        newRowSpan = Math.min(maxRows - newRow, Math.max(minRowSpan, newRowSpan));

        // Update if changed
        if (newColSpan !== colSpan || newRowSpan !== rowSpan || newCol !== col || newRow !== row) {
            setColSpan(newColSpan);
            setRowSpan(newRowSpan);
            setCol(newCol);
            setRow(newRow);
            onResize(newColSpan, newRowSpan, newCol, newRow);
        }
    }, [isResizing, resizeMode, maxCols, maxRows, minColSpan, minRowSpan, colSpan, rowSpan, col, row, onResize, cellSize, cellGap]);

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


    const renderGridCells = () => (
        Array.from({ length: maxRows }).map((_, rowIdx) =>
            Array.from({ length: maxCols }).map((_, colIdx) => (
                <Box
                    key={`${rowIdx}-${colIdx}`}
                    sx={{
                        width: cellSize,
                        height: cellSize,
                        backgroundColor: "rgba(255,255,255,0.1)",
                        borderRadius: 0.5,
                    }}
                />
            ))
        )
    );

    const renderMoveHandle = () => (
        <Box
            onPointerDown={(e) => handleResizeStart("move", e)}
            sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: MOVE_DOT_SIZE,
                height: MOVE_DOT_SIZE,
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
    );

    const renderSizeLabel = () => (
        <Typography sx={{ 
            position: "absolute",
            top: -SIZE_LABEL_OFFSET,
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
    );

    const renderResizeHandle = (mode: ResizeMode, sx: any) => (
        <Box
            onPointerDown={(e) => handleResizeStart(mode, e)}
            sx={{
                pointerEvents: "auto",
                touchAction: "none",
                ...sx
            }}
        />
    );

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
                    gridTemplateColumns: `repeat(${maxCols}, ${cellSize}px)`,
                    gridTemplateRows: `repeat(${maxRows}, ${cellSize}px)`,
                    gap: `${cellGap}px`,
                    backgroundColor: "rgba(255,255,255,0.05)",
                    padding: 1,
                    borderRadius: 1,
                    position: "relative",
                    touchAction: "none",
                }}
            >
                {renderGridCells()}

                <Box
                    sx={{
                        position: "absolute",
                        top: 1 + row * (cellSize + cellGap),
                        left: 1 + col * (cellSize + cellGap),
                        width: colSpan * (cellSize + cellGap),
                        height: rowSpan * (cellSize + cellGap),
                        backgroundColor: "rgba(100, 150, 255, 0.3)",
                        border: "2px solid rgba(100, 150, 255, 0.8)",
                        borderRadius: 1,
                        pointerEvents: "none",
                    }}
                >
                    {renderMoveHandle()}
                    {renderSizeLabel()}

                    {/* Edge Handles */}
                    {renderResizeHandle("top", {
                        position: "absolute",
                        top: -HANDLE_SIZE / 2,
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: 40,
                        height: HANDLE_SIZE,
                        backgroundColor: "rgba(100, 150, 255, 0.8)",
                        borderRadius: 1,
                        cursor: "ns-resize",
                        "&:hover": { backgroundColor: "rgba(100, 150, 255, 1)" }
                    })}

                    {renderResizeHandle("bottom", {
                        position: "absolute",
                        bottom: -HANDLE_SIZE / 2,
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: 40,
                        height: HANDLE_SIZE,
                        backgroundColor: "rgba(100, 150, 255, 0.8)",
                        borderRadius: 1,
                        cursor: "ns-resize",
                        "&:hover": { backgroundColor: "rgba(100, 150, 255, 1)" }
                    })}

                    {renderResizeHandle("left", {
                        position: "absolute",
                        left: -HANDLE_SIZE / 2,
                        top: "50%",
                        transform: "translateY(-50%)",
                        width: HANDLE_SIZE,
                        height: 40,
                        backgroundColor: "rgba(100, 150, 255, 0.8)",
                        borderRadius: 1,
                        cursor: "ew-resize",
                        "&:hover": { backgroundColor: "rgba(100, 150, 255, 1)" }
                    })}

                    {renderResizeHandle("right", {
                        position: "absolute",
                        right: -HANDLE_SIZE / 2,
                        top: "50%",
                        transform: "translateY(-50%)",
                        width: HANDLE_SIZE,
                        height: 40,
                        backgroundColor: "rgba(100, 150, 255, 0.8)",
                        borderRadius: 1,
                        cursor: "ew-resize",
                        "&:hover": { backgroundColor: "rgba(100, 150, 255, 1)" }
                    })}

                    {/* Corner Handles */}
                    {renderResizeHandle("topLeft", {
                        position: "absolute",
                        top: -CORNER_SIZE / 2,
                        left: -CORNER_SIZE / 2,
                        width: CORNER_SIZE,
                        height: CORNER_SIZE,
                        backgroundColor: "rgba(100, 150, 255, 0.9)",
                        borderRadius: "50%",
                        cursor: "nw-resize",
                        "&:hover": { 
                            backgroundColor: "rgba(100, 150, 255, 1)",
                            transform: "scale(1.2)"
                        }
                    })}

                    {renderResizeHandle("topRight", {
                        position: "absolute",
                        top: -CORNER_SIZE / 2,
                        right: -CORNER_SIZE / 2,
                        width: CORNER_SIZE,
                        height: CORNER_SIZE,
                        backgroundColor: "rgba(100, 150, 255, 0.9)",
                        borderRadius: "50%",
                        cursor: "ne-resize",
                        "&:hover": { 
                            backgroundColor: "rgba(100, 150, 255, 1)",
                            transform: "scale(1.2)"
                        }
                    })}

                    {renderResizeHandle("bottomLeft", {
                        position: "absolute",
                        bottom: -CORNER_SIZE / 2,
                        left: -CORNER_SIZE / 2,
                        width: CORNER_SIZE,
                        height: CORNER_SIZE,
                        backgroundColor: "rgba(100, 150, 255, 0.9)",
                        borderRadius: "50%",
                        cursor: "sw-resize",
                        "&:hover": { 
                            backgroundColor: "rgba(100, 150, 255, 1)",
                            transform: "scale(1.2)"
                        }
                    })}

                    {renderResizeHandle("bottomRight", {
                        position: "absolute",
                        bottom: -CORNER_SIZE / 2,
                        right: -CORNER_SIZE / 2,
                        width: CORNER_SIZE,
                        height: CORNER_SIZE,
                        backgroundColor: "rgba(100, 150, 255, 0.9)",
                        borderRadius: "50%",
                        cursor: "nw-resize",
                        "&:hover": { 
                            backgroundColor: "rgba(100, 150, 255, 1)",
                            transform: "scale(1.2)"
                        }
                    })}
                </Box>
            </Box>
        </Box>
    );
}