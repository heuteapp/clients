import { Box, Dialog, DialogContent, IconButton, Modal, Popover, Slider, Typography } from "@mui/material";
import { useWorkspaceDailyboardContext } from "../../hooks/useWorkspaceDailyboardContext";
import { isCreatingEditingCard } from "../../state/workspace-dailyboard.machine";
import { useCallback, useEffect, useMemo, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import ZoomOutMapIcon from "@mui/icons-material/ZoomOutMap";
import { useDailyboardContext } from "@/src/modules/ui-dailyboard/hooks/useDailyboardContext";
import { GridSize } from "@/src/modules/shared/types/common";
import { DailyboardCardDisplay } from "@/src/modules/ui-dailyboard/components/DailyboardCardDisplay";
import { DailyboardCardColor, DailyboardCardMaterial } from "@/src/modules/dailyboard/types/dailyboard.data.types";

export function CreatingEditingCardDialog() {
    const { send, state } = useWorkspaceDailyboardContext();
    const { metrics } = useDailyboardContext();

    const [cardContent, setCardContent] = useState<DailyboardCardMaterial | null>(null);
    const [cardSpan, setCardSpan] = useState<GridSize | null>(null);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const isOpen = useMemo(() => {
        return isCreatingEditingCard(state);
    }, [state]);

    const handleClose = useCallback(() => {
        send({ type: "CARD_CREATE_CANCEL" });
    }, [send]);

    useEffect(() => {
        if(isOpen) {
            setCardSpan({ colSpan: 12, rowSpan: 3 });
            setCardContent({
                title: null,
                color: DailyboardCardColor.Default,
                frontFace: null,
                backFace: null
            });
        }
    }, [isOpen]);

    const cellStep = useMemo(() => {
        return metrics.value?.layout.cellSize.grid || 0;
    }, [metrics.value]);

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
                <Box
                    sx={{
                        position: "relative"
                    }}
                >
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
                    <DailyboardCardDisplay
                        state={{
                            content: cardContent!,
                            isFrontFace: true,
                            cardSpan: cardSpan!,
                            cellStep
                        }}
                    />
                </Box>

                <Modal
                    open={Boolean(anchorEl)}
                    onClose={handleResizeClose}
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                    }}
                    slotProps={{
                        backdrop: {
                            sx: {
                                backgroundColor: "rgba(0, 0, 0, 0.1)",
                            }
                        }
                    }}
                >
                    <Box sx={{
                        backgroundColor: "rgba(30, 30, 30, 0.5)",
                        borderRadius: 2,
                        p: 3,
                        minWidth: 280,
                        border: "1px solid rgba(255,255,255,0.1)",
                        outline: "none",
                    }}>
                        <Typography variant="body2" sx={{ color: "white", mb: 1 }}>
                            Row Span: {cardSpan?.rowSpan}
                        </Typography>
                        <Slider
                            min={3}
                            max={6}
                            value={cardSpan?.rowSpan || 3}
                            onChange={handleRowSpanChange}
                            sx={{ mb: 2 }}
                        />
                        <Typography variant="body2" sx={{ color: "white", mb: 1 }}>
                            Col Span: {cardSpan?.colSpan}
                        </Typography>
                        <Slider
                            min={4}
                            max={24}
                            value={cardSpan?.colSpan || 12}
                            onChange={handleColSpanChange}
                        />
                    </Box>
                </Modal>
            </DialogContent>
        </Dialog>
    )
}