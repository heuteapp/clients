import { IconButton } from '@mui/material';
import { Fullscreen, FullscreenExit } from '@mui/icons-material';
import { useState, useEffect } from 'react';

export function FullscreenButton() {
    const [isFullscreen, setIsFullscreen] = useState(false);

    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };
        
        document.addEventListener('fullscreenchange', handleFullscreenChange);
        return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
    }, []);

    const toggleFullscreen = async () => {
        try {
            if (!document.fullscreenElement) {
                await document.body.requestFullscreen();
            } else {
                await document.exitFullscreen();
            }
            } catch (error) {
            console.error('Fullscreen error:', error);
        }
    };

    return (
        <IconButton onClick={toggleFullscreen} color="inherit">
            {isFullscreen ? <FullscreenExit /> : <Fullscreen />}
        </IconButton>
    );
}