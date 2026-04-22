import { Box, Dialog, DialogContent, IconButton, Modal, Slider, Typography } from "@mui/material";
import { useWorkspaceDailyboardContext } from "../../hooks/useWorkspaceDailyboardContext";
import { isCreatingEditingCard } from "../../state/workspace-dailyboard.machine";
import { useCallback, useEffect, useMemo, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import ZoomOutMapIcon from "@mui/icons-material/ZoomOutMap";
import { useDailyboardContext } from "@/src/modules/ui-dailyboard/hooks/useDailyboardContext";
import { GridSize } from "@/src/modules/shared/types/common";
import { DailyboardCardDisplay } from "@/src/modules/ui-dailyboard/components/DailyboardCardDisplay";
import { DailyboardCardColor, DailyboardCardMaterial } from "@/src/modules/dailyboard/types/dailyboard.data.types";
import { DailyboardCardStudio } from "@/src/modules/tools-dailyboard/components/DailyboardCardStudio";

export function CreatingEditingCardDialog() {
    const { send, state } = useWorkspaceDailyboardContext();
    const { metrics } = useDailyboardContext();

    const [cardContent, setCardContent] = useState<DailyboardCardMaterial | null>(null);
    const [cardSpan, setCardSpan] = useState<GridSize | null>(null);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const isOpen = useMemo(() => isCreatingEditingCard(state), [state]);
    const cellStep = useMemo(() => metrics.value?.layout.cellSize.grid || 0, [metrics.value]);

    useEffect(() => {
        if (isOpen) {
            setCardSpan({ colSpan: 12, rowSpan: 3 });
            setCardContent({
                title: null,
                color: DailyboardCardColor.Default,
                frontFace: null,
                backFace: null
            });
        }
    }, [isOpen]);

    const handleClose = useCallback(() => {
        send({ type: "CARD_CREATE_CANCEL" });
    }, [send]);

    const handleResizeClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

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
                position: "relative",
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

                <DailyboardCardDisplay
                    state={{
                        content: cardContent!,
                        cardSpan: cardSpan!,
                        isFrontFace: true,
                        cellStep: cellStep
                    }}
                />
                <Box sx={{ position: "absolute", bottom: 60 }}>
                    <DailyboardCardStudio
                        initialColSpan={cardSpan?.colSpan || 12}
                        initialRowSpan={cardSpan?.rowSpan || 3}
                        initialCol={0}
                        initialRow={0}
                        onResize={(colSpan, rowSpan, col, row) => {
                            setCardSpan({ colSpan, rowSpan });
                        }}
                        maxCols={24}
                        maxRows={12}
                    />
                </Box>
            </DialogContent>
        </Dialog>
    );
}