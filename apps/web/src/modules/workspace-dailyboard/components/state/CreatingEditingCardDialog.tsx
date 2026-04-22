import { Box, Dialog, DialogContent, IconButton, Modal, Slider, Typography } from "@mui/material";
import { useWorkspaceDailyboardContext } from "../../hooks/useWorkspaceDailyboardContext";
import { isCreatingEditingCard } from "../../state/workspace-dailyboard.machine";
import { useCallback, useEffect, useMemo, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import ZoomOutMapIcon from "@mui/icons-material/ZoomOutMap";
import { useDailyboardContext } from "@/src/modules/ui-dailyboard/hooks/useDailyboardContext";
import { GridSpan } from "@/src/modules/shared/types/common";
import { DailyboardCardDisplay } from "@/src/modules/ui-dailyboard/components/DailyboardCardDisplay";
import { DailyboardCardColor, DailyboardCardMaterial } from "@/src/modules/dailyboard/types/dailyboard.data.types";
import { DailyboardCardStudio } from "@/src/modules/tools-dailyboard/components/DailyboardCardStudio";

export function CreatingEditingCardDialog() {
    const { send, state } = useWorkspaceDailyboardContext();
    const { metrics } = useDailyboardContext();

    const [cardContent, setCardContent] = useState<DailyboardCardMaterial | null>(null);
    const [cardSpan, setCardSpan] = useState<GridSpan | null>(null);
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

    const handleResizeClose = () => {
        setAnchorEl(null);
    };

    const handleRowSpanChange = (_: Event, value: number | number[]) => {
        setCardSpan(prev => prev ? { ...prev, rowSpan: value as number } : null);
    };

    const handleColSpanChange = (_: Event, value: number | number[]) => {
        setCardSpan(prev => prev ? { ...prev, colSpan: value as number } : null);
    };

    const renderResizeButton = () => (
        <Box
            sx={{
                position: "absolute",
                inset: "auto 0 100% 0",
                height: cellStep,
                borderRadius: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <IconButton
                color="inherit"
                onClick={handleResizeClick}
                sx={{
                    border: "2px solid rgba(255, 255, 255, 0.4)",
                    borderRadius: "30%",
                    overflow: "hidden",
                    "& .MuiTouchRipple-child": {
                        borderRadius: "30%",
                    }
                }}
            >
                <ZoomOutMapIcon />
            </IconButton>
        </Box>
    );

    const renderResizeModal = () => (
        <Modal
            open={Boolean(anchorEl)}
            onClose={handleResizeClose}
            sx={{
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "center",
                pb: 8
            }}
            slotProps={{
                backdrop: {
                    sx: {
                        backgroundColor: "rgba(0, 0, 0, 0.1)",
                    }
                }
            }}
        >
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
        </Modal>
    );

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

                <Box sx={{ position: "relative" }}>
                    {renderResizeButton()}
                    <DailyboardCardDisplay
                        state={{
                            content: cardContent!,
                            isFrontFace: true,
                            cardSpan: cardSpan!,
                            cellStep
                        }}
                    />
                </Box>

                {renderResizeModal()}
            </DialogContent>
        </Dialog>
    );
}