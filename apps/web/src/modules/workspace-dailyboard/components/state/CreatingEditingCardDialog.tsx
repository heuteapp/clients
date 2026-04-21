import { Dialog, DialogContent, IconButton } from "@mui/material";
import { useWorkspaceDailyboardContext } from "../../hooks/useWorkspaceDailyboardContext";
import { isCreatingEditingCard } from "../../state/workspace-dailyboard.machine";
import { useCallback, useMemo } from "react";
import CloseIcon from "@mui/icons-material/Close";

export function CreatingEditingCardDialog() {
    const { send, state } = useWorkspaceDailyboardContext();

    const isOpen = useMemo(() => {
        return isCreatingEditingCard(state);
    }, [state]);

    const handleClose = useCallback(() => {
        send({ type: "CARD_CREATE_CANCEL" });
    }, [send]);

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
            <DialogContent style={{ backgroundColor: "transparent" }}>
                <IconButton 
                    onClick={handleClose}
                    style={{ position: "absolute", top: 16, right: 16, zIndex: 1, color: "white" }}
                >
                    <CloseIcon />
                </IconButton>
                Hi
            </DialogContent>
        </Dialog>
    )
}