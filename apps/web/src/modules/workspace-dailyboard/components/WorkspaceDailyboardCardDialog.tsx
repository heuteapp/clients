import { Dialog, DialogContent, Button, AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useWorkspaceDailyboardContext } from '../hooks/useWorkspaceDailyboardContext';
import { isEditingCard } from '../state/workspace-dailyboard.machine';

export function WorkspaceDailyboardCardDialog() {
  const { send, state } = useWorkspaceDailyboardContext();

  const handleClose = () => {
    send({ type: "CARD_EDIT_CANCELLED" });
  };

  return (
    <Dialog
        open={isEditingCard(state)}
        onClose={handleClose}
        slotProps={{
          paper: {
            sx: {
                width: { sx: '80vw', md: '40vw' },
                maxWidth: { sx: '80vw', md: '40vw' },
                height: '80vh',
                maxHeight: '80vh',
                margin: '20px',
                borderRadius: '12px',
                background: 'rgba(30, 34, 42, 0.9)',
            }
          }
        }}
    >
    <DialogContent>
        <Typography>
            Bunu yazan tosun, okuyana kosun.
        </Typography>
    </DialogContent>
    </Dialog>
  );
}