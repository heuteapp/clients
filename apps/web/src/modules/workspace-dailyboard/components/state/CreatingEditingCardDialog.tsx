import { Dialog, DialogContent, IconButton } from "@mui/material";
import { useWorkspaceDailyboardContext } from "../../hooks/useWorkspaceDailyboardContext";
import { isCreatingEditingCard } from "../../state/workspace-dailyboard.machine";
import { useCallback, useEffect, useMemo, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useDailyboardContext } from "@/src/modules/ui-dailyboard/hooks/useDailyboardContext";
import { GridSize } from "@/src/modules/shared/types/common";

export function CreatingEditingCardDialog() {
    const { send, state } = useWorkspaceDailyboardContext();
    const { metrics } = useDailyboardContext();

    const [cardSpan, setCardSpan] = useState<GridSize | null>(null);

    const isOpen = useMemo(() => {
        return isCreatingEditingCard(state);
    }, [state]);

    const handleClose = useCallback(() => {
        send({ type: "CARD_CREATE_CANCEL" });
    }, [send]);

    useEffect(() => {
        if(isOpen) {
            setCardSpan({ colSpan: 12, rowSpan: 3 });
        }
    }, [isOpen]);

    const cellStep = useMemo(() => {
        return metrics.value?.layout.cellSize.grid || 0;
    }, [metrics.value]);

    const cardSize = useMemo(() => {
        const width = cellStep * (cardSpan?.colSpan || 0);
        const height = cellStep * (cardSpan?.rowSpan || 0);
        return { width, height };
    }, [cardSpan, cellStep]);

    return (
        <Dialog
            open={isOpen}
            onClose={handleClose}
            fullScreen
            hideBackdrop
            slotProps={{
                paper: {
                    style: {
                        backgroundColor: "rgba(0, 0, 0, 0.35)",
                        boxShadow: "none",
                        overflow: "hidden",
                        "--Paper-overlay": "none"
                    } as any
                }
            }}
        >
            <DialogContent style={{  
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "transparent" 
            }}>
                <IconButton 
                    onClick={handleClose}
                    style={{ position: "absolute", top: 16, right: 16, zIndex: 1, color: "white" }}
                >
                    <CloseIcon />
                </IconButton>
                <div
                    className="heute-card"
                    style={{
                        width: cardSize.width,
                        height: cardSize.height,
                    }}
                >

                </div>
            </DialogContent>
        </Dialog>
    )
}