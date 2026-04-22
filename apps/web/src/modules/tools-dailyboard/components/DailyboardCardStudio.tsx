import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState, useRef, useCallback, useEffect, useMemo } from "react";
import { DailyboardCardStudioProps } from "../type/t-dailyboard.card-studio.types";
import { GridRect, ResizeDirection, ResizeParams } from "../../shared/types/common";
import { resizeGridRect } from "../../shared/utils/common";

// ============================================================================
// Main Component
// ============================================================================

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
    const [gridRect, setGridRect] = useState<GridRect>({
        colSpan: initialColSpan,
        rowSpan: initialRowSpan,
        colIndex: initialCol,
        rowIndex: initialRow
    });
    const [direction, setDirection] = useState<ResizeDirection | null>(null);
    const [isResizing, setIsResizing] = useState(false);
    
    // Refs
    const startPosRef = useRef({ x: 0, y: 0 });
    const startRectRef = useRef<GridRect>({ ...gridRect });

    // Handle Sizes
    const HANDLE_SIZE = 8;
    const CORNER_SIZE = 12;
    const MOVE_DOT_SIZE = 16;
    const SIZE_LABEL_OFFSET = 20;

    const handleResizeStart = useCallback((dir: ResizeDirection | "move", e: React.PointerEvent) => {
        e.stopPropagation();
        e.preventDefault();
        setIsResizing(true);
        setDirection(dir === "move" ? null : dir);
        startPosRef.current = { x: e.clientX, y: e.clientY };
        startRectRef.current = { ...gridRect };
    }, [gridRect]);

    const handleResizeMove = useCallback((e: PointerEvent) => {
        if (!isResizing) return;

        const deltaX = e.clientX - startPosRef.current.x;
        const deltaY = e.clientY - startPosRef.current.y;
        
        const deltaCols = Math.round(deltaX / (cellSize + cellGap));
        const deltaRows = Math.round(deltaY / (cellSize + cellGap));

        let newRect: GridRect;

        if (direction === null) {
            // Move
            newRect = {
                ...startRectRef.current,
                colIndex: Math.min(
                    maxCols - startRectRef.current.colSpan, 
                    Math.max(0, startRectRef.current.colIndex + deltaCols)
                ),
                rowIndex: Math.min(
                    maxRows - startRectRef.current.rowSpan, 
                    Math.max(0, startRectRef.current.rowIndex + deltaRows)
                )
            };
        } else {
            // Resize
            const params: ResizeParams = {
                direction,
                delta: { row: deltaRows, col: deltaCols },
                dimensions: { rowCount: maxRows, columnCount: maxCols },
                minSpan: { rowSpan: minRowSpan, colSpan: minColSpan }
            };
            
            newRect = resizeGridRect(startRectRef.current, params);
        }

        // Update if changed
        if (newRect.colSpan !== gridRect.colSpan || 
            newRect.rowSpan !== gridRect.rowSpan || 
            newRect.colIndex !== gridRect.colIndex || 
            newRect.rowIndex !== gridRect.rowIndex) {
            
            setGridRect(newRect);
            onResize(newRect.colSpan, newRect.rowSpan, newRect.colIndex, newRect.rowIndex);
        }
    }, [isResizing, direction, maxCols, maxRows, minColSpan, minRowSpan, gridRect, onResize, cellSize, cellGap]);

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

    // ============================================================================
    // Render Helpers
    // ============================================================================
    const GRID_CELL_SX = {
        backgroundColor: "rgba(255,255,255,0.1)",
        borderRadius: 0.5,
    };
    const gridCells = useMemo(() => {
        const cells = [];
        for (let rowIdx = 0; rowIdx < maxRows; rowIdx++) {
            for (let colIdx = 0; colIdx < maxCols; colIdx++) {
                cells.push(
                    <Box
                        key={`${rowIdx}-${colIdx}`}
                        sx={{
                            width: cellSize,
                            height: cellSize,
                            ...GRID_CELL_SX,
                        }}
                    />
                );
            }
        }
        return cells;
    }, [maxRows, maxCols, cellSize]);

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
            {gridRect.colSpan} x {gridRect.rowSpan}
        </Typography>
    );

    const renderResizeHandle = (dir: ResizeDirection) => {
        const isE = dir === "e"; const isSE = dir === "se";
        const isS = dir === "s"; const isNE = dir === "ne";
        const isW = dir === "w"; const isSW = dir === "sw";
        const isN = dir === "n"; const isNW = dir === "nw";

        const isEdge = isE || isS || isW || isN;
        const isCorner = isSE || isNE || isSW || isNW;
        
        // Pozisyon hesaplamaları
        const getPositionStyles = () => {
            if (isN) return { top: -HANDLE_SIZE / 2, left: "50%", width: 40, height: HANDLE_SIZE, cursor: "ns-resize" };
            if (isS) return { bottom: -HANDLE_SIZE / 2, left: "50%", width: 40, height: HANDLE_SIZE, cursor: "ns-resize" };
            if (isW) return { left: -HANDLE_SIZE / 2, top: "50%", width: HANDLE_SIZE, height: 40, cursor: "ew-resize" };
            if (isE) return { right: -HANDLE_SIZE / 2, top: "50%", width: HANDLE_SIZE, height: 40, cursor: "ew-resize" };
            if (isNW) return { top: -CORNER_SIZE / 2, left: -CORNER_SIZE / 2, width: CORNER_SIZE, height: CORNER_SIZE, cursor: "nw-resize" };
            if (isNE) return { top: -CORNER_SIZE / 2, right: -CORNER_SIZE / 2, width: CORNER_SIZE, height: CORNER_SIZE, cursor: "ne-resize" };
            if (isSW) return { bottom: -CORNER_SIZE / 2, left: -CORNER_SIZE / 2, width: CORNER_SIZE, height: CORNER_SIZE, cursor: "sw-resize" };
            if (isSE) return { bottom: -CORNER_SIZE / 2, right: -CORNER_SIZE / 2, width: CORNER_SIZE, height: CORNER_SIZE, cursor: "se-resize" };
            return {};
        };
        
        return (
            <Box
                onPointerDown={(e) => handleResizeStart(dir, e)}
                sx={{
                    position: "absolute",
                    pointerEvents: "auto",
                    touchAction: "none",
                    backgroundColor: "rgba(100, 150, 255, 0.9)",
                    transform: isN || isS ? "translateX(-50%)" : (isE || isW ? "translateY(-50%)" : "none"),
                    borderRadius: isCorner ? "50%" : 1,
                    "&:hover": { 
                        backgroundColor: "rgba(100, 150, 255, 1)",
                        ...(isCorner && { transform: "scale(1.2)" })
                    },
                    ...getPositionStyles()
                }}
            />
        )
    }

    // ============================================================================
    // Main Render
    // ============================================================================

    return (
        <Box sx={{ 
            border: "1px solid rgba(255,255,255,0.2)",
            borderRadius: 2,
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
                {gridCells}

                <Box
                    sx={{
                        position: "absolute",
                        top: 1 + gridRect.rowIndex * (cellSize + cellGap),
                        left: 1 + gridRect.colIndex * (cellSize + cellGap),
                        width: gridRect.colSpan * (cellSize + cellGap),
                        height: gridRect.rowSpan * (cellSize + cellGap),
                        backgroundColor: "rgba(100, 150, 255, 0.3)",
                        border: "2px solid rgba(100, 150, 255, 0.8)",
                        borderRadius: 1,
                        pointerEvents: "none",
                    }}
                >
                    {renderMoveHandle()}
                    {renderSizeLabel()}

                    {renderResizeHandle("n")}
                    {renderResizeHandle("s")}
                    {renderResizeHandle("w")}
                    {renderResizeHandle("e")}
                    {renderResizeHandle("nw")}
                    {renderResizeHandle("ne")}
                    {renderResizeHandle("sw")}
                    {renderResizeHandle("se")}
                </Box>
            </Box>
        </Box>
    );
}