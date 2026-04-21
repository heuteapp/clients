import { Dialog, DialogContent } from "@mui/material";
import { useWorkspaceDailyboardContext } from "../../hooks/useWorkspaceDailyboardContext";
import { isCreatingEditingCard } from "../../state/workspace-dailyboard.machine";
import { useCallback, useMemo } from "react";

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
        >
            <DialogContent>
                Hi
            </DialogContent>
        </Dialog>
    )
}