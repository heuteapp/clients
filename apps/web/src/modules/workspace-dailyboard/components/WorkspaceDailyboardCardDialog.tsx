import { Box, Dialog, DialogContent, Typography } from '@mui/material';
import { useWorkspaceDailyboardContext } from '../hooks/useWorkspaceDailyboardContext';
import { isEditingCard } from '../state/workspace-dailyboard.machine';
import { useDailyboardDataStore } from '@/src/heute-store/stores/dailyboard.store';
import { useRef, useMemo } from 'react';
import { StoredDailyboardCardData } from '@/src/heute-store/types/dailyboard.types';
import { useDailyboardContext } from '../../ui-dailyboard/hooks/useDailyboardContext';

export function WorkspaceDailyboardCardDialog() {
  const { send, state } = useWorkspaceDailyboardContext();
  const { metrics } = useDailyboardContext();
  const { getMeDailyboardCard } = useDailyboardDataStore();
  const cardRef = useRef<StoredDailyboardCardData | null>(null);

  const handleClose = () => {
    send({ type: "CARD_EDIT_CANCELLED" });
  };

  if (isEditingCard(state)) {
    const { categoryPath, date, cardKey } = state.context.sessions.cardEditing!;
    cardRef.current = getMeDailyboardCard(categoryPath, date, cardKey);
  }

  const card = cardRef.current;
  const pos = card?.placement?.position;

  const dialogSize = useMemo(() => {
    if (!metrics.value || !pos) return { width: 10, height: 10 };
    const ratio = Math.max(metrics.value.layout.viewRatio.width, metrics.value.layout.viewRatio.height);
    const grid = metrics.value.layout.cellSize.layout * 1.1;
    return {
      width: grid * pos.colSpan * ratio,
      height: grid * pos.rowSpan * ratio,
    };
  }, [metrics.value, pos]);

  const isOpen = isEditingCard(state);

  return (
    <Dialog
      key={metrics.value?.layout.cellSize.grid}
      open={isOpen}
      onClose={handleClose}
      slotProps={{
        paper: {
          sx: {
            width: dialogSize.width,
            height: dialogSize.height,
            maxWidth: 'none !important',
            maxHeight: 'none !important',
          },
        },
      }}
    >
      <DialogContent>
        {pos ? (
          <Box>
            {metrics.value?.layout.viewRatio.width.toFixed(2)} : {metrics.value?.layout.viewRatio.height.toFixed(2)}
          </Box>
        ) : (
          <Typography variant="h6">No card data available</Typography>
        )}
      </DialogContent>
    </Dialog>
  );
}