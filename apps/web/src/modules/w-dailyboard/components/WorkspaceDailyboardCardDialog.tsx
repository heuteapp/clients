import { Dialog, DialogContent, Typography } from '@mui/material';
import { useWorkspaceDailyboardContext } from '../hooks/useWorkspaceDailyboardContext';
import { isEditingCard } from '../state/workspace-dailyboard.machine';
import { useDailyboardDataStore } from '@/src/heute-store/stores/board.store';
import { useRef, useMemo } from 'react';
import { StoredBoardCardModel } from '@/src/heute-store/types/board.types';
import { useDailyboardContext } from '../../ui-dailyboard/hooks/useDailyboardContext';

export function WorkspaceDailyboardCardDialog() {
  const { send, state } = useWorkspaceDailyboardContext();
  const { metrics } = useDailyboardContext();
  const { getMeDailyboardCard } = useDailyboardDataStore();
  const cardRef = useRef<StoredBoardCardModel | null>(null);

  const handleClose = () => {
    send({ type: "CARD_EDIT_CANCELLED" });
  };

  if (isEditingCard(state)) {
    const { categoryPath, date, cardKey } = state.context.sessions.cardEditing!;
    cardRef.current = getMeDailyboardCard(categoryPath, date, cardKey);
  }

  const card = cardRef.current;
  const pos = card?.placement?.position;

  const dialogRatio = useMemo(() => {
    if (!metrics.value || !pos) return 1;
    return Math.max(metrics.value.canvas.viewRatio.width, metrics.value.canvas.viewRatio.height);
  }, [metrics.value, pos]);

  const dialogSize = useMemo(() => {
    if (!metrics.value || !pos) return { width: 10, height: 10 };
    const grid = metrics.value.canvas.cellSize.canvas * 1.1;
    return {
      width: grid * pos.colSpan * dialogRatio,
      height: grid * pos.rowSpan * dialogRatio,
    };
  }, [metrics.value, pos, dialogRatio]);

  const dialogHeaderHeight = useMemo(() => {
    if (!metrics.value) return 10;
    return metrics.value.cardSize.headerHeight * dialogRatio;
  }, [metrics.value, dialogRatio]);

  const isOpen = isEditingCard(state);

  return (
    <Dialog
      key={metrics.value?.canvas.cellSize.grid}
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
      <DialogContent
        className='heute-card'
        data-dailyboard-card-type={"content"}
        sx={{
          padding: 0,
        }}
      >
        <div
          className='header'
          style={{
            height: dialogHeaderHeight,
          }}
        >
          {" "}
        </div>
        <div
          className='body'
        >

        </div>
      </DialogContent>
    </Dialog>
  );
}