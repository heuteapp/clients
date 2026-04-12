import { Box, Dialog, DialogContent, Typography } from '@mui/material';
import { useWorkspaceDailyboardContext } from '../hooks/useWorkspaceDailyboardContext';
import { isEditingCard } from '../state/workspace-dailyboard.machine';
import { useDailyboardDataStore } from '@/src/heute-store/stores/dailyboard.store';
import { useRef } from 'react';
import { StoredDailyboardCardData } from '@/src/heute-store/types/dailyboard.types';

export function WorkspaceDailyboardCardDialog() {
  const { send, state } = useWorkspaceDailyboardContext();

  const handleClose = () => {
    send({ type: "CARD_EDIT_CANCELLED" });
  };

  const { getMeDailyboardCard } = useDailyboardDataStore();

  const cardRef = useRef<StoredDailyboardCardData | null>(null);

  if (isEditingCard(state)) {
    const { categoryPath, date, cardKey } = state.context.sessions.cardEditing!;
    cardRef.current = getMeDailyboardCard(categoryPath, date, cardKey);
  } else {
    cardRef.current = null;
  }

  const card = cardRef.current;

  return (
    <Dialog
      open={isEditingCard(state)}
      onClose={handleClose}
      slotProps={{
        paper: {
          sx: {
            width: { xs: '80vw', md: '40vw' },
            maxWidth: { xs: '80vw', md: '40vw' },
            height: '80vh',
            maxHeight: '80vh',
            margin: '20px',
            borderRadius: '12px',
            background: 'rgba(30, 34, 42, 0.9)',
            backdropFilter: 'blur(4px)',
          }
        }
      }}
    >
      <DialogContent>
        {card ? (
          <Box sx={cardPreviewStyles.container}>
            <Box sx={cardPreviewStyles.header}>
              <Typography variant="caption" sx={cardPreviewStyles.sectionName}>
                📍 {card.placement?.sectionName || 'unknown'}
              </Typography>
              <Typography variant="caption" sx={cardPreviewStyles.position}>
                {card.placement?.position?.rowIndex ?? '?'}:{card.placement?.position?.colIndex ?? '?'} 
                → {card.placement?.position?.rowSpan ?? '?'}x{card.placement?.position?.colSpan ?? '?'}
              </Typography>
            </Box>

            <Box sx={cardPreviewStyles.content}>
              <Typography variant="body2" sx={cardPreviewStyles.id}>
                🆔 {card.name?.slice(0, 8) || 'no-id'}...
              </Typography>

              <Typography variant="body1" sx={cardPreviewStyles.title}>
                {card.material?.title || "📝 Başlıksız Kart"}
              </Typography>
            </Box>
          </Box>
        ) : (
          <Typography color="error">Kart bulunamadı</Typography>
        )}
      </DialogContent>
    </Dialog>
  );
}

const cardPreviewStyles = {
  container: {
    background: '#1e2128',
    borderRadius: '12px',
    border: '1px solid rgba(66, 73, 88, 0.4)',
    overflow: 'hidden',
    maxWidth: '320px',
    transition: 'all 0.2s ease',
    '&:hover': {
      borderColor: '#4c7aff',
      boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
    }
  },
  header: {
    background: '#2a2f3a',
    padding: '8px 12px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #3a4150'
  },
  sectionName: {
    color: '#a0a8b8',
    fontSize: '11px'
  },
  position: {
    color: '#7a8290',
    fontSize: '10px',
    fontFamily: 'monospace'
  },
  content: {
    padding: '16px'
  },
  id: {
    color: '#8b93a0',
    fontSize: '10px',
    fontFamily: 'monospace',
    marginBottom: '8px'
  },
  title: {
    fontWeight: 500,
    marginBottom: '12px',
    wordBreak: 'break-word',
    color: '#e8edf5',
    fontSize: '15px'
  },
  meta: {
    borderTop: '1px solid #2a2f3a',
    paddingTop: '8px',
    marginTop: '8px',
    color: '#8b93a0'
  }
};