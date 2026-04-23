import { CalculateCanvasMetricsProps, ApplyCanvasMetricsProps, CanvasMetricsValue } from "../types/canvas.metrics";
import { spacingResult } from "../../shared/utils/style";

export function calculateCanvasMetrics({ registry, dataSource, styleSource }: CalculateCanvasMetricsProps) : CanvasMetricsValue | null {
    const canvasRef = registry.canvas.ref;
    const canvasEl = canvasRef.current;

    if(!canvasEl) {
        return null;
    }

    const canvas = registry.canvas;

    if (!canvas.props) {
        return null;
    }

    const { clientWidth: canvasWidth, clientHeight: canvasHeight } = canvasEl;

    const viewSize = {
        width: canvasWidth,
        height: canvasHeight,
    };

    const viewRatio = {
        width: document.body.clientWidth / viewSize.width,
        height: document.body.clientHeight / viewSize.height,
    }

    const canvasCellWidth = canvasWidth / canvas.props.data.colCount;
    const canvasCellHeight = canvasHeight / canvas.props.data.rowCount;

    const canvasCellSize = Math.min(canvasCellWidth, canvasCellHeight);

    const grids = dataSource?.grids || [];
    const gridStyles = styleSource?.grids || [];

    let gridCellSize = canvasCellSize;

    grids.forEach(grid => {
        const style = gridStyles.find(s => s.id === grid.id);

        const colSpan = grid.position.colSpan;
        const rowSpan = grid.position.rowSpan;

        const width = colSpan * canvasCellSize;
        const height = rowSpan * canvasCellSize;

        const parent = { width: canvasWidth, height: canvasHeight };

        const padding = spacingResult(style?.box.padding, parent);
        const totalPaddingX = padding.left + padding.right;
        const totalPaddingY = padding.top + padding.bottom;

        const margin = spacingResult(style?.box.margin, parent);
        const totalMarginX = margin.left + margin.right;
        const totalMarginY = margin.top + margin.bottom;

        const totalSpacingX = totalPaddingX + totalMarginX;
        const totalSpacingY = totalPaddingY + totalMarginY;

        const contentWidth = width - totalSpacingX - 2;
        const contentHeight = height - totalSpacingY - 2;

        const cellWidth = contentWidth / colSpan;
        const cellHeight = contentHeight / rowSpan;

        const cellSize = Math.min(cellWidth, cellHeight);

        if (cellSize < gridCellSize) {
            gridCellSize = cellSize;
        }
    });

    return {
        viewSize,
        viewRatio,
        cellSize: {
            canvas: canvasCellSize,
            grid: gridCellSize,
        }
    }
}

export function applyCanvasMetrics({ registry, metrics, styleSource }: ApplyCanvasMetricsProps) {
    const canvasRef = registry.canvas.ref;

    const canvasEl = canvasRef.current;
    if (!canvasEl) return;

    const metricsValue = metrics.value;
    if(!metricsValue) return;
    
    const { clientWidth: canvasWidth, clientHeight: canvasHeight } = canvasEl;

    const canvasCellSize = metricsValue.cellSize.canvas;
    const gridCellSize = metricsValue.cellSize.grid;

    canvasEl.style.setProperty("--canvas-cell-size", `${canvasCellSize}px`);
    canvasEl.style.setProperty("--grid-cell-size", `${gridCellSize}px`);

    registry.getCanvasGridSections()?.forEach(section => {
        const style = styleSource?.grids.find(s => s.name === section.props?.data.name);
        const parent = { width: canvasWidth, height: canvasHeight };

        const padding = spacingResult(style?.box.padding, parent);
        const margin = spacingResult(style?.box.margin, parent);

        const el = section.ref?.current;
        if(el) {
            el.style.padding = `${padding.top}px ${padding.right}px ${padding.bottom}px ${padding.left}px`;
            el.style.margin = `${margin.top}px ${margin.right}px ${margin.bottom}px ${margin.left}px`;
        }
    });
}